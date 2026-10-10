# Architecture reproduction / 設計図の再現

Source of truth: `dif.archmodel.yaml` (JSON-compatible YAML accepted by ArchModel). Edit this file and regenerate `dif.mmd`, `dif.svg`, `design-map.svg`. The Mermaid projection preserves IDs, names and typed edges; richer design intent remains in the original model.

`providers.json` pins the four user-selected repositories. Obtain those exact revisions, install their lockfile dependencies and build ArchModel/ArchMap using `npm run build:library`. Do not build inside someone else's active checkout. AOF uses Node 22/24; use Node 22 for the combined workflow.

```sh
npm ci
npm run architecture -- /path/to/archmodel /path/to/archmap-mermaid
node tools/provider-check.mjs /path/to/aof /path/to/qif
```

The renderer is browser-oriented. The generation tool supplies jsdom only for local rendering; no browser or jsdom is needed by the distributed DIF CLI. It invokes the real upstream parser/renderers, not a substitute grammar. Every generated diagram is a projection, not proof that the architecture is correct.

AOF was initially initialized from a working copy, then upgraded/rechecked using a clean archive at the pinned 12.2.0 commit. Other project changes were not modified. `providers.json` records this distinction. QIF's CLI needs its own checkout as cwd; `provider-check.mjs` handles that and uses an absolute DIF package path.

Skill data and design proposal data are separate from the framework architecture. `schemas/design.schema.json` describes a proposal; archmodel describes DIF itself. AOF remains the work/evidence record, QIF the quality gate, and SVG/ArchMap the view.

Shared provider evidence replaces machine-specific paths with `$DIF_ROOT`, `$AOF_DIR`, `$QIF_DIR` and `$NODE`. Original logs stay in ignored `evidence/local/`. This changes path presentation only, not command outcomes.
