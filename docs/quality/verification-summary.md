# Local verification — 2026-10-10

Node.js v22.22.3で次を実行しました。

| 検証 | 結果 | 証拠と限界 |
|---|---|---|
| Node test suite | 44 / 44 passed | evidence/verification.json。欠落成果物、証拠混同、制約違反、参照、履歴、CLI記録を検査 |
| Skill書式 | 6 Skills passed | quick_validate.py、tools/check-skills.mjs。実際のホスト動作とは別 |
| 3難易度の機械fixture | 3 / 3 passed | evidence/benchmark.json。Precision/Recallは既知の機械的変更に限る |
| 4成果物サンプル | ready-for-human-review | 実在・型・参照・ハッシュ・宣言値を検査。人間の採否はpending |
| AOF | organization / ledger / situation exit 0 | evidence/providers.json。構造・記録の確認のみ |
| QIF | 公式CLI package validation passed | evidence/providers.json。Stable gateはPending |
| ArchModel / ArchMap | 解析・検証・SVG描画成功 | evidence/architecture.json。モデルのverificationは未実証の意味的主張を避けunknownを維持 |
| npm配布形態 | tarballの別フォルダ導入と同梱CLI実行成功 | evidence/package-smoke.json。公開していない |
| 依存 | インストール時audit: 0 vulnerabilities | Ajv 8.20.0、jsdomは開発用。将来の安全性の保証ではない |

SVGモックアップと設計図のプレビューを目視確認。モックアップの画像内リンク相当要素をモデルに追加し、画像とデータの対応を補正しました。これは作成者による自己確認で、独立したUXレビューではありません。

重大な問題として、判断記録後に古い提案書を有効扱いする挙動を修正しました。現在は提案書を更新待ちに戻し、整合性確認後の再検証を要求します。

残る実証はrelease-status.mdを参照。AI生成能力・ユーザー効果・正式ホスト互換性の数値は未評価です。フレームワークの全要件を実現済みとは主張しません。
