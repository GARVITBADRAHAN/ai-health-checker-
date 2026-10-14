"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ChatSection from "@/components/ChatSection";
import AssessmentSection from "@/components/AssessmentSection";
import SymptomCheckerSection from "@/components/SymptomCheckerSection";
import MindfulnessSection from "@/components/MindfulnessSection";
import MoodTrackerSection from "@/components/MoodTrackerSection";
import CrisisModal from "@/components/CrisisModal";
import SettingsModal from "@/components/SettingsModal";
import { Sparkles, HeartPulse, ShieldCheck, ExternalLink, Activity } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"chat" | "screening" | "symptoms" | "mindfulness" | "mood">("chat");
  const [apiKey, setApiKey] = useState("");
  const [provider, setProvider] = useState<"gemini" | "openai" | "fallback">("gemini");
  const [crisisModalOpen, setCrisisModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Load preferences from localStorage if client-side
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("mindwell_user_api_key");
      const storedProvider = localStorage.getItem("mindwell_provider") as any;
      if (storedKey) setApiKey(storedKey);
      if (storedProvider) setProvider(storedProvider);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCrisisModal={() => setCrisisModalOpen(true)}
        openSettingsModal={() => setSettingsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {activeTab === "chat" && (
          <div>
            {/* SDG 3 Impact Highlight Card */}
            <div className="max-w-4xl mx-auto px-4 pt-3 pb-1">
              <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white p-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm shrink-0">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                        UN SDG 3: Good Health & Well-being
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-emerald-50 mt-1">
                      Addressing youth anxiety, depressive symptoms, and early disease risk through compassionate AI guidance.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("screening")}
                    className="flex-1 sm:flex-initial text-xs font-bold px-3.5 py-2 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 transition-colors shadow-sm text-center"
                  >
                    Take Screener
                  </button>
                  <button
                    onClick={() => setActiveTab("mindfulness")}
                    className="flex-1 sm:flex-initial text-xs font-bold px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors text-center"
                  >
                    Breathe
                  </button>
                </div>
              </div>
            </div>

            <ChatSection
              apiKey={apiKey}
              provider={provider}
              onNavigateTab={setActiveTab}
              openCrisisModal={() => setCrisisModalOpen(true)}
            />
          </div>
        )}

        {activeTab === "screening" && (
          <AssessmentSection
            openCrisisModal={() => setCrisisModalOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === "symptoms" && (
          <SymptomCheckerSection
            openCrisisModal={() => setCrisisModalOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === "mindfulness" && <MindfulnessSection />}

        {activeTab === "mood" && <MoodTrackerSection />}
      </main>

      {/* Global Modals */}
      <CrisisModal
        isOpen={crisisModalOpen}
        onClose={() => setCrisisModalOpen(false)}
      />
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        provider={provider}
        setProvider={setProvider}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              MindWell AI
            </span>
            <span>•</span>
            <span>UN SDG 3: Good Health & Well-being</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCrisisModalOpen(true)}
              className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
            >
              24/7 Crisis Helplines
            </button>
            <button
              onClick={() => setSettingsModalOpen(true)}
              className="hover:underline"
            >
              Model Settings
            </button>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Ready for Vercel Deployment 🚀
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
