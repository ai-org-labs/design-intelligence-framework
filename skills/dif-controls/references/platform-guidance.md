# Platform-specific application

Reviewed 2026-10-11. Sources are living documents, not a frozen OS certification. Recheck for the actual target release/framework. Codes below refer to [sources](sources.md).

| Area | Web | iOS / iPadOS | Android |
| --- | --- | --- | --- |
| Starting point | Semantic HTML controls; APG when implementing custom widgets | System controls and platform navigation; test custom treatments on target OS | Material/Compose or the project's supported Views components; do not interchange APIs |
| Settings | Responsive grouping, headings/fieldset/legend, stable URL/back behavior | Task-local options near their task; general preferences separate [A1] | Categories and related detail screens [D2]; current values help scanning |
| Input | Persistent associated label, descriptions/errors, keyboard/focus, browser autofill | Appropriate keyboard, logical tab order, secure fields where relevant [A3] | Material filled/outlined fields, labels and supporting/error states [M2] |
| Targets | WCAG 2.2 SC 2.5.8 AA: 24×24 CSS px **or applicable exceptions**, including spacing [W1] | General button guidance: 44×44 pt hit region [A4] | Compose/Material guidance: minimum 48dp interaction area [D1] |
| Slider | Native range preferred when adequate; custom APG semantics and keys [W5] | Exact input/stepper can supplement slider; system audio volume has a specific platform control [A2] | Standard/centered/range as appropriate; synchronized numeric value; immediate effect [M1] |
| Verification | Keyboard, pointer alternative, zoom/reflow, screen reader, browser differences | Dynamic Type, VoiceOver, safe areas, keyboard obstruction, modal/back gesture, iPad layouts | Font scaling, TalkBack, IME, system back, insets, rotation/foldables where supported |

The last row is a DIF runtime-review plan, not a claim that every behavior was verified in the cited pages. A responsive HTML sample is **Web evidence only**, even when it illustrates a native layout idea.

## Do not flatten guidelines into one number

CSS px, pt and dp are different logical units. Physical pixels and screenshots do not directly establish target sizes. Web's AA minimum is not a recommendation to make every control 24px: comfort, spacing and task still matter. Apple 44pt and Android 48dp are platform guidance; they are not WCAG criteria or automatic store-review outcomes. Smaller drawn icons may have larger hit areas; hit-area expansion can overlap neighboring controls [D1].

WCAG 2.5.8 exceptions include sufficient spacing, equivalent controls, inline targets, unmodified user-agent controls and essential presentation. Review the exact criterion before classifying a violation [W1]. Dragging needs a single-pointer alternative under 2.5.7, subject to its exceptions; keyboard support alone does not satisfy that separate criterion [W2].

## Preserve expected behavior

Material switches are immediate standalone binary choices; use checkboxes for multiple draft choices needing save and radios for a single selection [M3]. Do not simply restyle one Web switch and label it native across platforms.

For a Web custom slider, plan arrows, Home/End, accessible label and value/range, plus understandable units. Touch assistive technology must be tested; APG explicitly cautions about slider support [W5]. Platform conventions for RTL or specialized scales may differ; verify rather than applying a global direction override.

Settings that follow system-wide preferences should say so. Do not duplicate global accessibility settings as if they change the OS [A1]. App-level overrides, if justified, need clear scope and a return-to-system option. Distinguish a denied OS permission from an app's stored preference; a mock toggle must not claim to grant permission.

## Guideline disagreements and versions

Record platform, library/component version, source date and exact observation. HIG and Material can prescribe different presentation. The framework should present the applicable alternatives, not average their values. WCAG conformance requires the applicable full scope, while APG and Understanding documents are explanatory guidance. No screenshot, test count or reference citation alone grants conformance.
