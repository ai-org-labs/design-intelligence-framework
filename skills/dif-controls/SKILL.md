---
name: dif-controls
description: Design or review detailed settings, forms and dense control panels across Web, iOS/iPadOS and Android, including control choice, precision input, dependencies, save semantics, recovery and platform-specific interaction.
license: Apache-2.0
metadata:
  version: "0.1.0-dev.0"
---

# dif-controls

Work in the user's language. Deliver concrete screen composition and interaction specifications, not a generic accessibility checklist. This skill is standalone; renderers, CLI and other Skills are optional. Read [control design](references/control-design.md), the relevant section of [platform guidance](references/platform-guidance.md), and its linked source before making a version-sensitive claim. [Sources](references/sources.md) distinguishes standards, advisory patterns, platform guidance and DIF synthesis.

1. Identify platform/runtime/OS or browser, input modes, users, main task, density and loss boundaries. If unknown, state an assumption; do not transfer native pt/dp rules into CSS pixels or claim OS fidelity from a styled Web mockup.
2. Group settings by user purpose and effect scope. Keep task-local adjustments near their result; distinguish navigation rows from value-changing controls. Specify current-value summaries, progressive disclosure, dependency explanations and search when scale warrants it.
3. For each control define label, value/unit/range/step, default, selection cardinality, effect scope, preview timing, commit/persistence timing, undo/reset and loading/error/disabled/read-only states. Distinguish visible size from actual hit area. Keep value, semantic state and displayed feedback synchronized.
4. Choose the control by the decision: action/button, independent immediate binary setting/switch, multiple selections/checkboxes, single selection/radio or picker, rough bounded continuous adjustment/slider, precise value/numeric input or stepper. Account for the actual platform's conventions and data semantics, not appearance alone.
5. Show a populated screen and important alternate states (validation, dependency off, pending save, failed save and recovery), plus a narrow layout when relevant. Include a control/state table and a small transition diagram. If images are unavailable, provide an explicit layout specification and mark visual review unverified.
6. Check leave/back behavior, persistence failures, dependent values, asynchronous stale responses, keyboard/IME, focus, locale, large text, touch and assistive operation as applicable. Report exactly what was observed; a declaration or screenshot is not a runtime accessibility test. Review hidden state loss before cosmetic polish.

Return concise visual feedback, a control-choice rationale, platform differences, evidence and unresolved checks. Produce proposals within scope; do not change real OS settings, request permissions, send data or overwrite a product's configuration just to demonstrate a control. Human adoption remains pending.
