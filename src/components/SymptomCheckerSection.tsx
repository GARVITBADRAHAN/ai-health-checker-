"use client";

import React, { useState } from "react";
import { Activity, AlertTriangle, CheckCircle, ShieldCheck, Stethoscope, RefreshCw, ChevronRight } from "lucide-react";
import { SymptomTriageResult } from "@/app/api/symptom-check/route";

interface SymptomCheckerProps {
  openCrisisModal: () => void;
  onNavigateTab: (tab: "chat" | "screening" | "symptoms" | "mindfulness" | "mood") => void;
}

const COMMON_SYMPTOMS = [
  "Tension Headache",
  "Fatigue & Exhaustion",
  "Cough & Cold",
  "Sore Throat",
  "Mild Fever",
  "Nausea or Upset Stomach",
  "Dizziness or Lightheadedness",
  "Muscle Aches & Neck Stiffness",
  "Brain Fog / Trouble Focusing",
];

export default function SymptomCheckerSection({
  openCrisisModal,
  onNavigateTab,
}: SymptomCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState("");
  const [duration, setDuration] = useState("2-3 days");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("mild");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomTriageResult | null>(null);

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleRunTriage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedSymptoms.length === 0 && !customSymptom.trim()) return;

    setLoading(true);
    try {
      const combined = [
        ...selectedSymptoms,
        customSymptom.trim(),
      ].filter(Boolean).join(", ");

      const res = await fetch("/api/symptom-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: combined,
          duration,
          severity,
        }),
      });

      if (!res.ok) throw new Error("Symptom triage failed");
      const data: SymptomTriageResult = await res.json();
      setResult(data);
    } catch {
      alert("Unable to complete triage. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedSymptoms([]);
    setCustomSymptom("");
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Activity className="w-4 h-4" /> SDG 3 Target 3.d — Early Health Risk Detection
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          AI Symptom Checker & Health Triage
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Assess everyday symptoms, evaluate potential causes, and receive guidance on the appropriate level of care.
        </p>
      </div>

      {!result ? (
        <form
          onSubmit={handleRunTriage}
          className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 sm:p-8 space-y-6"
        >
          {/* Quick Select Symptoms */}
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
              1. Select Common Symptoms (Click all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((sym) => {
                const active = selectedSymptoms.includes(sym);
                return (
                  <button
                    type="button"
                    key={sym}
                    onClick={() => toggleSymptom(sym)}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-all font-medium ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400"
                    }`}
                  >
                    {active ? "✓ " : "+ "}
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Description */}
          <div>
            <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              2. Describe Your Symptoms in Your Own Words
            </label>
            <textarea
              rows={3}
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="e.g., Throbbing pain behind eyes when studying, started Tuesday, feels worse in bright light..."
              className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Duration & Severity Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                3. Symptom Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Just started today">Started today (&lt;24 hours)</option>
                <option value="2-3 days">2 - 3 days</option>
                <option value="1 week">About 1 week</option>
                <option value="More than 2 weeks">Chronic / More than 2 weeks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                4. Perceived Severity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["mild", "moderate", "severe"] as const).map((sev) => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`py-2.5 rounded-xl border text-xs font-bold capitalize transition-all ${
                      severity === sev
                        ? sev === "severe"
                          ? "bg-rose-500 text-white border-rose-500"
                          : sev === "moderate"
                          ? "bg-amber-500 text-white border-amber-500"
                          : "bg-emerald-600 text-white border-emerald-600"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={
                loading ||
                (selectedSymptoms.length === 0 && !customSymptom.trim())
              }
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Symptoms & Health Guidelines...
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4" />
                  Analyze Symptoms & Generate Triage Report
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in">
          {/* Triage Level Banner */}
          <div
            className={`p-5 rounded-2xl border flex items-start gap-4 ${
              result.urgencyColor === "rose"
                ? "bg-rose-50 border-rose-300 dark:bg-rose-950/50 dark:border-rose-800 text-rose-950 dark:text-rose-100"
                : result.urgencyColor === "amber"
                ? "bg-amber-50 border-amber-300 dark:bg-amber-950/50 dark:border-amber-800 text-amber-950 dark:text-amber-100"
                : "bg-emerald-50 border-emerald-300 dark:bg-emerald-950/50 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
            }`}
          >
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 shadow-sm shrink-0">
              {result.urgencyColor === "rose" ? (
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              ) : (
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              )}
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider opacity-75">
                Recommended Care Level:
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-0.5">
                {result.triageLevel}
              </h2>
              <p className="text-xs mt-1 opacity-90 leading-relaxed">
                {result.disclaimer}
              </p>
            </div>
          </div>

          {/* Potential Considerations */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">
              Potential Health Considerations (Non-Diagnostic)
            </h3>
            <div className="grid gap-3">
              {result.likelyConsiderations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {item.condition}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                      {item.relevance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Steps & Red Flags Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Action Steps */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Recommended Action Steps
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {result.actionSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags to Watch */}
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20">
              <h4 className="font-bold text-sm text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> Red Flag Warning Signs
              </h4>
              <ul className="space-y-2 text-xs text-rose-900 dark:text-rose-200">
                {result.redFlagsToWatch.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">⚠️</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={resetForm}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Check Another Symptom
            </button>

            <button
              onClick={() => onNavigateTab("chat")}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
            >
              Discuss symptoms with AI Companion <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
