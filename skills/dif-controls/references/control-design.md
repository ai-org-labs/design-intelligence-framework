# Detailed control design

This is DIF design synthesis unless a source ID is cited. It is a decision aid, not a universal layout rule or conformance engine. Read the [source register](sources.md) for scope and verification limits.

## Settings information architecture

Inventory settings by **user goal × frequency × effect scope × reversibility**. Distinguish app-wide preferences, document/project settings and task-local adjustments. Avoid moving frequently adjusted task controls into distant global settings [A1]. Group by the user's purpose, not the implementation module. Use section headings for scanability; split truly distinct or large groups into detail screens [D2]. No fixed maximum row count is implied.

Show current choices in navigation-row summaries. A chevron means a deeper destination, not “toggle now.” Avoid a row with multiple competing actions or duplicate accessibility focus targets. Detail screens need a clear title, back destination, state restoration and a visible save model. Important save/recovery actions must not live only inside an initially collapsed advanced section.

Use stable label/value alignment, grouped help and restrained separators to make dense screens legible. Increase density by removing repetition before shrinking controls. Limit form width on large screens, stack when content or text scaling demands it, and preserve logical reading order. Tables suit cross-item comparison; they are not mandatory for every form. Advanced disclosure must not hide why a currently visible control has no effect.

## Choose a control

| Decision | Candidate | Important boundary |
| --- | --- | --- |
| Execute an action | Button | Verb label, pending/pressed state; not a switch |
| One immediate on/off effect | Switch | Label describes ON; persistence failure must be visible [M3] |
| Multiple selections committed together | Checkboxes | State may remain a draft until explicit save; describe that model |
| Exactly one of a few visible alternatives | Radio group / platform segmented choice | Radio permits comparison; segments suit short peers, not long explanatory text |
| One of many alternatives | Select/picker or searchable selection | Show current value; retain search and selection on return |
| Approximate bounded magnitude | Slider | Show units and ends, choose meaningful step; expose value without dragging [A2, M1] |
| Exact magnitude | Numeric field / stepper, optionally paired slider | Handle temporary empty input, decimal conventions, range and precision |
| Date/time | Platform date/time input | State timezone and locale when consequential; don't use arbitrary free text alone |
| Read-only value | Text or read-only field with reason | Different from unavailable/disabled; preserve copying when useful |

### Sliders and precision

Specify min/max/step, units, endpoints, current value, default marker if useful, linear versus nonlinear mapping and a non-drag path. Arbitrary percentages can hide meaning: use real units when the product supports them. Keep numeric input and slider synchronized [M1]. A numeric field may have temporarily invalid text while editing; don't convert an empty string to zero or silently replace typed out-of-range values. Retain the last valid preview, explain the range, and allow correction before commit.

Live visual preview and durable save are distinct. State which changes take effect during manipulation and which require confirmation. Provide an immediate perceivable preview for Material sliders [M1]; if a consequential transaction cannot be previewed safely, choose another input model. Throttle costly previews without dropping the final value; handle old async responses so they cannot overwrite a newer choice. These are implementation concerns to verify, not proof supplied by a mockup.

If OFF or another value makes an adjustment ineffective, explain it at the point of use. Decide whether to disable editing or allow preconfiguration; retain prior values unless explicitly reset. Never silently turn on an effect just to make the slider appear functional. For range sliders, specify crossing/ordering and distinguish thumbs for assistive users.

### Forms and validation

Use persistent labels, required/optional meaning, concise help and units. Placeholder is an example, not the only label [A3, M2, W3]. Specify autocomplete, input purpose, secure entry and the suitable keyboard. A numeric keyboard is not validation. Do not reject unfinished IME composition or every intermediate email string. Choose validation timing by task and cost; show repairable inline errors, preserve safe input and focus the first invalid control or an error summary on submit [W4]. Avoid color-only errors.

Provide states: empty, populated, focused, composing, invalid, validating, dirty, saving, saved, failed, offline, read-only and dependency-disabled as relevant. Keep errors related to the field and accessible; avoid announcing every slider tick as an assertive alert. Scope the claim when some states are not implemented.

## Persistence, leaving and recovery

| Model | Feedback | Back/close | Failure |
| --- | --- | --- | --- |
| Immediate setting | Effect + saved/pending status | Preserve committed choice | Explicit rollback or retry; do not show saved before success |
| Preview + Apply | “Preview / unsaved” distinct from applied | Retain draft or offer continue/discard | Keep draft and last committed value separately |
| Remote multi-field form | Dirty, saving, success with version if needed | Protect unsaved edits | Handle offline/conflict without overwriting input |

Draft protection should cover in-app navigation, modal dismissal and OS/browser back. Browser unload prompts are not guaranteed; a draft recovery strategy may be needed. Reset is scoped (“this section” vs “all preferences”), reversible when practical, and separate from account deletion. Show the exact undo boundary. Test off→on, detail→back, saved→edited→failed→retry and reset→undo, not just the pristine screenshot.

## Handoff template

| ID | Label / control / reason | Value, range, unit | Preview / commit / persistence | Dependencies | Error / undo / leave | Platform differences | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| … | … | … | … | … | … | … | observed / declared / unverified |

Include a normal and failure-state visual. For each proposed fix name the loss prevented and tradeoff. Keep attractive composition and behavioral correctness as separate review axes.
