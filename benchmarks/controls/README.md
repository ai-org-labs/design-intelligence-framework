# Detailed-controls trials

Run `dif-controls` standalone with a realistic brief and the relevant platform sources. These are human/agent behavior trials, not the mechanical `npm run benchmark` suite. Never call the authored sample an independent pass.

| Case | Input | Required distinctions |
| --- | --- | --- |
| C1 | Web settings with eight fields, two sliders, dependencies and delayed remote save | Grouping, exact entry, draft vs preview vs saved, failure retention, non-drag and keyboard paths |
| C2 | iOS/iPadOS app with task controls hidden in general settings | Task/general/system scope, system controls, Dynamic Type/back/VoiceOver plan; no blanket Web 24px rule |
| C3 | Android panel with tiny drawn switches and sliders | Actual hit area vs icon, 48dp context, no overlapping expansion, immediate switch vs saved multi-selection |
| C4 | Invalid/empty numeric input, IME composition and decimal locale | Preserve intermediate input, do not coerce empty to zero, validation timing and recovery |
| C5 | Preview changed, remote save failed, user navigates back and resets | Last committed state, retained draft, retry, reset scope and undo, async race policy |
| C7 | Portrait draft + modal → landscape, tablet split view, short-height keyboard | Preserve values/focus/commit state; native recreation separate from viewport resize |
| C8 | 200% text, DPR 1/3, light/dark/forced colors, interrupted motion | Distinguish density/layout; inspect detail crops, semantic colors and reduced-motion feedback; no emulator-as-device claim |
| C6 | Source inaccessible, mockup only, unknown OS | Report limits; do not invent guideline compliance or native verification |

Evaluate independently: task grouping, control fit, state completeness, platform applicability, accessibility plan, recovery, visual readability and evidence honesty. For each use missing / weak / useful / strong with artifact references; no summed quality score. Record false positives and ignored exceptions, especially target sizing. Human adoption and native-device outcomes remain separate.

Status: authored Web sample `examples/settings-detail` exercises local state transitions. These prompts have not been independently run. iOS/Android device trials, assistive technology, keyboard/IME on devices and user success rates remain unmeasured.

Additional unrun trial: given an existing product manifest, Japanese/Latin content and a proposed UI plugin, compare typography/fallback and plugin/framework fit. Include keeping the current stack; inspect state ownership and migration cost. Mark unsupported version/license/rendering claims unknown. Do not install dependencies or claim adoption solely from the recommendation.
