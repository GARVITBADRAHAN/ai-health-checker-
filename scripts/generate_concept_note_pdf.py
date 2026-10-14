import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_concept_note_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#065f46'),
        spaceAfter=4,
    )

    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#0d9488'),
        spaceAfter=12,
    )

    h1_style = ParagraphStyle(
        'Heading1Custom',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#064e3b'),
        spaceBefore=12,
        spaceAfter=6,
    )

    body_style = ParagraphStyle(
        'BodyCustom',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#1f2937'),
        spaceAfter=6,
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#374151'),
        leftIndent=14,
        spaceAfter=4,
    )

    quote_style = ParagraphStyle(
        'QuoteCustom',
        fontName='Helvetica-Oblique',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#065f46'),
        leftIndent=16,
        rightIndent=16,
        spaceBefore=6,
        spaceAfter=8,
    )

    story = [
        Paragraph("PROJECT CONCEPT NOTE", title_style),
        Paragraph("MindWell AI: Intelligent Mental Health Screening & Early Health Guidance for Youth", sub_style),
        Paragraph("<b>United Nations Sustainable Development Goal 3:</b> Good Health and Well-being (Targets 3.4 & 3.d)", body_style),
        HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#059669'), spaceBefore=6, spaceAfter=12),

        Paragraph("1. Executive Summary", h1_style),
        Paragraph(
            "The contemporary youth demographic faces an unprecedented surge in psychological distress, academic anxiety, and depressive symptoms. Concurrently, prevailing societal stigma, high therapeutic costs, and severe counselor shortages hinder timely intervention. <b>MindWell AI</b> is an open-access, web-based digital health intervention engineered in direct alignment with UN SDG 3. By combining conversational large language models with validated psychometrics (PHQ-9 and GAD-7), somatic down-regulation biofeedback tools, and early symptom triage, MindWell AI provides accessible, confidential, and evidence-informed primary wellness support.",
            body_style
        ),

        Paragraph("2. Problem Statement", h1_style),
        Paragraph(
            "<i>\"Lack of mental health support among youth results in stress and anxiety. This project aims to create an AI-powered chatbot for mental wellness check-ins and guidance.\"</i>",
            quote_style
        ),
        Paragraph("<b>Key Systemic Challenges:</b>", body_style),
        Paragraph("• <b>Stigma & Concealment:</b> Over 70% of struggling adolescents report avoiding institutional clinics due to fear of academic judgment or parental reprimand.", bullet_style),
        Paragraph("• <b>Provider Shortage:</b> The global psychiatrist-to-youth ratio remains below 1 per 100,000 in developing countries, leading to months-long waitlists.", bullet_style),
        Paragraph("• <b>Somatic Progression:</b> Chronic untreated stress manifests into physiological ailments (tension headaches, insomnia, digestive issues), impairing educational continuity.", bullet_style),
        Paragraph("• <b>Crisis Gap:</b> Traditional appointment systems fail during acute moments of panic or nocturnal despair when students need immediate grounding.", bullet_style),

        Paragraph("3. Proposed Solution & Core Capabilities", h1_style),
        Paragraph("MindWell AI bridges this access gap through a multi-faceted digital wellness architecture:", body_style),
        Paragraph("• <b>Empathetic AI Companion:</b> Context-aware conversational agent for active listening, cognitive reframing, and exam de-stressing.", bullet_style),
        Paragraph("• <b>Standardized Clinical Screeners:</b> Validated PHQ-9 (Depression) & GAD-7 (Anxiety) scoring with instant risk tier classification.", bullet_style),
        Paragraph("• <b>AI Early Disease & Symptom Triage (SDG 3 Target 3.d):</b> Evaluates reported physical complaints against red-flag emergencies and recommends appropriate care levels.", bullet_style),
        Paragraph("• <b>Somatic Regulation Studio:</b> Real-time visual 4-7-8 and Box Breathing pacers, alongside a 5-4-3-2-1 sensory grounding module.", bullet_style),
        Paragraph("• <b>Instant Crisis Protocol:</b> Immediate heuristic safety detection connecting users to certified free 24/7 national hotlines (Tele-MANAS, KIRAN, 988, 116 123).", bullet_style),

        Paragraph("4. Technical Architecture & Tech Stack", h1_style),
        Paragraph(
            "Built with <b>Next.js 14 App Router</b>, <b>TypeScript</b>, and <b>Tailwind CSS</b> for instant serverless deployment on <b>Vercel</b>. The system employs a <b>Dual-Engine Architecture</b>: live Google Gemini 1.5 Flash / OpenAI inference when keys are provided, paired with an offline heuristic clinical triage engine to guarantee 100% uptime with zero 500 errors.",
            body_style
        ),

        Paragraph("5. Ethical, Privacy & Clinical Guardrails", h1_style),
        Paragraph("• <b>Explicit Disclaimers:</b> The application provides educational triage and self-care coaching, not formal psychiatric diagnosis.", bullet_style),
        Paragraph("• <b>Zero-PII Storage:</b> No personal tracking cookies or health record storage; session journals are kept strictly on the user's browser device.", bullet_style),
        Paragraph("• <b>Rapid Escalation:</b> Suicidal ideation flags bypass all normal bot chat and trigger emergency helpline cards immediately.", bullet_style),

        Spacer(1, 10),
        HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#cbd5e1'), spaceBefore=4, spaceAfter=8),
        Paragraph("<b>Submitted for:</b> AI Project Evaluation (SDG 3: Good Health & Well-being) | <b>Repository:</b> github.com/GARVITBADRAHAN/ai-health-checker-", ParagraphStyle('Foot', fontName='Helvetica', fontSize=8, textColor=colors.HexColor('#6b7280')))
    ]

    doc.build(story)
    print(f"Concept Note PDF created successfully at: {output_path}")

if __name__ == "__main__":
    os.makedirs("documents", exist_ok=True)
    create_concept_note_pdf("documents/Concept_Note_MindWell_AI.pdf")
