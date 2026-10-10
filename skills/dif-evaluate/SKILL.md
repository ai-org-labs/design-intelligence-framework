---
name: dif-evaluate
description: Review design alternatives or existing UX/UI using separate rule, expert and empirical evidence, with findings and uncertainty.
license: Apache-2.0
metadata:
  version: "0.1.0-dev.0"
---

# dif-evaluate

Start from who may be harmed and what failure is unacceptable. Inspect requirement/constraint fit before cosmetic quality. Work in the user's language. Use applicable lenses: CX, usability, accessibility, responsive/adaptive, visual design, interaction, IA, performance, consistency, reliability, localization, trust/ethics. State omissions and non-applicability.

For each finding record target ID, category → characteristic → criterion, method (rule/expert/empirical), severity, observed evidence, cause, loss boundary, proposed correction and uncertainty. Critical means violated hard boundary or material harm; high means blocked essential task; medium means recoverable friction; low means polish. Distinguish objective violations from interpretive disagreement.

Record design quality, feasibility and business value independently. Do not average mixed evidence types or score unknowns. Declared color checks concern opaque sRGB only; real rendering, focus, keyboard and assistive operation need runtime observation. Expert inference is not user evidence. Preserve conflicting judgments and propose discriminating tests.

For visual-quality reviews, assess appeal separately from usability defects: composition and focal point, typography, spacing rhythm, density, color roles, icon/shape consistency, product character and appropriate motion. Ground each judgment in a visible feature and the intended audience impression. Name what to preserve as well as what to change. Avoid generic praise such as “consistent palette” without explaining its effect. A beautiful static image does not establish usability, and a defect-free flow does not establish appeal. Use comparable visual alternatives to expose subjective disagreement rather than inventing a universal taste score; when current imagery is unavailable, mark visual judgment provisional.

For experiments, produce a plan for hypothesis, participants, tasks, measures, assignment, sample-size rationale, analysis, privacy and bias. Report underpowered or confounded results as inconclusive; do not claim to recruit participants or run A/B infrastructure.

For settings and forms, inspect populated/error/dependency states and transitions through edit, preview, save failure, retry, reset/undo and back. Evaluate control choice and precision, not just alignment. Verify the applicable platform source before numerical or conformance claims; CSS px, pt and dp are not interchangeable. A disabled control needs a discoverable reason; changing a value must not imply it was persisted. Optional `dif-controls` supplies detailed platform references when installed. Native behavior cannot be proven with a Web-styled mockup.

Review adaptation across available width/height, orientation changes during editing, text growth, density, input modes and theme/state combinations. Inspect material/detail choices at intended scale, not only enlarged artwork. Motion must retain feedback when reduced or interrupted. Attribute numerical criteria correctly (including WCAG levels/exceptions), distinguish opaque color calculations from actual rendering, and do not report viewport/DPR emulation as native rotation or hardware-display evidence.

Present the review in two layers: a short decision summary for the user and linked detailed findings/evidence. Start with the main recommendation and a compact table of priority, problem, user impact and correction; use short bullets for remaining checks. For substantial UI reviews, include visual evidence or a labeled schematic inline: show where a problem occurs, and use a before/proposed-after flow for state loss or navigation issues. Keep finding IDs consistent between table, visuals and detail. Screenshots show observed UI only to the extent their provenance supports; diagrams and mockups are explanations, not runtime evidence. Do not fabricate screenshots or use decorative images as evidence. If images/rendering are unavailable, provide a text diagram and state the limitation. Keep uncertainties visible beside claims, even in the concise summary.

With no CLI/tools, deliver text review and mark numerical/mechanical checks unverified. Do not approve adoption. Return findings, independent axes, evidence ledger, remaining risks and checks needed; the complete evidence can live in the linked detail rather than the chat summary.

When reviewing fonts or implementation choices, distinguish visual suitability, language coverage, loading/scaling, dependency compatibility and architecture fit. Check the actual versions and rendered behavior where available; library popularity, declared font names and passing dependency scans are not evidence of product usability. Record the recommendation and remaining checks without treating them as adoption.
