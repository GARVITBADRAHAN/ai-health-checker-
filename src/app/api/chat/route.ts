import { NextRequest, NextResponse } from "next/server";
import { checkCrisis, getCrisisResponse, generateSmartFallbackResponse } from "@/lib/fallback-ai";

const SYSTEM_PROMPT = `You are MindWell AI, a compassionate, supportive, and evidence-informed health & mental wellness assistant dedicated to UN Sustainable Development Goal 3 (Good Health and Well-being).
Your mission is to provide empathetic guidance, stress management strategies, psychoeducation, and health triage for youth and individuals seeking support.

Guidelines:
1. Always maintain a warm, non-judgmental, empathetic, and culturally sensitive tone.
2. If the user presents symptoms of severe depression, self-harm, or hopelessness, express deep empathy and prioritize immediate safety hotline contacts (988 in US/Canada, 14416 / Tele-MANAS in India, 116 123 in UK).
3. Clearly state medical disclaimers when discussing physical or clinical symptoms: you provide educational guidance and supportive check-ins, not clinical diagnoses or prescriptions.
4. Encourage evidence-based coping skills (box breathing, grounding 5-4-3-2-1, cognitive reframing, sleep hygiene).
5. Recommend standardized screeners like PHQ-9 (Depression) or GAD-7 (Anxiety) when appropriate.
6. Keep responses clear, beautifully formatted with markdown headings and bullet points, and concise enough for youth reading on mobile devices.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, userApiKey, provider = "gemini" } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    const latestMessage = messages[messages.length - 1];
    const latestText = latestMessage?.content || "";

    // 1. Safety & Crisis check (immediate response)
    if (checkCrisis(latestText)) {
      const crisisResult = getCrisisResponse();
      return NextResponse.json(crisisResult);
    }

    // 2. Check for API keys (Environment variable or user supplied)
    const geminiKey =
      userApiKey ||
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const openAiKey =
      process.env.OPENAI_API_KEY ||
      (provider === "openai" ? userApiKey : undefined);

    // If Gemini key is available, call Google Gemini 1.5 Flash
    if (geminiKey && provider !== "openai") {
      try {
        const geminiResponse = await callGeminiAPI(geminiKey, messages);
        if (geminiResponse) {
          return NextResponse.json({
            content: geminiResponse,
            category: "mental_health",
            suggestions: [
              "Try a quick breathing exercise",
              "Take the PHQ-9 Depression Screener",
              "Take the GAD-7 Anxiety Screener",
            ],
          });
        }
      } catch (err: unknown) {
        console.warn("Gemini API call failed, falling back to smart engine:", err);
      }
    }

    // If OpenAI key is available
    if (openAiKey) {
      try {
        const openAiResponse = await callOpenAIAPI(openAiKey, messages);
        if (openAiResponse) {
          return NextResponse.json({
            content: openAiResponse,
            category: "mental_health",
            suggestions: [
              "Try a quick breathing exercise",
              "Take the PHQ-9 Depression Screener",
              "Take the GAD-7 Anxiety Screener",
            ],
          });
        }
      } catch (err: unknown) {
        console.warn("OpenAI API call failed, falling back to smart engine:", err);
      }
    }

    // 3. Fallback Smart Clinical Engine
    const fallback = generateSmartFallbackResponse(latestText, messages);
    return NextResponse.json(fallback);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Chat API error:", errorMessage);
    return NextResponse.json(
      {
        content:
          "I am here with you. It seems there was a temporary network glitch. Please try sending your message again or select one of the self-care tools below.",
        category: "general",
        suggestions: [
          "Take a deep breath",
          "Open PHQ-9 Screener",
          "Open GAD-7 Screener",
        ],
      },
      { status: 200 }
    );
  }
}

async function callGeminiAPI(
  apiKey: string,
  messages: { role: string; content: string }[]
): Promise<string | null> {
  const contents = [
    {
      role: "user",
      parts: [{ text: `${SYSTEM_PROMPT}\n\nPlease acknowledge and adhere to the guidelines.` }],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood. I am MindWell AI, ready to support users with empathy, safety, and evidence-informed guidance.",
        },
      ],
    },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ];

  // Using Gemini 1.5 Flash API endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gemini API error status:", res.status, errText);
    return null;
  }

  const data = await res.json();
  const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return candidateText || null;
}

async function callOpenAIAPI(
  apiKey: string,
  messages: { role: string; content: string }[]
): Promise<string | null> {
  const url = "https://api.openai.com/v1/chat/completions";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || null;
}
