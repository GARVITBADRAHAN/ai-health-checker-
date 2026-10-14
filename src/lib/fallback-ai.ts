export interface AIResponse {
  content: string;
  isCrisis?: boolean;
  category?: "mental_health" | "symptom" | "general" | "emergency";
  suggestions?: string[];
}

const CRISIS_KEYWORDS = [
  "kill myself",
  "suicide",
  "want to die",
  "end my life",
  "end it all",
  "better off dead",
  "harm myself",
  "self harm",
  "cutting myself",
  "no reason to live",
  "hang myself",
  "take my own life",
];

export function checkCrisis(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
}

export function getCrisisResponse(): AIResponse {
  return {
    isCrisis: true,
    category: "emergency",
    content: `### 🚨 Urgent: You Are Not Alone & Help Is Available Right Now

I hear how much pain you are carrying right now, and I want you to know that your life has profound value. Please take a deep breath and connect with people trained to support you through this exact moment without any judgment.

#### 📞 Immediate 24/7 Free & Confidential Support:
- **In the United States / Canada:** Dial or text **988** (Suicide & Crisis Lifeline)
- **In India:** Call **14416** or **1800-891-4416** (National Tele-MANAS Helpline) or **1800-599-0019** (KIRAN)
- **In the United Kingdom:** Call **116 123** (Samaritans UK)
- **Crisis Text Line:** Text **HOME** to **741741** (US, UK, Canada)
- **International:** Visit [Befrienders Worldwide](https://www.befrienders.org) to find your local country's hotline.

*Please reach out to one of these free services immediately, or call your local emergency services (911 / 112) or go to the nearest emergency room. There is always hope, and people who care are waiting to listen.*`,
    suggestions: [
      "View all international crisis hotlines",
      "Try a 4-7-8 grounding breath right now",
      "I want to talk through what led to this",
    ],
  };
}

