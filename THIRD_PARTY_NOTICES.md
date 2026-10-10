# Third-party sources

DIF is licensed under Apache-2.0. Referenced framework implementations remain external tools, not bundled runtime code:

- AI Organization Framework: https://github.com/ai-org-labs/ai-organization-framework — generated managed-project bootstrap under `.aof/`; pinned source recorded in docs/architecture/providers.json.
- Quality Intent Framework: https://github.com/ai-org-labs/quality-intent-framework — canonical quality-gate vocabulary/schema and official validation tools used to author/check the DIF-specific package.
- ArchModel: https://github.com/ai-org-labs/archmodel — canonical architecture vocabulary and parser/renderer; generated projections retained in docs/architecture.
- ArchMap Mermaid: https://github.com/ai-org-labs/archmap-mermaid — external Mermaid parser/renderer used for generated SVGs.

npm dependencies retain their own licenses in installed packages. Ajv is a runtime dependency. jsdom is a development-only DOM environment for optional architecture generation. The lockfile pins the dependency graph. No fonts, stock images, icon packs or remote media are embedded in the handwritten login mockup.

The requirements document is user-supplied project material. Its inclusion is not a claim of third-party ownership transfer. WCAG and Agent Skills references are cited links with scoped summaries, not redistributed specifications.
