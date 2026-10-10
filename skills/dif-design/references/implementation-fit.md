# Typography, dependencies and implementation fit

Use when the request includes fonts, plugins, frameworks or the architecture needed to deliver a design. Work from the existing product and its constraints. These are decision aids, not a mandated stack or authority to install, migrate or publish. Offline use remains possible: label current compatibility, maintenance and licensing unknown when source evidence is unavailable.

## Establish what already exists

Inspect available manifests/lockfiles, actual imports, component library, style tokens, routing, rendering mode, state/persistence, target OS/browser versions and build constraints. A listed dependency is not proof it is used. Separate observed implementation, proposed change and verified behavior. Clarify the plugin host from context: design-tool extension, CMS extension, build plugin and runtime UI library have different data access and compatibility boundaries.

## Typography is a system, not a font name

Compare role-based specimens on the same real content: display/title, reading body, form label, helper/error, numeric data and code. Include Japanese kana/kanji/punctuation, Latin, currency, dates, long values and relevant locales. Inspect character distinction, baseline, weight balance, line length, line height, wrapping and optical size at actual use size; don't assume a Latin family covers Japanese. Avoid indiscriminate letter spacing in Japanese and ligatures in identifiers. Use tabular figures when alignment matters and the font supports them; proportional figures may suit prose better.

Record family/fallback sequence, actual available weights, variable axes and ranges, size/line-height/spacing tokens, language coverage and intended platform. Distinguish declared family from the font that actually renders each glyph. Avoid assuming requested weight 750 exists or that synthesized bold matches the intended design. Compare text growth and fallback with the normal state.

For a proposed distributed font, inspect its actual license and permitted embedding/hosting/subsetting; do not infer rights from a download button or a repository's software license. Record source/version and unresolved permissions rather than offer legal certification. Do not bundle OS fonts merely because a local preview uses them.

For Web, decide system versus self-hosted versus remote delivery using brand benefit, fallback metrics, payload and first rendering. Define loading failure behavior and measure cold/warm load before claiming performance. WOFF2, selective preload, subsetting and `font-display` have context-dependent tradeoffs. Dynamic Japanese/user-generated content must not lose glyphs through a fixed-text subset. `swap` can shift layout; `optional` can leave fallback visible. [web.dev font performance](https://web.dev/learn/performance/optimize-web-fonts) supplies the implementation reference. Native system text styles and scaling require target-platform tests, not CSS emulation.

## Choose dependencies by the missing capability

Compare the current implementation, no added dependency/platform primitive, and plausible library/plugin alternatives. A plugin should earn its operational cost by solving a specific capability gap. Record exact package and version, host/peer compatibility, license, release/maintenance evidence and date, CSS/style ownership, accessibility semantics, localization/IME, SSR/hydration/native limits, payload and runtime behavior. Mark unmeasured costs as estimates or unknown.

For an extension that processes design files or user content, inspect what leaves the machine, credentials/permissions, external services and failure behavior. Inspect installation hooks and transitive dependencies proportionally to the change. A vulnerability scan only covers its actual scope and known advisories; it does not establish trust or design quality. [npm's audit documentation](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities/) explicitly distinguishes covered dependency classes and excludes peer dependencies from audit checks. Do not run automatic breaking fixes merely to clear a report.

Test one representative difficult interaction before adopting a component package: for example Japanese composition, keyboard focus through a portal/dialog, invalid numeric draft, theme override or a failed async save. Inspect the styled component, not just the library's accessibility claim. Keep vendor-specific APIs behind a boundary when replacement risk justifies it; do not add a wrapper layer without a concrete reason. Record uninstall/replacement and data export/migration consequences.

## Framework and architecture serve the product

Separate application framework, CSS utility system, styled component kit, headless interaction primitives, design tokens and native/cross-platform UI. They solve different problems and cannot be ranked on one popularity axis. Compare candidates against actual requirements: content/SEO and rendering, offline/device integration, interaction/state complexity, accessibility, platform fidelity, team competence and migration cost. Keeping the existing stack is a legitimate recommendation. For native targets, compare target-platform and shared implementations only where the product permits them; do not promise identical OS behavior from shared code.

Model responsibilities and data flow: design tokens → semantic components → feature screens; user event → draft/validation → persistence boundary → committed state; external systems and trust boundaries where applicable. Make ownership explicit for each state and avoid redundant derived values that can drift. [React state structure](https://react.dev/learn/choosing-the-state-structure) illustrates these principles for React; it is not a requirement to use React. Preserve the raw invalid draft separately when preview and committed values have different meanings.

Describe pending/error/retry/cancellation, stale responses, navigation, offline recovery and migration only as far as relevant. Choose simple local boundaries for a small prototype; distributed architecture requires a concrete need. Distinguish information architecture (navigation/content) from software architecture (responsibilities/contracts/dependencies).

For architecture work, retain stable IDs and decisions in the project's canonical ArchModel: context, alternatives, reason, tradeoffs, affected elements and evidence. Generate ArchMap from that source with the project's pinned optional tools. A proposed target architecture is not an as-built diagram; preserve unknown verification. Without these tools, supply a proposed specification and identify the ungenerated projection; do not make Skills depend on installing providers.

## Return a reviewable decision

Use a compact table: requirement → candidate/current choice → reason → cost/risk → evidence → remaining check. Include a specimen or detail crop for typography, a capability spike for a dependency when needed, and a responsibility/data-flow view for architecture. Each named recommendation must have a reason tied to this product. Cite exact official sources/version/date for current compatibility claims. Separate a documented design choice, a working prototype and production validation; final human adoption stays pending.

Source access: 2026-10-11, direct official page text for the three linked references. Remaining advice is DIF synthesis, not a claim that those sources mandate the entire method.
