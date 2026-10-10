# DIF — Design Intelligence Framework

A Skills-first framework for comparing design proposals with explicit constraints, evidence and uncertainty. Humans make adoption decisions. [日本語](README.md)

Visual proposals: the standalone `dif-art-direct` skill translates brand meaning into composition, typography and shape, renders comparable directions, and refines a provisional favorite. See the [original three-direction tea-brand study](examples/visual-directions/proposal.md), [local HTML preview](examples/visual-directions/preview.html), and [manual craft trials](benchmarks/visual-craft/README.md). The authored demonstration is not independent proof of aesthetic quality; cross-domain use remains exploratory.

Detailed UI: standalone `dif-controls` covers settings grouping, forms, precision sliders, dependencies, preview/save semantics and recovery. It includes an [official-source register](skills/dif-controls/references/sources.md), [platform distinctions](skills/dif-controls/references/platform-guidance.md) and a [working Web settings study](examples/settings-detail/proposal.md). Native OS behavior and assistive technology require separate verification; CSS px, pt and dp are not interchangeable.

**0.1.0-dev.0, public development preview, Apache-2.0. No stable release yet.** The first vertical slice covers registration/login UX/UI, not authentication infrastructure.

For a real product trial, use the [pilot guide and feedback template](docs/pilot.md). Start with one flow and record human feedback before applying changes.

Copy the entire `skills/dif-design/` folder into an Agent Skills-compatible host. It contains its own schema, knowledge and output contract. Text proposals, review and improvement do not require the CLI, a renderer, external service or subagent. Other specialist skills are optional and independently usable. If no image can be produced, return a specification and mark the package incomplete. Host compatibility is a test target, not a verified support claim.

```sh
npm ci
node bin/dif.mjs validate examples/login/design.json --gate enforce
node bin/dif.mjs report examples/login/design.json
node bin/dif.mjs diff examples/login/before.json examples/login/design.json
npm run verify
npm run benchmark
```

Node 22+. The npm package is prepared but unpublished. Warn is the default validation mode: errors appear as `valid:false` with exit 0. Enforce exits 1 on validation errors; malformed input/usage/I/O exits 2. `ready-for-human-review` is structural readiness, never human approval or semantic proof.

`dif init FILE.json` creates an Explore draft without overwriting. `dif decide MODEL.json RECORD.json OUTPUT.json` records an attributable human-supplied decision, leaves the source unchanged and invalidates the old proposal pending regeneration. Identity authentication is out of scope. See [record contract](docs/decision-record.md).

Browse the [proposal](examples/login/proposal.md), [mockup](examples/login/mockup.svg), [flow](examples/login/flow.svg), [model](examples/login/design.json), [architecture source](docs/architecture/dif.archmodel.yaml) and [design map](docs/architecture/design-map.svg).

AOF manages work/evidence records. QIF records explicit loss boundaries and a Pending stable gate. The official ArchModel parser validates the architecture source; the official ArchMap renderer generates its Mermaid/SVG projection. These providers are optional development dependencies, not required Skill runtimes. See [reproduction](docs/architecture/README.md) and [pins](docs/architecture/providers.json).

Mechanical checks cover shape, typed references, declared constraints and colors, evidence categories, file integrity and decision records. Tests do not prove real usability, authentication security, WCAG conformance, approval authenticity or independent Skill effectiveness. Three benchmark prompts/rubrics and authored negative fixtures are included; AI ability metrics remain unevaluated. Stable publication awaits independent trials, host compatibility, a real design pilot and accountable human review.

[Adaptive finish guide](skills/dif-ux-ui/references/adaptive-finish.md): window width/height, density, orientation, text growth, semantic color, material details and reduced motion. The [settings study](examples/settings-detail/proposal.md) records browser observations separately from unverified native and human outcomes.

[Implementation fit](skills/dif-design/references/implementation-fit.md) connects typography, plugins, frameworks and architecture to product constraints. The [authored settings decision example](examples/settings-detail/implementation-fit.md) separates current code from proposed production boundaries.
