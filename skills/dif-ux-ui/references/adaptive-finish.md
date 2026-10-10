# Adaptive layouts, resolution, motion, color and finish

Use this guide for both proposals and review, scaled to the real device/input scope. It is DIF synthesis with bounded official references, accessed 2026-10-11. Examples of numbers are design choices unless explicitly attributed. Deliver applicable specs and evidence, not a claim to support every possible device.

## Model the environment before choosing a breakpoint

| Dimension | Specify | What to observe |
| --- | --- | --- |
| Available space | Actual viewport/window/container width **and height**, safe areas, split view | Reflow, pane changes, reachable actions, overflow |
| Resolution/density | Logical CSS px/pt/dp versus physical pixels, DPR, vector/raster assets | Asset sharpness and fine strokes at intended scale |
| Orientation | Portrait ↔ landscape during editing, open modal, pending save | Draft/selection/focus preserved, short-height layout, no unintended commit |
| Input | Touch, mouse, keyboard, pen, hover availability | Target spacing, focus, no hover-only essential operation |
| Text | Long content, localization, 200% text stress, zoom, platform text scaling | Wrapping, no clipped label/error, grouping and reading order |
| Preferences | Light/dark, increased contrast/forced colors, reduced motion | Semantic state remains perceivable without color/movement alone |

Responsive means adapting to space; adaptive can change composition, navigation or panes. Don't equate a device name or orientation with available width. Tablet split view can be narrow; landscape phones can be short. Android's [window-size guidance](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes) explicitly bases decisions on the available app window. Keep target-version rules separate from the example's CSS breakpoints.

[devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) relates physical pixels to CSS pixels; it is not a reason to make a high-density phone use a desktop layout. Prefer vectors for appropriate icons/diagrams and provide suitable image resolutions. Do not infer physical-device sharpness, color gamut or native rendering from a DPR emulator.

For Web, [WCAG reflow 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) addresses content without two-dimensional scrolling at specified equivalent viewport dimensions, with exceptions for content requiring two-dimensional layout. A 320 CSS px screenshot alone is not a complete 400% zoom/reflow test. [Orientation 1.3.4](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html) restricts orientation locking unless essential; this is not an instruction to make both layouts identical. Test real rotation separately from resizing a browser window.

## Define transformations, not just screenshots

For each meaningful threshold, state what wraps, reorders, hides, moves to a secondary surface or changes navigation. Preserve the task and order; don't silently remove an action. Check just below/above breakpoints. Avoid arbitrary fixed heights for text-heavy controls. A scrollable detail pane needs a reachable save action, meaningful focus order and a return location. Sticky elements must not cover the focused field, validation message or on-screen keyboard area.

Record a transition scenario: populated portrait → focus a field → rotate/resize → open detail → return. Verify unchanged draft, selection and commit state. Native activity/view recreation, OS keyboard, hinge/cutout, safe areas and process recovery need native evidence; Web viewport changes only cover the Web model.

## Color and material roles

Specify tokens by role: canvas, surface/elevated surface, primary/secondary text, interactive accent, border, focus, selection, error, warning and success. Provide actual foreground/background pairs for each state and theme. Color differences alone must not carry a required distinction; pair them with label/icon/shape. Check text and non-text contrast under their applicable criteria, including exceptions; do not average scores. Opaque sRGB pair calculations don't prove translucent, image-backed, P3, HDR or real-display appearance.

[Apple Color](https://developer.apple.com/design/human-interface-guidelines/color) and [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode) advise adapting to appearance; dark mode is not a blanket inversion. Respect system preferences, and justify any app/content-only override. Distinguish paper/content treatment from the app chrome. System colors and native controls can adapt, but still verify the custom combination.

Material/texture choices must serve meaning: a quiet reading surface, a tactile instrument or a precise editing tool need different treatment. Specify corner/edge vocabulary, border weight, elevation hierarchy, shadow softness/direction, translucency and fallback. Do not add gradients or glass indiscriminately. Keep text stable over textured backgrounds, and provide opaque fallback when transparency is reduced or unsupported. Inspect detail crops at native scale and density; check icon stroke weight, optical alignment, thumb/track proportions and raster softness. Enlarged crops reveal issues but are not the normal viewing experience.

## Motion is a state specification

For each animation record **purpose, trigger, affected property, from/to, duration, easing, interrupt/reverse behavior and reduced-motion alternative**. Prefer a small number of purposeful transitions. Duration depends on distance, content and platform; a value chosen for a demo is not an OS standard. Preserve responsiveness during rapid input and keep final state correct when motion is interrupted.

[Interaction animation 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) is a WCAG AAA criterion with an essential-animation exception; don't report it as AA. [Pause/stop/hide 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) addresses qualifying automatic motion/updates separately. Also assess flashing where relevant. Respect [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) for Web and target-OS settings for native. Reduced motion can use immediate state change; it must not remove status feedback or functionality. Don't rely on animation completion to persist important state.

## Deliverables and evidence

- A compact transformation matrix, key normal/error states and the critical resize/rotation scenario.
- Theme/state palette with contrast scope, component detail view and a motion recipe or playable demo.
- Evidence matrix: observed browser behavior, screenshot inference, device-emulated result and real-device result in separate columns. Unknown remains unknown.
- A recommendation with tradeoffs; link full evidence and show useful images inline. No universal quality score or automatic platform certification.
