# Proposal output contract / 提案成果物契約

Default: one folder containing `proposal.md`, `flow.mmd`, `mockup.svg` (or PNG/JPEG), `design.json`. Multiple images/diagrams may be registered. Other folder layouts are allowed if IDs and relative references retain the same meaning. A single text response may embed Markdown/Mermaid/JSON for standalone work, but absent image/file checks must stay unverified.

Explore permits empty structured collections and unverified hypotheses. Select requires multiple candidates, axes, sourced requirements, differences and constraint checks. Visualize adds flows/screens for shortlisted candidates. Finalize requires two viable alternatives, four artifact kinds, per-candidate three-axis evaluations, rule and expert reviews, and explicit risks. `ready-for-human-review` means only structural readiness, not semantic completion or adoption.

Register artifacts with stable IDs, kind, status, relative path, SHA-256 digest, candidate/entity IDs and limitations. Model self-digest is null. If hashes cannot be computed, say integrity unverified. Do not invent hashes. Generated mockup must be an actual image; Markdown fallback is unavailable. Never hide a failed/unperformed evaluation.

A complete proposal requires (1) all deliverables, (2) semantic consistency across requirements/flows/images/decisions/model, (3) applicable evaluation and explicit unknowns, (4) meaningful alternatives and tradeoffs. Mechanical checks can support these, but human semantic review is still required. Adoption is a separate event, with actor/source/timestamp. An AI cannot self-approve.

JSON entities: requirements, assumptions, constraints, candidates, flows, screens, components, evidence, evaluations, decisions, approvals, changes, artifacts. All IDs globally unique; typed references must resolve. `evidence.kind` separates fact, standard, measurement, expert-inference, hypothesis and human-confirmation. Scores remain null when unknown. Keep future CX/experiment/knowledge entities out of the v0.1 schema until their contracts are designed.
