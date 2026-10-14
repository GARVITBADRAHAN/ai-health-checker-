import { NextRequest, NextResponse } from "next/server";

export interface SymptomTriageResult {
  triageLevel: "Home Care & Rest" | "Consult Telehealth / Clinic" | "Seek Urgent Care" | "Emergency Care Immediate";
  urgencyColor: "emerald" | "sky" | "amber" | "rose";
  likelyConsiderations: {
    condition: string;
    description: string;
    relevance: string;
  }[];
  redFlagsToWatch: string[];
  actionSteps: string[];
  preventiveAdvice: string[];
  disclaimer: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptoms = "", duration = "", severity = "mild", age = "young_adult", additionalNotes = "" } = body;

    const lowerSymptoms = (symptoms + " " + additionalNotes).toLowerCase();

    // Check emergency red flags
    const hasEmergencyRedFlags =
      lowerSymptoms.includes("chest pain") ||
      lowerSymptoms.includes("cannot breathe") ||
      lowerSymptoms.includes("difficulty breathing") ||
      lowerSymptoms.includes("shortness of breath") ||
      lowerSymptoms.includes("passed out") ||
      lowerSymptoms.includes("unconscious") ||
      lowerSymptoms.includes("coughing blood") ||
      lowerSymptoms.includes("sudden numbness") ||
      lowerSymptoms.includes("slurred speech") ||
      severity === "severe";

    if (hasEmergencyRedFlags) {
      const emergencyResponse: SymptomTriageResult = {
        triageLevel: "Emergency Care Immediate",
        urgencyColor: "rose",
        likelyConsiderations: [
          {
            condition: "Acute Cardiopulmonary or Neurological Event",
            description: "Severe symptoms like chest pressure, respiratory distress, or sudden focal neurological deficits require rapid clinical intervention.",
            relevance: "High Priority Emergency",
          },
        ],
        redFlagsToWatch: [
          "Crushing chest pressure radiating to arm, jaw, or back",
          "Severe inability to catch your breath or blue lips",
          "Sudden weakness or numbness on one side of the body",
          "Loss of consciousness or confusion",
        ],
        actionSteps: [
          "Immediately call emergency services (911 in US, 112 in India/Europe, 999 in UK)",
          "Do NOT attempt to drive yourself to the hospital",
          "Sit down in an upright, relaxed position and unlock front doors for responders",
        ],
        preventiveAdvice: [
          "Always prioritize immediate professional medical assistance over self-evaluation.",
        ],
        disclaimer: "EMERGENCY ALERT: This is an automated educational triage tool. Do not delay professional emergency care.",
      };
      return NextResponse.json(emergencyResponse);
    }

    // Headache / Migraine / Eye strain
    if (lowerSymptoms.includes("headache") || lowerSymptoms.includes("migraine") || lowerSymptoms.includes("temple")) {
      const result: SymptomTriageResult = {
        triageLevel: severity === "moderate" ? "Consult Telehealth / Clinic" : "Home Care & Rest",
        urgencyColor: severity === "moderate" ? "amber" : "emerald",
        likelyConsiderations: [
          {
            condition: "Tension-Type Headache or Digital Eye Strain",
            description: "Common among students and youth due to prolonged screen exposure, posture fatigue, dehydration, or academic stress.",
            relevance: "Common",
          },
          {
            condition: "Stress / Sleep Deficit Induced Headache",
            description: "Disrupted sleep cycles or cortisol spikes trigger vascular and muscular constriction in the scalp.",
            relevance: "Frequent",
          },
        ],
        redFlagsToWatch: [
          "Sudden, explosive 'thunderclap' headache (worst headache of your life)",
          "Stiff neck with high fever and sensitivity to bright light",
          "Headache following head trauma or accompanied by confusion",
        ],
        actionSteps: [
          "Apply the 20-20-20 rule: Every 20 minutes of screen time, look 20 feet away for 20 seconds",
          "Drink 500ml of water and electrolyte fluids",
          "Rest in a quiet, darkened room with a warm or cool compress on your forehead",
        ],
        preventiveAdvice: [
          "Maintain regular sleep-wake schedules even on weekends",
          "Check desk ergonomics and posture",
          "Practice daily 5-minute mindfulness breathing",
        ],
        disclaimer: "Educational health triage aligned with UN SDG 3. Not a formal clinical diagnosis.",
      };
      return NextResponse.json(result);
    }

    // Cold, flu, fever, respiratory
    if (
      lowerSymptoms.includes("fever") ||
      lowerSymptoms.includes("cough") ||
      lowerSymptoms.includes("sore throat") ||
      lowerSymptoms.includes("cold") ||
      lowerSymptoms.includes("runny nose")
    ) {
      const result: SymptomTriageResult = {
        triageLevel: severity === "moderate" ? "Consult Telehealth / Clinic" : "Home Care & Rest",
        urgencyColor: severity === "moderate" ? "amber" : "emerald",
        likelyConsiderations: [
          {
            condition: "Viral Upper Respiratory Tract Infection (Common Cold / Flu)",
            description: "Self-limiting viral syndrome affecting nasal passages, pharynx, and bronchial airways.",
            relevance: "Very Common",
          },
          {
            condition: "Seasonal Allergic Rhinitis",
            description: "Immune hypersensitivity to environmental allergens (pollen, dust mites).",
            relevance: "Common",
          },
        ],
        redFlagsToWatch: [
          "Fever above 103°F (39.4°C) that does not come down with fever medication",
          "Stridor or wheezing when breathing",
          "Inability to swallow liquids or severe ear pain",
          "Symptoms lasting more than 10-12 days without improvement",
        ],
        actionSteps: [
          "Rest adequately: sleep allows the immune system to synthesize cytokines",
          "Warm saline gargles 3 times a day for sore throat relief",
          "Steam inhalation and warm herbal broths or honey-lemon water",
          "Monitor temperature twice daily",
        ],
        preventiveAdvice: [
          "Frequent hand hygiene with soap and water for 20 seconds",
          "Maintain optimal indoor humidity and ventilation",
          "Stay up to date with seasonal influenza vaccinations",
        ],
        disclaimer: "Educational health triage aligned with UN SDG 3. Not a formal clinical diagnosis.",
      };
      return NextResponse.json(result);
    }

    // Default General Triage
    const defaultResult: SymptomTriageResult = {
      triageLevel: severity === "moderate" ? "Consult Telehealth / Clinic" : "Home Care & Rest",
      urgencyColor: severity === "moderate" ? "amber" : "emerald",
      likelyConsiderations: [
        {
          condition: "Mild Somatic or Lifestyle-Related Symptoms",
          description: "Symptoms may be influenced by physical fatigue, emotional stress, dehydration, or nutritional changes.",
          relevance: "Possible",
        },
      ],
      redFlagsToWatch: [
        "Unexplained rapid weight loss or severe night sweats",
        "Persistent high fever or chills",
        "Progressive worsening over several days",
      ],
      actionSteps: [
        "Keep a daily symptom journal recording when symptoms peak and what eases them",
        "Ensure adequate hydration (2-3 liters of clean water daily)",
        "Schedule a routine consultation with your family physician or university health center",
      ],
      preventiveAdvice: [
        "Balanced nutrition rich in whole grains, fruits, and lean proteins",
        "Aim for 7 to 8.5 hours of uninterrupted sleep",
      ],
      disclaimer: "Educational health triage aligned with UN SDG 3. Always seek medical guidance for persistent ailments.",
    };

    return NextResponse.json(defaultResult);
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : "Internal error";
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
