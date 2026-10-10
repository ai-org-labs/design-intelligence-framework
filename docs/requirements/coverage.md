# 要件追跡 / Requirements coverage

原本: design-agent-requirements-v0.3.md。次の実装対応は作成者による追跡表で、外部の適合認証ではありません。

| Baseline | MVPの対応 | 主な検証・未実装 |
|---|---|---|
| §§1–2 proposal-first / 4成果物 | skills/dif-design、examples/login、artifact検証 | ファイル存在・ハッシュ。意味的品質は人間確認待ち |
| §3 発散→選定→描画→確定 | 6 Skills、stage enum、候補・仮説・比較軸 | 候補数はbudget内で適応。実際の生成能力は未評価 |
| §3.4 改善 | before.json→design.json、change、diff、dif-improve | 既知ラベル/色問題の前後検証。一般改善効果は未実測 |
| §4 制約・知識 | typed constraints、conflictsWith、knowledge/principles.json | 明示された衝突と適合宣言のみ。自然言語矛盾の自動判定はSkill判断 |
| §5 評価 | rule/expert/empirical、3独立軸、階層項目 | rule:宣言コントラスト/操作名/操作可否。A/B計画はSkill。統計エンジンは将来 |
| §6 人間判断 | mode、approval、decision、CLI decide | 人間発言の記録。本人認証・自動承認なし |
| §7 モデル・整合性 | schemas/design.schema.json、型付きID、親候補・変更履歴 | mergeは由来の構造チェックまで。高度な統合UIは将来 |
| §8 Skills単独・npm | 自己完結Skill契約、ESM CLI、pack | npm公開未実施。OS/AI環境の正式互換性試験未完了 |
| §8.5 コスト | 候補上限、ツール上限、exhausted | ホストの実行予算を強制する機能ではない。実測がなければnull |
| §9 ベンチマーク | 3難易度・ルーブリック・機械fixture・Warn/Enforce | 機械検出のみ計測。AI生成品質・重大度分類は未評価 |
| §10 MVP縦断 | 登録/ログイン比較、SVG、Mermaid、JSON、レビュー・改善・判断記録 | 人間の採用はpending。synthetic入力で記録機能のみテスト |
| §11 将来要求 | ロードマップに保持 | CX深堀、OS固有、専用parser、実験統計、組織知識、高度分岐、MCP/SDK等 |
| §12 未決定事項 | docs/decisions.md | Stable責任者・AI試行数/閾値・正式環境は未決定 |
| §13 品質ゲート | .aof、QIF package、negative tests、公開ブロック | independent reviewとpilot不足のためStable未達 |

将来要求は放棄していません。MVPに約束した範囲と、実装・実証・公開の状態を分けます。
