"use client";

import React from "react";
import { HeartPulse, ShieldAlert, Sparkles, Sliders, Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab: "chat" | "screening" | "symptoms" | "mindfulness" | "mood";
  setActiveTab: (tab: "chat" | "screening" | "symptoms" | "mindfulness" | "mood") => void;
  openCrisisModal: () => void;
  openSettingsModal: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  openCrisisModal,
  openSettingsModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: "chat", label: "AI Companion", icon: "💬" },
    { id: "screening", label: "Screenings (PHQ-9 / GAD-7)", icon: "📋" },
    { id: "symptoms", label: "Symptom Checker", icon: "🩺" },
    { id: "mindfulness", label: "Calm & Breathe", icon: "🌬️" },
    { id: "mood", label: "Mood Log", icon: "📊" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-sky-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                  MindWell AI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  <Sparkles className="w-3 h-3" /> SDG 3
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Youth Mental Health & Preventive Wellness
              </p>
            </div>
          </div>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* SOS Crisis Button */}
            <button
              onClick={openCrisisModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm font-semibold shadow-sm transition-all animate-pulse"
              title="Immediate Crisis Hotlines & Support"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>SOS Crisis</span>
            </button>

            {/* Settings button */}
            <button
              onClick={openSettingsModal}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="API Settings & Project Information"
            >
              <Sliders className="w-5 h-5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg md:hidden text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
