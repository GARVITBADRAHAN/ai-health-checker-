"use client";

import React from "react";
import { X, Phone, Globe, ShieldAlert, Heart, ExternalLink } from "lucide-react";
import { HOTLINES } from "@/lib/screening-data";

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-rose-200 dark:border-rose-900/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-600 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">24/7 Immediate Crisis Support</h2>
              <p className="text-xs text-rose-100">
                You are not alone. Free, confidential support is available right now.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl p-4 flex items-start gap-3 text-rose-900 dark:text-rose-200 text-sm">
            <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">If you are in immediate physical danger:</p>
              <p className="text-xs opacity-90 leading-relaxed">
                Please call your local emergency service (<strong>112</strong> in India/EU, <strong>911</strong> in US/Canada, <strong>999</strong> in UK) or go to the nearest hospital emergency room.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Verified Mental Health Helplines
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {HOTLINES.map((hotline, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-rose-300 dark:hover:border-rose-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">
                    <span>{hotline.country}</span>
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-700 dark:text-slate-300">
                      {hotline.available}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {hotline.name}
                  </h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                      {hotline.contact}
                    </span>
                    <a
                      href={hotline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 font-medium"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calming Reminder */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              "Whatever you are carrying today, you do not have to carry it by yourself. Reaching out is an act of incredible strength."
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
