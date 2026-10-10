---
name: dif-ux-ui
description: Detail flows, responsive screens, forms, settings, component states and mockup specifications for selected design candidates; initial finalized package scope is registration/login.
license: Apache-2.0
metadata:
  version: "0.1.0-dev.0"
---

# dif-ux-ui

Accept candidate briefs and constraints; retain their stable IDs and assumptions. Produce each candidate's relevant journey, including failure, retry, recovery, cancellation and success. For authentication, cover registration and returning login. For settings/forms, cover edit, preview, commit, failure, reset/undo and leaving. Use standard Mermaid flowchart for actual transitions. Mark modal and within-screen state changes explicitly.

Specify layout hierarchy, labels, focus order, keyboard interactions, disabled/loading/success/error states, feedback, responsive behavior at narrow/wide widths and Japanese/English expansion. Allow password manager/paste, avoid unnecessary repeated entry, and describe recovery without claiming an implemented authentication system.

Produce a mockup using available vector/image tools and link screen/component IDs. An SVG is acceptable; text is a fallback specification, not a completed image. Do not claim responsive/assistive behavior was tested from static artwork. Avoid extra personal data and distinguish design intention from real security evidence.

When visual appeal is in scope, use the [visual craft guide](references/visual-craft.md) to turn the intended impression into comparable screen studies, critique specific visual decisions, and refine the strongest direction before presenting it. Keep a provisional recommendation separate from human adoption.

For responsive, density/resolution, rotation, animation, color or material/detail work, use [adaptive finish](references/adaptive-finish.md). Specify transformations across width and height, state preservation, logical versus physical pixels, semantic theme tokens, motion/reduced-motion behavior and component detail treatment. Show evidence in the relevant environments; a desktop/narrow pair alone is insufficient for those claims.

Output flows, screen/component tables, image or explicitly unavailable status, assumptions and implementation risks. No CLI, renderer or companion skill is mandatory for text work; stop at declared budget.

For dense settings or detailed controls, optionally use `dif-controls` when installed. Independently specify each control's choice rationale, value/unit/range/step, current/default state, dependencies, preview/commit timing, persistence, failure recovery and leave behavior. Identify Web versus native platform and current guidance; do not equate CSS px, pt and dp or infer accessibility conformance from static layouts. Include populated and error/dependency states instead of only the clean screen.

For implementation handoff, map type/color/spacing roles to tokens, semantic components and feature screens. Inspect the existing framework and dependency versions before proposing a library. Explain state ownership, invalid draft versus preview/committed value, persistence and failures. Compare font fallback/loading and a representative difficult interaction; retain unknown compatibility rather than infer it from a mockup.

Design recurring UI as reusable semantic components with explicit variants, states, content slots and ownership. Map screens to shared sources and define brand/theme overrides without weakening accessibility or state behavior. Demonstrate a shared change across consumers; record exceptions instead of duplicating components silently.
