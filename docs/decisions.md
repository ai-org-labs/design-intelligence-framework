# 開発判断 / Design decisions

2026-10-10。要件v0.3をbaselineとして保存。DIFはDesign Intelligence Framework。

| 項目 | 判断 | 根拠・状態 |
|---|---|---|
| OSS license | Apache-2.0 | ユーザーが本チャットで明示確定 |
| Distribution | Agent Skills + optional npm CLI | 公開前の開発版。npm名の利用可否は未確認、private=true |
| Skills | 統合＋intake/explore/ux-ui/evaluate/improve | MVPの責務に合わせた暫定分割。単体テキスト実行可能 |
| Model | JSON Schema + semantic validator | CLIはAjvで型、DIFで参照・段階・証拠・成果物を検査 |
| Language/runtime | ESM JavaScript / Node >=22 | ビルドなしでnpm CLIを実行。主要文書は日英 |
| Artifacts | proposal.md / flow.mmd / mockup.svg(or PNG/JPEG) / design.json | path/ID/digestで対応。画像がなければincomplete |
| Architecture | dif.archmodel.yaml → Mermaid + SVG | 原本を一つにし、公式archmodel/ArchMap実装で検査・生成 |
| Design status | ready-for-human-review | 機械判定と人間の意味・採否判断を混同しない |
| Gate | Warn default / Enforce opt-in | 機械エラーのexit codeのみ変更。JSONのvalidは変えない |
| Development fixture threshold | recall=1, precision=1, critical misses=0 | 既知の機械ルールfixtureに限る。AI提案能力の閾値ではない |
| Stable threshold & accountable owner | 未確定 | 独立試験・pilotの結果を踏まえ人間が確定。自動採用しない |
| Supported AI hosts | 正式対応なし | Codex/Claude Codeは検証対象候補。書式確認はホスト互換性の証明ではない |
| License publication | ローカル実装のみ | 2026-10-10追加指示: Public開発ソースをGitHubで共有。npm/Stable公開・デプロイは対象外 |

Exploreは自由度を維持し、Selectから比較・制約を厳格化。Finalizeは成果物・候補ごとの評価と未評価事項を必須化する。共通モデルは独自画面DSLではない。CX Journey、Experiment、KnowledgeItemの本格的型は将来拡張として保持し、未実装の空機能を公開APIにしない。

単一Markdownはテキスト提案には使えるが、CLIの成果物整合性検査はローカルファイル一式を対象とする。高度なmerge/branch運用、任意入力専用parser、OS固有規則、実験結果統計はMVPの実装済み範囲に含めない。
