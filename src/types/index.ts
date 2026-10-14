export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  isCrisis?: boolean;
  category?: "mental_health" | "symptom" | "general" | "emergency";
  suggestions?: string[];
}

export interface ScreeningQuestion {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

export interface ScreeningAssessment {
  id: "phq9" | "gad7";
  title: string;
  shortDescription: string;
  longDescription: string;
  source: string;
  questions: ScreeningQuestion[];
  interpretScore: (score: number) => {
    tier: "Minimal" | "Mild" | "Moderate" | "Moderately Severe" | "Severe";
    description: string;
    actionAdvice: string;
    color: string;
  };
}

export interface MoodEntry {
  id: string;
  date: string;
  rating: number; // 1 to 5
  moodName: string;
  emoji: string;
  note: string;
  tags: string[];
}

export interface SymptomReport {
  primarySymptoms: string[];
  duration: string;
  severity: "mild" | "moderate" | "severe";
  associatedFactors: string[];
  ageGroup: string;
}
