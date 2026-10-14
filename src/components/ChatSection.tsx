"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { ChatMessage } from "@/types";

interface ChatSectionProps {
  apiKey: string;
  provider: "gemini" | "openai" | "fallback";
  onNavigateTab: (tab: "chat" | "screening" | "symptoms" | "mindfulness" | "mood") => void;
  openCrisisModal: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: `👋 **Welcome to MindWell AI!** 

I am your confidential mental wellness companion and health screening assistant, built to advance **UN SDG 3: Good Health and Well-being** for youth and communities.

Whether you're navigating academic stress, racing thoughts, sleep issues, or bodily symptoms, I am here to listen and guide you without judgment. 

*How are you feeling today?*`,
    timestamp: "Just now",
    suggestions: [
      "I'm overwhelmed with exam stress",
      "I can't sleep because of racing thoughts",
      "I want to take a depression/anxiety check",
      "I'm experiencing a headache and fatigue",
    ],
  },
];

export default function ChatSection({
  apiKey,
  provider,
  onNavigateTab,
  openCrisisModal,
}: ChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          userApiKey: apiKey || undefined,
          provider: provider,
        }),
      });

      if (!res.ok) {
        throw new Error("Chat response returned error");
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content: data.content || "I am here to support you.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCrisis: data.isCrisis,
        category: data.category,
        suggestions: data.suggestions || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (data.isCrisis) {
        openCrisisModal();
      }
    } catch {
      const fallbackMessage: ChatMessage = {
        id: "assistant-" + Date.now(),
        role: "assistant",
        content: `I'm having a brief connection delay, but remember: you can always use the **Screening Screeners**, **Calm & Breathe Pacer**, or the red **SOS Crisis** button at the top for immediate support.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: ["Open Box Breathing", "Take GAD-7 Anxiety Check"],
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes("Breathing") || suggestion.includes("breath")) {
      onNavigateTab("mindfulness");
    } else if (suggestion.includes("PHQ-9") || suggestion.includes("Depression") || suggestion.includes("GAD-7") || suggestion.includes("Anxiety Assessment")) {
      onNavigateTab("screening");
    } else if (suggestion.includes("Symptom") || suggestion.includes("symptom")) {
      onNavigateTab("symptoms");
    } else if (suggestion.includes("hotline") || suggestion.includes("Crisis")) {
      openCrisisModal();
    } else {
      handleSendMessage(suggestion);
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto px-4 py-2">
      {/* Top Banner: SDG 3 Notice & Privacy */}
      <div className="mb-3 flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Private & Confidential:</strong> Session messages are not shared or stored on public servers.
          </span>
        </div>
        <button
          onClick={resetChat}
          className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 underline font-medium"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%]">
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl shadow-sm leading-relaxed text-sm ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : msg.isCrisis
                    ? "bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-slate-900 dark:text-slate-100 rounded-tl-none"
                    : "bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 rounded-tl-none"
                }`}
              >
                {msg.isCrisis && (
                  <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400 mb-2 pb-2 border-b border-rose-200 dark:border-rose-800">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Crisis Support Triggered</span>
                  </div>
                )}

                {/* Formatted Message Content */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.content.split("\n\n").map((paragraph, idx) => {
                    // Simple heading check
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h4 key={idx} className="font-bold text-base mt-2 mb-1">
                          {paragraph.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith("#### ")) {
                      return (
                        <h5 key={idx} className="font-semibold text-sm mt-2 mb-1">
                          {paragraph.replace("#### ", "")}
                        </h5>
                      );
                    }
                    return <p key={idx}>{paragraph}</p>;
                  })}
                </div>

                <div
                  className={`text-[10px] mt-2 flex items-center justify-end gap-1 ${
                    msg.role === "user"
                      ? "text-emerald-100"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="mt-2.5 ml-10 flex flex-wrap gap-1.5 max-w-[85%]">
                {msg.suggestions.map((suggestion, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 dark:bg-slate-800 dark:hover:bg-emerald-950/60 dark:text-slate-300 dark:hover:text-emerald-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-500" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></span>
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
              <span className="text-xs text-slate-500 ml-1">
                MindWell AI is reflecting...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="pt-2">
        <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your feelings, questions, or symptoms here..."
            disabled={loading}
            className="w-full py-3.5 pl-4 pr-14 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || loading}
            className="absolute right-2.5 p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-30 disabled:hover:bg-emerald-600 transition-all shadow-md shadow-emerald-600/20"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] text-center text-slate-400 dark:text-slate-500 mt-2">
          MindWell AI offers supportive check-ins and evidence-based screening. Not a substitute for clinical medical diagnosis.
        </p>
      </div>
    </div>
  );
}
