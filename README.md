# 🌿 MindWell AI — Youth Mental Health Screening & Support Agent

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=flat&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)
![SDG 3](https://img.shields.io/badge/UN%20SDG-3%3A%20Good%20Health%20%26%20Well--being-22c55e?style=flat)

> **UN Sustainable Development Goal (SDG) 3: Good Health and Well-being**  
> **Problem Statement:** *"Lack of mental health support among youth results in stress and anxiety. This project aims to create an AI-powered chatbot for mental wellness check-ins and guidance."*

---

## 🌟 Key Features

1. **🤖 Empathetic Conversational AI Companion**
   - Non-judgmental check-ins for academic burnout, exam stress, insomnia, and anxiety.
   - Built-in clinical triage: Detects acute distress and triggers immediate safety warnings and verified crisis lines.
   - Dual-engine fallback: Connects seamlessly with Google Gemini 1.5 Flash / OpenAI, or runs entirely offline via an intelligent heuristic knowledge engine.

2. **📋 Validated Clinical Screening Screeners**
   - **PHQ-9 (Patient Health Questionnaire):** Standardized 9-question instrument measuring depressive severity (Minimal, Mild, Moderate, Moderately Severe, Severe).
   - **GAD-7 (Generalized Anxiety Disorder 7-item scale):** Standardized anxiety assessment with customized action plans.
   - Instant automated risk grading, tailored clinical recommendations, and printable summary.

3. **🩺 AI Early Disease Detection & Symptom Checker (SDG 3 Target 3.d)**
   - Conversational & structured health triage for somatic symptoms (tension headaches, viral syndromes, fatigue).
   - Color-coded care recommendations (*Home Care*, *Clinic / Telehealth*, *Urgent Care*, *Immediate Emergency*).
   - Clear medical disclaimers to ensure safe educational triage.

4. **🌬️ Interactive Mindfulness & Nervous System Regulation**
   - **Visual Breathing Pacer:** 4-7-8 relaxing breath and Box Breathing (4-4-4-4) with real-time animated countdowns.
   - **5-4-3-2-1 Sensory Grounding Tool:** Step-by-step interactive exercise to downregulate acute panic spirals.

5. **📊 Longitudinal Mood Journal**
   - Daily emotional check-in with factor tags (Exams, Sleep, Social, Health).
   - Automatic calculation of weekly emotional trends and wellness index.

6. **🚨 SOS Crisis Directory**
   - Direct 1-click dialing and resources for **Tele-MANAS & KIRAN (India)**, **988 (USA/Canada)**, **116 123 (UK)**, and international crisis networks.

---

## 🏗️ Architecture & Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with Dark/Light mode support
- **Icons:** Lucide React
- **Hosting:** 100% Vercel Serverless & Edge Ready (Zero heavy native backend dependencies)
- **AI Integrations:** Google Gemini 1.5 Flash / OpenAI GPT-4o-mini / Built-in Smart Clinical Fallback

---

## 🚀 How to Deploy on Vercel

### Method 1: Deploy with Git (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: MindWell AI platform for SDG 3"
   git branch -M main
   git remote add origin https://github.com/<your-username>/mindwell-ai.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository `mindwell-ai`.
   - Next.js is automatically detected! No build command overrides needed.

3. **(Optional) Add Environment Variables:**
   Under **Settings > Environment Variables**, you can add:
   - `GEMINI_API_KEY`: *(Get a free key from [Google AI Studio](https://aistudio.google.com/))*
   - `OPENAI_API_KEY`: *(Optional alternative)*

   > 💡 **Note:** Even if you do **not** configure any API key, the app works out-of-the-box using the built-in clinical AI engine!

4. Click **Deploy**! Your site will be live on `https://your-project.vercel.app` in under 60 seconds.

---

## 💻 Local Development

1. Clone or navigate to the directory:
   ```bash
   cd "ai immb project"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Alignment with UN Sustainable Development Goals (SDG 3)

- **Target 3.4:** By 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being.
- **Target 3.d:** Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks.

---

## ⚖️ Ethical & Clinical Disclaimer

*MindWell AI is designed strictly for psychoeducation, self-reflection, and preliminary symptom triage. It does NOT provide formal medical or psychiatric diagnosis or treatment. Users experiencing severe distress or thoughts of self-harm are actively guided to certified human crisis hotlines (988 / 14416 / 116 123).*
