# Reusable components and controlled customization

Use when a product needs consistency, customization or maintainable UI. Start by inspecting its existing tokens, component inventory and real repeated patterns. Extend established conventions before creating a parallel system. This is DIF design guidance, not a mandatory framework or a promise of a production component library.

## Design the change path

Separate primitive values, semantic roles and component-specific decisions only where each level has a purpose. A brand palette is not the error palette; display scale is not touch-target size. Define which values may vary by brand, theme, platform and density, and their precedence. A user preference such as reduced motion or text scaling must not be erased by a brand override. Avoid copying raw color/spacing/font values into every screen.

Use shared components for repeated meaning and behavior, not merely matching rectangles. A primary action, destructive action and navigation link can look related but have different semantics. Before abstracting, compare actual usages and identify stable invariants. Keep feature-specific data/persistence out of generic presentation components unless the component genuinely owns that behavior. Do not force every exceptional screen into one oversized component.

For each public component record:
- purpose, owner/source, consumers and platform scope;
- supported variants, sizes, slots/content, values/events and controlled/uncontrolled state ownership;
- default, hover/focus/pressed, disabled, pending, empty, invalid and recovery states that apply;
- accessible name, keyboard/IME, focus restoration, text growth and responsive behavior;
- sanctioned customization points and prohibited overrides that break meaning or interaction;
- examples and evidence, distinguishing implemented states from specifications.

Prefer a small set of meaningful variants to boolean combinations that permit contradictory states. Give escape hatches a reason, scope and review/expiry plan; don't silently fork the shared component. Shared visual treatment should preserve contextual hierarchy, not make every screen look identical.

## Make maintenance observable

Provide a catalogue with representative content and states, shared source references and known exceptions. It can be plain HTML or the product's existing component explorer; a new tool is optional. Demonstrate that a token or component change reaches multiple real consumers, while feature state and unrelated themes remain correct. A copied specimen is not evidence of reuse.

Test the losses a change could cause: inaccessible state, lost input/focus, unintended theme leak, changed event contract, text clipping or a broken downstream screen. Visual diffs reveal changes, not whether they are good; human judgment remains separate. Avoid test counts as a quality metric.

For shared APIs/tokens, define version/owner, deprecation alias or migration, consumers affected, rollout and rollback. Keep old/new tokens from diverging silently. Record breaking changes to props, events, defaults and semantics as well as CSS. A small prototype needs a short change note, not an elaborate governance service.

## Deliver

Return a compact component inventory, token/customization matrix, normal/error/theme specimens and one concrete change-propagation example. Identify what is actually shared versus proposed. Store architecture and decisions in the project's canonical ArchModel and regenerate ArchMap when responsibilities/contracts change. No external tooling is mandatory for a text proposal. Reuse, visual consistency and lower maintenance cost require separate evidence; do not infer them from having created a token file.
