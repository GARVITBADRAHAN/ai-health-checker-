"use client";

import React, { useState, useEffect } from "react";
import { Smile, Frown, Meh, Sparkles, Calendar, Trash2, TrendingUp, BarChart2 } from "lucide-react";
import { MoodEntry } from "@/types";

const MOOD_OPTIONS = [
  { rating: 5, label: "Thriving", emoji: "😄", color: "emerald" },
  { rating: 4, label: "Good", emoji: "🙂", color: "teal" },
  { rating: 3, label: "Okay", emoji: "😐", color: "sky" },
  { rating: 2, label: "Low", emoji: "😔", color: "amber" },
  { rating: 1, label: "Overwhelmed", emoji: "😣", color: "rose" },
];

const FACTORS = ["Exams / Study", "Sleep Quality", "Social / Friends", "Physical Health", "Family", "Future / Career"];

export default function MoodTrackerSection() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(4);
  const [note, setNote] = useState("");
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("mindwell_mood_entries");
      if (stored) {
        setEntries(JSON.parse(stored));
      } else {
        // Seed with sample initial entries for immediate great visualization
        const initial: MoodEntry[] = [
          {
            id: "m-1",
            date: "Yesterday",
            rating: 3,
            moodName: "Okay",
            emoji: "😐",
            note: "Had a long study session, felt mentally drained by evening.",
            tags: ["Exams / Study", "Sleep Quality"],
          },
          {
            id: "m-2",
            date: "2 days ago",
            rating: 4,
            moodName: "Good",
            emoji: "🙂",
            note: "Went for a morning walk and connected with a close friend.",
            tags: ["Social / Friends", "Physical Health"],
          },
        ];
        setEntries(initial);
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleFactor = (f: string) => {
    setSelectedFactors((prev) =>
      prev.includes(f) ? prev.filter((item) => item !== f) : [...prev, f]
    );
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const moodMeta = MOOD_OPTIONS.find((m) => m.rating === selectedRating) || MOOD_OPTIONS[1];

    const newEntry: MoodEntry = {
      id: "entry-" + Date.now(),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      rating: selectedRating,
      moodName: moodMeta.label,
      emoji: moodMeta.emoji,
      note: note.trim() || "No reflection note added.",
      tags: selectedFactors,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("mindwell_mood_entries", JSON.stringify(updated));
    }

    setNote("");
    setSelectedFactors([]);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("mindwell_mood_entries", JSON.stringify(updated));
    }
  };

  const averageRating =
    entries.length > 0
      ? (entries.reduce((acc, curr) => acc + curr.rating, 0) / entries.length).toFixed(1)
      : "4.0";

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <BarChart2 className="w-4 h-4" /> Self-Reflection & Emotional Longitudinal Tracking
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Mood Journal & Trend Tracker
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tracking your emotional patterns daily helps identify recurring stress triggers before they turn into burnout.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Check-in Form */}
        <form
          onSubmit={handleSaveEntry}
          className="lg:col-span-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 space-y-5"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
            <span>Log Today's Mental State</span>
            {isSaved && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-fade-in">
                ✓ Saved to Journal!
              </span>
            )}
          </h2>

          {/* Rating Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              How would you describe your overall state right now?
            </label>
            <div className="grid grid-cols-5 gap-2">
              {MOOD_OPTIONS.map((opt) => (
                <button
                  key={opt.rating}
                  type="button"
                  onClick={() => setSelectedRating(opt.rating)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    selectedRating === opt.rating
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 ring-2 ring-emerald-500/30 scale-105"
                      : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-2xl mb-1">{opt.emoji}</span>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Context Factors */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Contributing Factors (Optional)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {FACTORS.map((f) => {
                const active = selectedFactors.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFactor(f)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600 font-semibold"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-300"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reflection Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              Daily Reflection or Journal Thought (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What went well today? What drained your energy or made you anxious?"
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Save Mood Entry
          </button>
        </form>

        {/* Summary Card & Average */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg p-6 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-80 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Wellness Index
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black">{averageRating}</span>
              <span className="text-xs opacity-80">/ 5.0 Average</span>
            </div>
            <p className="text-xs mt-3 opacity-90 leading-relaxed">
              Based on {entries.length} recent journal check-ins. Keep journaling daily to build cognitive awareness of emotional triggers.
            </p>
          </div>

          {/* Past Entries List */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-3 max-h-[380px] overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Recent Reflections
            </h3>

            {entries.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No entries yet. Add your first mood check-in!
              </p>
            ) : (
              entries.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/30 text-xs space-y-1.5 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {item.moodName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                      <button
                        onClick={() => handleDeleteEntry(item.id)}
                        className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 italic">"{item.note}"</p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
