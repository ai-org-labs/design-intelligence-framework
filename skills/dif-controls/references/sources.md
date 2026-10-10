# Official source register

Accessed 2026-10-11 JST. Short paraphrases only; no copied manuals or screenshots. Live documents can change. Apple content was inspected through the official-page search index when direct extraction returned a JavaScript shell; Material pages were read in headless Chromium. W3C/Android pages were read directly. No source's current visual rendering, native component behavior or assistive operation was tested by this research alone.

| ID | Source / kind | Scope of use |
| --- | --- | --- |
| A1 | [Apple HIG Settings](https://developer.apple.com/design/human-interface-guidelines/settings) · platform guidance | Defaults, scope of general/task/system settings, respecting system preferences |
| A2 | [Apple HIG Sliders](https://developer.apple.com/design/human-interface-guidelines/sliders) · platform guidance | Range/direction, exact-value field/stepper, iOS/iPadOS audio-volume exception |
| A3 | [Apple HIG Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields) · platform guidance | Labels, field layout, keyboard, validation context |
| A4 | [Apple HIG Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) · platform guidance | General 44pt hit-region guidance; not a physical-pixel or Web rule |
| D1 | [Android Compose accessibility defaults](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) · implementation guidance | 48dp target, built-in semantics and overlap risk |
| D2 | [Android: Organize your settings](https://developer.android.com/develop/ui/views/components/settings/organize-your-settings) · Views guidance | Categories and related subscreens; not a Compose API recipe |
| D3 | [Android Compose Slider](https://developer.android.com/develop/ui/compose/components/slider) · implementation guidance | Continuous/discrete range, value and enabled state |
| M1 | [Material 3 Sliders](https://m3.material.io/components/sliders/guidelines) · design-system guidance | Immediate feedback, numeric synchronization, range and keyboard behavior |
| M2 | [Material 3 Text fields](https://m3.material.io/components/text-fields/guidelines) · design-system guidance | Persistent labels, filled/outlined variants, error/supporting text, density |
| M3 | [Material 3 Switch](https://m3.material.io/components/switch/guidelines) · design-system guidance | Immediate binary choice; distinction from actions, radio and checkbox |
| W1 | [WCAG 2.2: target size explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · informative Understanding | SC 2.5.8 AA and exceptions; [normative criterion](https://www.w3.org/TR/WCAG22/#target-size-minimum) |
| W2 | [WCAG 2.2: dragging explanation](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) · informative Understanding | SC 2.5.7 AA, non-drag pointer path separate from keyboard; [normative criterion](https://www.w3.org/TR/WCAG22/#dragging-movements) |
| W3 | [WCAG: labels or instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions) · informative Understanding | Visible identification/instructions are distinct from an accessible name alone |
| W4 | [WAI form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) · tutorial | Inline/overall error and completion feedback |
| W5 | [WAI-ARIA APG Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) · authoring pattern | Keys, name/value/range semantics and touch-assistive warning |

Material 3 is a design system used beyond Android; Android is an OS platform. Do not make those terms synonymous. HIG includes several Apple platforms; only the relevant sections apply. DIF's persistence, conflict and draft-recovery recommendations are expert synthesis unless explicitly linked to a source; they are not invented quotations or new WCAG requirements.
