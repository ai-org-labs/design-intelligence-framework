# Visual proposal trials (manual, separate from mechanical fixtures)

Use `skills/dif-art-direct/` alone with each prompt, plus only the supplied user artifacts. A renderer is optional; unavailable images must be reported, not scored as success. Do not provide the exemplar or intended aesthetic to the trial agent. This suite is not run by `npm run benchmark`, which remains a schema/validator fixture suite.

| Case | User request | What discriminates useful behavior |
| --- | --- | --- |
| V1 / meaning to expression | 架空のお茶ブランド「間」。忙しい成人がひと息つくためのお茶。煎茶・ほうじ茶・和紅茶の同じ内容を使い、Webのトップ画面を3方向で提案して。 | Product meaning visibly changes composition/type/product treatment; actual comparable screens, not only adjectives |
| V2 / intentional variation | 文字の大小や書体の違いが魅力のイベントサイトを改善したい。統一すべき？ 添付画面を基に2案を。 | Preserves purposeful expressive contrast; examines hierarchy rather than blindly normalizing fonts. Supply a licensed actual screen before trial. |
| V3 / reference transfer | このブランドサイトの良さを、毎日使う家計入力画面へ応用して。見た目のコピーはしないで。 | Explains applicable mechanism and limits; protects entry efficiency, uses actual supplied reference. Supply reference before trial. |
| V4 / no renderer | 画像ツールなしで、地方の小さな図書館のサイト案を比較して。派手な演出は避けたい。 | Concrete composition/type/image specifications; clear image-unavailable status; no tool dependency or invented screenshots |

Rate each axis independently with **missing / weak / useful / strong**, alongside an artifact pointer and a short reason. Leave unevaluated axes null; do not total scores.

- **Semantic fit:** relationship between product meaning, intended feeling and visible decisions.
- **Visual distinction:** differences beyond recolor; equivalent content/task remains comparable.
- **Craft:** composition, type, spacing, image/shape treatment and responsive adaptations.
- **Practicality:** task clarity, states, access and implementation tradeoffs.
- **Critique and refinement:** visible revision follows a concrete weakness in the first artifact.
- **Evidence honesty:** reference provenance, rendering limits, authorship, preference and adoption kept separate.
- **Presentation:** actual screens inline, concise recommendation and comparison, detailed evidence available.

Hard failures: invented visual observations, copied private assets without authorization, fabricated user approval/measurement, calling a missing image complete, or violating a supplied non-negotiable constraint without disclosure.

Trial record: prompt/version, Skill commit, host/model, supplied sources, tools, budget, output artifact hashes, creator critique, separate human feedback, failures and remaining uncertainty. Do not count the authored example as a blind or independent pass. Cross-domain capability remains exploratory; the full proposal contract is unchanged.

Status 2026-10-11: V1 has an authored demonstration at `examples/visual-directions/`; no blind trials or human aesthetic assessment have been completed. V2–V4 are unrun. No accuracy, preference or quality scores are claimed.
