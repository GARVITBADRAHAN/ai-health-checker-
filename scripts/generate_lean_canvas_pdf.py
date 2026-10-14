import os
from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def create_lean_canvas_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=landscape(letter),
        leftMargin=20,
        rightMargin=20,
        topMargin=20,
        bottomMargin=20,
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#065f46'),
        spaceAfter=2,
    )
    
    sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#4b5563'),
        spaceAfter=8,
    )

    box_title_style = ParagraphStyle(
        'BoxTitle',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor('#064e3b'),
        spaceAfter=4,
    )

    box_body_style = ParagraphStyle(
        'BoxBody',
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor('#1f2937'),
    )

    bold_prefix_style = ParagraphStyle(
        'BoldPrefix',
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor('#111827'),
    )

    def p(text, is_bold=False):
        style = bold_prefix_style if is_bold else box_body_style
        return Paragraph(text, style)

    # Box Contents
    problem_cell = [
        Paragraph("1. PROBLEM", box_title_style),
        p("• 1 in 7 youth experience mental disorders (WHO), largely untreated due to stigma."),
        p("• Severe shortage of campus counselors (months-long waitlists)."),
        p("• High private therapy fees ($100-$200/hr) unaffordable for students."),
        p("• Untreated anxiety turns into somatic illnesses (tension headaches, fatigue, insomnia)."),
        Spacer(1, 4),
        Paragraph("Existing Alternatives:", box_title_style),
        p("Overbooked school clinics, anxiety-inducing web searches, untrained peer chats.")
    ]

    solution_cell = [
        Paragraph("4. SOLUTION", box_title_style),
        p("• Empathetic AI check-in companion for youth academic burnout and stress."),
        p("• Validated clinical screeners (PHQ-9 & GAD-7) with instant risk grading."),
        p("• Early symptom triage agent evaluating somatic complaints against red flags."),
        p("• Interactive somatic regulation: 4-7-8/box breathing pacer & 5-4-3-2-1 grounding."),
        p("• Instant safety trigger connecting users directly to verified crisis hotlines.")
    ]

    uvp_cell = [
        Paragraph("3. UNIQUE VALUE PROP.", box_title_style),
        p("<b>\"24/7 private, judgment-free AI mental health check-ins, standardized clinical screening, and early disease guidance in every youth's pocket.\"</b>"),
        Spacer(1, 4),
        Paragraph("High-Level Concept:", box_title_style),
        p("A confidential first-line digital clinical triage nurse and emotional wellness companion aligned with UN SDG 3.")
    ]

    unfair_advantage_cell = [
        Paragraph("9. UNFAIR ADVANTAGE", box_title_style),
        p("• 100% serverless Vercel edge architecture with zero heavy dependencies."),
        p("• Dual-engine fallback: live Google Gemini 1.5 LLM + offline clinical heuristic engine (zero 500 errors)."),
        p("• Evidence-based clinical psychometrics (PHQ-9 & GAD-7) rather than generic open-ended chat.")
    ]

    customer_segments_cell = [
        Paragraph("2. CUSTOMER SEGMENTS", box_title_style),
        p("• High school & university students facing exam pressure, burnout, or social anxiety."),
        p("• Young adults seeking confidential mental health guidance without stigma."),
        p("• Educational institutions and student wellness departments."),
        Spacer(1, 4),
        Paragraph("Early Adopters:", box_title_style),
        p("College students actively studying for competitive exams seeking 24/7 private stress check-ins.")
    ]

    key_metrics_cell = [
        Paragraph("8. KEY METRICS", box_title_style),
        p("• Daily active check-ins & conversation depth."),
        p("• Assessment completion rate (PHQ-9 / GAD-7)."),
        p("• Crisis interventions successfully routed to emergency hotlines."),
        p("• Somatic calming tool usage (breathing cycles completed).")
    ]

    channels_cell = [
        Paragraph("5. CHANNELS", box_title_style),
        p("• Student unions, campus mental health clubs, university orientation events."),
        p("• Peer wellness forums (Reddit r/mentalhealth, student Discord & Telegram)."),
        p("• Instant frictionless web app deployed on Vercel (no app-store download required)."),
        p("• Partnerships with student welfare organizations & youth NGOs.")
    ]

    cost_structure_cell = [
        Paragraph("7. COST STRUCTURE", box_title_style),
        p("• <b>AI Inference:</b> Google Gemini 1.5 Flash / OpenAI edge calls (free tier / micro-costs)."),
        p("• <b>Cloud & Compute:</b> Vercel serverless edge deployment (scalable free-tier to low-cost)."),
        p("• <b>Clinical Review:</b> Licensed psychologist periodic content audits & safety guidelines."),
        p("• <b>Maintenance:</b> Open-source maintenance, domain, and security audits.")
    ]

    revenue_streams_cell = [
        Paragraph("6. REVENUE STREAMS", box_title_style),
        p("• <b>Free Tier (B2C):</b> 100% free core wellness screening & self-care for all students (SDG 3 public health mission)."),
        p("• <b>Campus B2B Licensing:</b> White-label mental health portal for universities with anonymized aggregated cohort analytics."),
        p("• <b>Telehealth Referral Network:</b> Optional affiliate referrals to verified certified human therapists for moderate-to-severe cases."),
        p("• <b>CSR & Health Grants:</b> UN SDG innovation grants and corporate employee wellness funding.")
    ]

    # Build the 9-box table grid
    # Grid Layout:
    # Row 0: Problem | Solution | UVP | Unfair Advantage | Customer Segments
    # Row 1: Problem | Key Metrics | UVP | Channels | Customer Segments
    # Row 2: Cost Structure (cols 0-2) | Revenue Streams (cols 3-4)

    col_widths = [150, 150, 150, 150, 152]
    
    table_data = [
        [problem_cell, solution_cell, uvp_cell, unfair_advantage_cell, customer_segments_cell],
        ["", key_metrics_cell, "", channels_cell, ""],
        [cost_structure_cell, "", "", revenue_streams_cell, ""]
    ]

    canvas_table = Table(
        table_data,
        colWidths=col_widths,
        rowHeights=[195, 145, 95]
    )

    canvas_table.setStyle(TableStyle([
        # Grid lines
        ('INNERGRID', (0,0), (-1,-1), 0.75, colors.HexColor('#cbd5e1')),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor('#065f46')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        
        # Spanning for Column 0 (Problem spans row 0 and 1)
        ('SPAN', (0, 0), (0, 1)),
        # Spanning for Column 2 (UVP spans row 0 and 1)
        ('SPAN', (2, 0), (2, 1)),
        # Spanning for Column 4 (Customer Segments spans row 0 and 1)
        ('SPAN', (4, 0), (4, 1)),
        # Spanning for Bottom Row (Cost spans cols 0-2, Revenue spans cols 3-4)
        ('SPAN', (0, 2), (2, 2)),
        ('SPAN', (3, 2), (4, 2)),

        # Background colors
        ('BACKGROUND', (0, 0), (0, 1), colors.HexColor('#f0fdf4')),
        ('BACKGROUND', (1, 0), (1, 0), colors.HexColor('#ffffff')),
        ('BACKGROUND', (2, 0), (2, 1), colors.HexColor('#ecfdf5')),
        ('BACKGROUND', (3, 0), (3, 0), colors.HexColor('#ffffff')),
        ('BACKGROUND', (4, 0), (4, 1), colors.HexColor('#f0fdf4')),
        ('BACKGROUND', (1, 1), (1, 1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (3, 1), (3, 1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (0, 2), (2, 2), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (3, 2), (4, 2), colors.HexColor('#f0fdf4')),
    ]))

    story = [
        Paragraph("MindWell AI — LEAN CANVAS (SDG 3: Good Health & Well-being)", title_style),
        Paragraph("<b>Project:</b> AI-Agent for Mental Health Screening & Youth Well-being Support | <b>Framework:</b> Ash Maurya's Lean Canvas Model", sub_style),
        canvas_table
    ]

    doc.build(story)
    print(f"Lean Canvas PDF created successfully at: {output_path}")

if __name__ == "__main__":
    os.makedirs("documents", exist_ok=True)
    create_lean_canvas_pdf("documents/Lean_Canvas_MindWell_AI.pdf")
