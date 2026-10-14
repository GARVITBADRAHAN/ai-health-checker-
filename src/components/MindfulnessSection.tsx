"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Wind, Sparkles, CheckSquare, Square, Volume2, Shield } from "lucide-react";

export default function MindfulnessSection() {
  const [technique, setTechnique] = useState<"4-7-8" | "box">("4-7-8");
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Rest">("Inhale");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // 5-4-3-2-1 Grounding state
  const [groundingChecks, setGroundingChecks] = useState<Record<number, boolean>>({});

  // Breathing timer loop
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transitions
        if (technique === "4-7-8") {
          if (phase === "Inhale") {
            setPhase("Hold");
            return 7;
          } else if (phase === "Hold") {
            setPhase("Exhale");
            return 8;
          } else {
            setPhase("Inhale");
            setCyclesCompleted((c) => c + 1);
            return 4;
          }
        } else {
          // Box breathing: 4-4-4-4
          if (phase === "Inhale") {
            setPhase("Hold");
            return 4;
          } else if (phase === "Hold") {
            setPhase("Exhale");
            return 4;
          } else if (phase === "Exhale") {
            setPhase("Rest");
            return 4;
          } else {
            setPhase("Inhale");
            setCyclesCompleted((c) => c + 1);
            return 4;
          }
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, phase, technique]);

  const toggleRun = () => {
    setIsRunning(!isRunning);
  };

  const resetBreathing = () => {
    setIsRunning(false);
    setPhase("Inhale");
    setSecondsLeft(4);
    setCyclesCompleted(0);
  };

  const handleTechniqueChange = (t: "4-7-8" | "box") => {
    setTechnique(t);
    setIsRunning(false);
    setPhase("Inhale");
    setSecondsLeft(4);
    setCyclesCompleted(0);
  };

  const toggleGroundingCheck = (idx: number) => {
    setGroundingChecks((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Wind className="w-4 h-4" /> Somatic Regulation & Nervous System Calming
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Calm & Grounding Studio
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Scientifically proven breathing patterns and sensory grounding to rapidly down-regulate acute stress, exam anxiety, and racing thoughts.
        </p>
      </div>

      {/* Grid: Breathing Pacer + Grounding Tool */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Breathing Pacer Card */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 sm:p-8 flex flex-col items-center justify-between text-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Interactive Breathing Pacer
            </span>
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => handleTechniqueChange("4-7-8")}
                className={`px-3 py-1 rounded-md transition-all ${
                  technique === "4-7-8"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                4-7-8 Relax
              </button>
              <button
                onClick={() => handleTechniqueChange("box")}
                className={`px-3 py-1 rounded-md transition-all ${
                  technique === "box"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Box 4-4-4-4
              </button>
            </div>
          </div>

          {/* Visual Animated Breathing Circle */}
          <div className="my-6 relative flex items-center justify-center w-56 h-56">
            {/* Outer animated halo ring */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                phase === "Inhale"
                  ? "scale-125 bg-emerald-400/20 dark:bg-emerald-500/20 ring-4 ring-emerald-400/40"
                  : phase === "Hold"
                  ? "scale-125 bg-teal-400/25 dark:bg-teal-500/25 ring-4 ring-teal-400/50"
                  : phase === "Exhale"
                  ? "scale-90 bg-sky-400/20 dark:bg-sky-500/20 ring-4 ring-sky-400/30"
                  : "scale-100 bg-slate-200/40 ring-2 ring-slate-300"
              }`}
            />

            {/* Inner circle with countdown */}
            <div className="z-10 w-44 h-44 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex flex-col items-center justify-center shadow-2xl p-4 transition-transform duration-700">
              <span className="text-xs uppercase tracking-widest font-semibold opacity-90">
                {phase}
              </span>
              <span className="text-5xl font-black my-1 font-mono">{secondsLeft}</span>
              <span className="text-[11px] opacity-80">
                {phase === "Inhale"
                  ? "Breathe in deeply"
                  : phase === "Hold"
                  ? "Gently hold breath"
                  : phase === "Exhale"
                  ? "Slowly release mouth"
                  : "Pause & center"}
              </span>
            </div>
          </div>

          {/* Cycles info */}
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
            Cycles Completed: <span className="font-bold text-emerald-600">{cyclesCompleted}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full">
            <button
              onClick={toggleRun}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                isRunning
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Start Pacer
                </>
              )}
            </button>

            <button
              onClick={resetBreathing}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Reset Pacer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-4-3-2-1 Sensory Grounding Card */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                5-4-3-2-1 Sensory Grounding
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Ground your nervous system in physical reality to instantly interrupt panic or intrusive spiraling thoughts.
            </p>

            <div className="space-y-3">
              {[
                {
                  id: 5,
                  title: "5 Things You Can SEE",
                  hint: "Notice patterns on the ceiling, colors, shadows, a pencil.",
                  emoji: "👀",
                },
                {
                  id: 4,
                  title: "4 Things You Can TOUCH",
                  hint: "Feel your watch, the desk texture, feet on the floor.",
                  emoji: "✋",
                },
                {
                  id: 3,
                  title: "3 Things You Can HEAR",
                  hint: "A distant hum, wind, keyboard clicks, breathing.",
                  emoji: "👂",
                },
                {
                  id: 2,
                  title: "2 Things You Can SMELL",
                  hint: "Scent of coffee, hand sanitizer, fresh room air.",
                  emoji: "👃",
                },
                {
                  id: 1,
                  title: "1 Thing You Can TASTE",
                  hint: "A sip of cold water, mint, or the taste on your tongue.",
                  emoji: "👅",
                },
              ].map((step) => {
                const isChecked = !!groundingChecks[step.id];
                return (
                  <button
                    key={step.id}
                    onClick={() => toggleGroundingCheck(step.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      isChecked
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 line-through opacity-80"
                        : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400"
                    }`}
                  >
                    <div className="mt-0.5 text-base">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{step.emoji}</span>
                        <span>{step.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {step.hint}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
            <span>
              Checked {Object.values(groundingChecks).filter(Boolean).length} of 5
            </span>
            <button
              onClick={() => setGroundingChecks({})}
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
            >
              Reset Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