export function generateSmartFallbackResponse(
  message: string,
  history: { role: string; content: string }[] = []
): AIResponse {
  const text = message.toLowerCase().trim();

  // 1. Crisis Check
  if (checkCrisis(text)) {
    return getCrisisResponse();
  }

  // 2. Exam / Academic Stress
  if (
    text.includes("exam") ||
    text.includes("study") ||
    text.includes("college") ||
    text.includes("school") ||
    text.includes("grade") ||
    text.includes("homework") ||
    text.includes("deadline") ||
    text.includes("academic")
  ) {
    return {
      category: "mental_health",
      content: `It is completely understandable to feel overwhelmed by academic expectations and exam pressure. Many students experience this, but chronic stress can cloud your thinking and sap your energy.

Here is a 3-step actionable strategy to regain calm and focus:

1. **The Pomodoro Reset (25/5):** Instead of staring at an intimidating syllabus, pick just *one* sub-topic and study for 25 focused minutes. When the timer rings, stand up and stretch for 5 minutes.
2. **Brain Dump:** Grab a notebook and write down every single thought, deadline, and worry racing through your head. Once it is on paper, your brain no longer has to expend mental energy trying to remember it.
3. **Challenge Perfectionism:** Remind yourself: *"My worth as a human being is not defined by a single test score or grade."*

Would you like to try a quick 2-minute box breathing exercise before returning to your studies, or take the **GAD-7 Anxiety Screener** to gauge your stress levels?`,
      suggestions: [
        "Guide me through a 2-minute breathing exercise",
        "Take the GAD-7 Anxiety Assessment",
        "How do I stop procrastinating when stressed?",
      ],
    };
  }

  // 3. Sleep Issues / Insomnia
  if (
    text.includes("sleep") ||
    text.includes("insomnia") ||
    text.includes("tired") ||
    text.includes("can't sleep") ||
    text.includes("cant sleep") ||
    text.includes("wake up") ||
    text.includes("nightmare")
  ) {
    return {
      category: "mental_health",
      content: `Sleep and mental health have a profound bi-directional relationship: poor sleep heightens anxiety, and anxiety prevents restorative sleep.

Here are evidence-backed tips to reset your circadian rhythm:
- **The 20-Minute Rule:** If you are lying in bed tossing and turning for more than 20 minutes, get out of bed. Sit in dim light and read a physical book or listen to calming sounds until drowsiness returns.
- **Digital Sunset:** Blue light from phone screens suppresses melatonin (the sleep hormone). Try putting your phone in another room or switching to Night Shift 45 minutes before bed.
- **Progressive Muscle Relaxation (PMR):** Slowly tense each muscle group (feet, calves, thighs, shoulders, face) for 5 seconds, then deliberately release the tension with a long exhale.

Would you like to try our guided **4-7-8 Breathing Tool** designed specifically for inducing sleep?`,
      suggestions: [
        "Open the 4-7-8 Breathing Tool",
        "Take the PHQ-9 Depression Screener",
        "Tips for racing thoughts at night",
      ],
    };
  }

  // 4. Anxiety / Panic / Overwhelmed
  if (
    text.includes("anxious") ||
    text.includes("anxiety") ||
    text.includes("panic") ||
    text.includes("overwhelmed") ||
    text.includes("scared") ||
    text.includes("nervous") ||
    text.includes("chest tight") ||
    text.includes("racing heart")
  ) {
    return {
      category: "mental_health",
      content: `I hear you, and it is okay to feel this way. Anxiety can feel like a heavy physical weight in your chest, but remember: **this physiological surge is temporary, and you are in a safe place right now.**

Let's do the **5-4-3-2-1 Grounding Technique** together right now:
- 👀 **5 things you can see:** Look around and name 5 specific objects (e.g., lamp, shadow, door frame).
- ✋ **4 things you can physically touch:** Feel the fabric of your sleeve, your desk, your shoes.
- 👂 **3 things you can hear:** Listen for ambient sounds (fan, birds, distant traffic).
- 👃 **2 things you can smell:** Your shirt, a beverage, or fresh air.
- 👅 **1 thing you can taste:** A sip of water or the taste on your tongue.

Notice how your nervous system begins to re-anchor into the present moment. How is your breathing feeling right now?`,
      suggestions: [
        "Start guided Box Breathing",
        "Check my anxiety with GAD-7 Screener",
        "Why does anxiety cause physical symptoms?",
      ],
    };
  }

  // 5. Depression / Sadness / Loneliness / Low Mood
  if (
    text.includes("sad") ||
    text.includes("depressed") ||
    text.includes("lonely") ||
    text.includes("empty") ||
    text.includes("crying") ||
    text.includes("hopeless") ||
    text.includes("numb") ||
    text.includes("unmotivated")
  ) {
    return {
      category: "mental_health",
      content: `Thank you for having the courage to share that. Feeling sad, numb, or isolated can feel intensely draining, and it takes real strength to acknowledge it.

Please remember:
- **Low energy is a symptom, not a personal flaw:** When your brain is emotionally depleted, everyday tasks like getting out of bed or responding to messages feel like climbing a mountain.
- **The "Micro-Step" principle:** Don't try to solve your entire week today. Focus only on one tiny micro-step: drink a glass of water, step outside for 2 minutes of sunlight, or wash your face with cool water.
- **You don't have to carry this alone:** Sharing how you feel with a counselor, friend, or mentor can take the weight off your shoulders.

Taking a standardized assessment can help you understand what you are going through with clarity. Would you like to try the **PHQ-9 Depression Screener**?`,
      suggestions: [
        "Start the PHQ-9 Depression Assessment",
        "Log my mood in the Mood Tracker",
        "How to talk to parents or friends about this",
      ],
    };
  }

  // 6. Symptom Checking / Physical Health (SDG 3 Disease Detection)
  if (
    text.includes("headache") ||
    text.includes("fever") ||
    text.includes("cough") ||
    text.includes("stomach") ||
    text.includes("nausea") ||
    text.includes("symptom") ||
    text.includes("sick") ||
    text.includes("dizzy") ||
    text.includes("body ache")
  ) {
    return {
      category: "symptom",
      content: `### 🩺 Health & Symptom Guidance Assistant (SDG 3)

*Important Disclaimer: MindWell AI provides educational triage and wellness suggestions. It is not a substitute for clinical medical diagnosis. In case of emergency (severe chest pain, shortness of breath, sudden weakness), seek emergency medical care immediately.*

Based on your mention of physical symptoms:
1. **Hydration & Rest:** Ensure you are sipping adequate fluids (water, electrolytes) and allowing your body physical recovery time.
2. **Monitor Red Flags:** If your symptoms are accompanied by high persistent fever (>103°F / 39.4°C), sudden stiff neck, difficulty breathing, or severe abdominal pain, consult a doctor without delay.
3. **Stress Connection:** Physical symptoms like tension headaches, stomach knots, and fatigue are frequently linked to psychosomatic stress and sleep deficiency.

Would you like to run a structured symptom triage using our **Interactive Symptom Checker** module?`,
      suggestions: [
        "Open Structured Symptom Checker",
        "Could my headache be caused by stress?",
        "When should I visit an urgent care doctor?",
      ],
    };
  }

  // 7. General Greeting or Introductions
  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("good morning") ||
    text.includes("good evening") ||
    text === ""
  ) {
    return {
      category: "general",
      content: `Hello! 👋 Welcome to **MindWell AI**, an open-access platform built in support of **UN Sustainable Development Goal 3: Good Health & Well-being**.

I am your confidential AI wellness companion and health screening assistant. How are you feeling today?

Here are some ways I can support you right now:
- 🧠 **Mental Wellness Check-in:** Talk through stress, anxiety, burnout, or emotional challenges.
- 📋 **Clinical Screening Assessments:** Take validated PHQ-9 (Depression) or GAD-7 (Anxiety) screeners.
- 🩺 **Early Symptom & Health Guidance:** Evaluate physical symptoms and preventive lifestyle steps.
- 🌬️ **Mindfulness Toolkit:** Try live 4-7-8 breathing and sensory grounding exercises.

What is on your mind?`,
      suggestions: [
        "I'm feeling stressed about school/work",
        "Take a quick mental health screening",
        "I need a 2-minute breathing exercise",
        "Check a physical symptom I'm experiencing",
      ],
    };
  }

  // 8. Default Empathetic Response
  return {
    category: "general",
    content: `Thank you for sharing that with me. What you're experiencing is valid, and talking through thoughts and bodily sensations is an important step toward emotional and physical well-being.

To help tailor the best guidance for you:
- Are you noticing any physical sensations (tightness, fatigue, trouble sleeping)?
- Has this feeling been present for a few days, or is it a sudden reaction to an event?

You can also use the quick tools below to assess your current stress levels or practice a calming exercise.`,
    suggestions: [
      "Take the PHQ-9 Depression Screener",
      "Take the GAD-7 Anxiety Screener",
      "Try guided Box Breathing",
      "Check physical symptoms",
    ],
  };
}
