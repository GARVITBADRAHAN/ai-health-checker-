"use client";

import React, { useState } from "react";
import { PHQ9_ASSESSMENT, GAD7_ASSESSMENT } from "@/lib/screening-data";
import { ScreeningAssessment } from "@/types";
import { CheckCircle2, RotateCcw, FileText, ArrowRight, ArrowLeft, ShieldAlert, HeartHandshake, Info } from "lucide-react";

interface AssessmentSectionProps {
  openCrisisModal: () => void;
  onNavigateTab: (tab: "chat" | "screening" | "symptoms" | "mindfulness" | "mood") => void;
}

export default function AssessmentSection({
  openCrisisModal,
  onNavigateTab,
}: AssessmentSectionProps) {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<"phq9" | "gad7">("phq9");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const activeAssessment: ScreeningAssessment =
    selectedAssessmentId === "phq9" ? PHQ9_ASSESSMENT : GAD7_ASSESSMENT;

  const currentQuestion = activeAssessment.questions[currentQuestionIndex];
  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / activeAssessment.questions.length) * 100
  );

  const handleSelectOption = (score: number) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(updatedAnswers);

    // If last question was answered, complete assessment
    if (currentQuestionIndex + 1 >= activeAssessment.questions.length) {
      setIsCompleted(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  };

  const resetAssessment = (newId?: "phq9" | "gad7") => {
    if (newId) setSelectedAssessmentId(newId);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const totalScore = calculateTotalScore();
  const interpretation = activeAssessment.interpretScore(totalScore);

  // Check if Question 9 in PHQ-9 (thoughts of self-harm) has score > 0
  const phqQuestion9Score = selectedAssessmentId === "phq9" ? answers[9] : 0;
  const hasSelfHarmFlag = phqQuestion9Score && phqQuestion9Score > 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            📋 Standardized Mental Health Screenings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Clinically validated instruments used worldwide to evaluate depression & anxiety symptoms.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => resetAssessment("phq9")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedAssessmentId === "phq9"
                ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            PHQ-9 (Depression)
          </button>
          <button
            onClick={() => resetAssessment("gad7")}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedAssessmentId === "gad7"
                ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
            }`}
          >
            GAD-7 (Anxiety)
          </button>
        </div>
      </div>

      {!isCompleted ? (
        /* Assessment Question Stepper Card */
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 sm:p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {activeAssessment.questions.length}
              </span>
              <span>{progressPercent}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Context reminder */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-4 italic">
            <Info className="w-3.5 h-3.5" />
            Over the last 2 weeks, how often have you been bothered by:
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
            {currentQuestion.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.score;
              return (
                <button
                  key={opt.score}
                  onClick={() => handleSelectOption(opt.score)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between group ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  <span>{opt.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300 dark:border-slate-600 group-hover:border-emerald-500"
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 dark:border-slate-700/60">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={() => resetAssessment()}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              Reset Answers
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in">
          {/* Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Assessment Results
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                {activeAssessment.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Total Score:
              </span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
                {totalScore} / {activeAssessment.questions.length * 3}
              </span>
            </div>
          </div>

          {/* Self-harm Warning if triggered in PHQ-9 */}
          {hasSelfHarmFlag && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-900 dark:text-rose-200 text-sm">
                  Priority Safety Notice
                </h4>
                <p className="text-xs text-rose-800 dark:text-rose-300 mt-1 leading-relaxed">
                  You indicated thoughts regarding hurting yourself. Your safety is deeply important to us. Please connect with someone who can help right now by clicking below.
                </p>
                <button
                  onClick={openCrisisModal}
                  className="mt-2.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  View 24/7 Crisis Helplines
                </button>
              </div>
            </div>
          )}

          {/* Classification & Description */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Severity Tier:</span>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  interpretation.tier === "Minimal"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                    : interpretation.tier === "Mild"
                    ? "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300"
                    : interpretation.tier === "Moderate"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300"
                }`}
              >
                {interpretation.tier} Symptoms
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {interpretation.description}
            </p>

            <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 leading-relaxed">
              <span className="font-bold text-slate-800 dark:text-slate-100 block mb-1">
                Clinical Recommendation & Next Steps:
              </span>
              {interpretation.actionAdvice}
            </div>
          </div>

          {/* Action Recommendations Grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigateTab("mindfulness")}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 bg-white dark:bg-slate-800/60 text-left transition-all group"
            >
              <div className="text-xl mb-1">🌬️</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Practice Calming Breathing
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Use the 4-7-8 or Box Breathing pacer to lower autonomic nervous system arousal.
              </p>
            </button>

            <button
              onClick={() => onNavigateTab("chat")}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-400 bg-white dark:bg-slate-800/60 text-left transition-all group"
            >
              <div className="text-xl mb-1">💬</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                Discuss Results with AI Companion
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Explore personalized coping strategies, study routines, and cognitive tools.
              </p>
            </button>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => resetAssessment()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Screener
            </button>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              Screening tools do not provide a medical diagnosis. Share results with a licensed doctor or counselor.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
