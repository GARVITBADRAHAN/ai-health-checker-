import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669",
};

export const metadata: Metadata = {
  title: "MindWell AI — Youth Mental Health Screening & Support (SDG 3)",
  description:
    "AI agent for mental wellness check-ins, standardized PHQ-9 / GAD-7 clinical screenings, and early symptom triage aligned with UN Sustainable Development Goal 3.",
  keywords: [
    "mental health",
    "SDG 3",
    "youth wellness",
    "AI health agent",
    "PHQ-9",
    "GAD-7",
    "symptom checker",
    "depression screening",
    "anxiety screening",
    "Vercel",
  ],
  authors: [{ name: "MindWell Health Initiative" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
