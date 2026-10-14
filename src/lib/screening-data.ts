import { ScreeningAssessment } from "@/types";

const STANDARD_OPTIONS = [
  { label: "Not at all", score: 0 },
  { label: "Several days", score: 1 },
  { label: "More than half the days", score: 2 },
  { label: "Nearly every day", score: 3 },
];

export const PHQ9_ASSESSMENT: ScreeningAssessment = {
  id: "phq9",
  title: "PHQ-9 Depression Screener",
  shortDescription: "A standardized 9-question tool used worldwide to screen for depressive symptoms.",
  longDescription:
    "The Patient Health Questionnaire (PHQ-9) is a validated diagnostic instrument used by health professionals to measure the severity of depression in adolescents and adults.",
  source: "Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues.",
  questions: [
    {
      id: 1,
      text: "Little interest or pleasure in doing things you usually enjoy?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 2,
      text: "Feeling down, depressed, or hopeless?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 3,
      text: "Trouble falling or staying asleep, or sleeping too much?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 4,
      text: "Feeling tired, fatigued, or having very little energy?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 5,
      text: "Poor appetite, skipping meals, or overeating?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 6,
      text: "Feeling bad about yourself — or that you are a failure or have let yourself or your loved ones down?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 7,
      text: "Trouble concentrating on daily tasks, such as schoolwork, reading, or watching videos?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 8,
      text: "Moving or speaking noticeably slowly, or being unusually restless and fidgety?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 9,
      text: "Thoughts that you would be better off dead or of hurting yourself in any way?",
      options: STANDARD_OPTIONS,
    },
  ],
  interpretScore: (score: number) => {
    if (score <= 4) {
      return {
        tier: "Minimal",
        description: "Minimal or no depressive symptoms reported.",
        actionAdvice:
          "Your responses suggest healthy emotional resilience. Continue your positive wellness routines, regular sleep, and healthy habits.",
        color: "emerald",
      };
    }
    if (score <= 9) {
      return {
        tier: "Mild",
        description: "Mild depressive symptoms detected.",
        actionAdvice:
          "Mild stress or low mood may be affecting you. Consider regular exercise, mindfulness check-ins, sleep hygiene, and talking with a trusted friend or mentor.",
        color: "sky",
      };
    }
    if (score <= 14) {
      return {
        tier: "Moderate",
        description: "Moderate depressive symptoms detected.",
        actionAdvice:
          "Your score indicates noticeable emotional fatigue or sadness. We recommend speaking with a school counselor, mental health therapist, or healthcare provider for guidance.",
        color: "amber",
      };
    }
    if (score <= 19) {
      return {
        tier: "Moderately Severe",
        description: "Moderately severe symptoms detected.",
        actionAdvice:
          "Symptoms are significantly interfering with your daily life. Professional medical/psychological consultation is strongly recommended.",
        color: "orange",
      };
    }
    return {
      tier: "Severe",
      description: "Severe depressive symptoms detected.",
      actionAdvice:
        "Please connect with a healthcare provider or a 24/7 crisis support counselor right away. Support and effective treatments are readily available.",
      color: "rose",
    };
  },
};

export const GAD7_ASSESSMENT: ScreeningAssessment = {
  id: "gad7",
  title: "GAD-7 Anxiety Screener",
  shortDescription: "A 7-question clinical assessment for Generalized Anxiety Disorder & stress.",
  longDescription:
    "The Generalized Anxiety Disorder 7-item scale is an established, evidence-based questionnaire to measure anxiety severity among young people and adults.",
  source: "Developed by Drs. Robert L. Spitzer, Kurt Kroenke, Janet B.W. Williams, and Bernd Löwe.",
  questions: [
    {
      id: 1,
      text: "Feeling nervous, anxious, irritable, or on edge?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 2,
      text: "Not being able to stop or control worrying?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 3,
      text: "Worrying excessively about different things or worst-case scenarios?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 4,
      text: "Trouble relaxing or unwinding when you have downtime?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 5,
      text: "Being so restless that it's difficult to sit still?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 6,
      text: "Becoming easily annoyed, frustrated, or irritable?",
      options: STANDARD_OPTIONS,
    },
    {
      id: 7,
      text: "Feeling afraid or terrified as if something awful might happen?",
      options: STANDARD_OPTIONS,
    },
  ],
  interpretScore: (score: number) => {
    if (score <= 4) {
      return {
        tier: "Minimal",
        description: "Minimal anxiety symptoms reported.",
        actionAdvice:
          "Your anxiety levels are well within normal everyday fluctuations. Keep practicing proactive wellness and regular stress-reduction activities.",
        color: "emerald",
      };
    }
    if (score <= 9) {
      return {
        tier: "Mild",
        description: "Mild anxiety symptoms reported.",
        actionAdvice:
          "Occasional worry or stress may be present. Try our interactive breathing exercises, sensory grounding (5-4-3-2-1), and mindful breaks.",
        color: "sky",
      };
    }
    if (score <= 14) {
      return {
        tier: "Moderate",
        description: "Moderate anxiety symptoms reported.",
        actionAdvice:
          "Worry is noticeably impacting your routine. Exploring cognitive reframing, structured relaxation, or counseling sessions could be very beneficial.",
        color: "amber",
      };
    }
    return {
      tier: "Severe",
      description: "Severe anxiety symptoms reported.",
      actionAdvice:
        "High levels of anxiety require compassionate attention. Please reach out to a student counselor, physician, or trusted healthcare professional.",
      color: "rose",
    };
  },
};

export const HOTLINES = [
  {
    country: "United States & Canada",
    name: "988 Suicide & Crisis Lifeline",
    contact: "Call or text 988",
    available: "24/7, Free & Confidential",
    website: "https://988lifeline.org",
  },
  {
    country: "India",
    name: "Tele-MANAS (Govt. of India)",
    contact: "Toll-Free: 14416 or 1800-891-4416",
    available: "24/7 National Mental Health Helpline",
    website: "https://telemanas.mohfw.gov.in",
  },
  {
    country: "India",
    name: "KIRAN Mental Health Helpline",
    contact: "1800-599-0019",
    available: "24/7, Multilingual support",
    website: "https://disabilityaffairs.gov.in",
  },
  {
    country: "United Kingdom",
    name: "Samaritans UK",
    contact: "Call 116 123",
    available: "24/7 Free Helpline",
    website: "https://www.samaritans.org",
  },
  {
    country: "International",
    name: "Crisis Text Line",
    contact: "Text HOME to 741741 (US/UK/Canada)",
    available: "24/7 via SMS",
    website: "https://www.crisistextline.org",
  },
  {
    country: "Worldwide",
    name: "Befrienders Worldwide / IASP",
    contact: "Find your local center directory",
    available: "Directory of 400+ emotional support centers",
    website: "https://www.befrienders.org",
  },
];
