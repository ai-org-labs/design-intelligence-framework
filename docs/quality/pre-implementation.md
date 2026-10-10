# DIFの品質意図と開発判断

Need: デザイン案の不足、根拠の不透明さ、検証できない品質判断を減らす。
Intent: 人間が複数案を比較し、未検証事項を理解して採否を判断できるようにする。
Context: ユーザー指定の要件v0.3に基づく新規ローカル開発。MVPは会員登録・ログインの設計提案。認証サービス実装・実験配信は対象外。

## 防ぐ損失

| Quality Intent | Risk / Loss boundary | Negative acceptance | Evidence |
|---|---|---|---|
| QIN-DELIVERABLE | 画像や根拠がないのに完成と信じて採用する | 画像欠落、テキスト代替、参照切れ、ハッシュ不一致は完成扱いにしない | test/dif.test.mjs、examples/login/ |
| QIN-EVIDENCE | AI推論を実測だと思い込む | 未評価へのスコア、測定証拠なしのempirical判定を拒否 | 同テスト、3難易度の機械fixture |
| QIN-AUTHORITY | 必須制約や人間の選定を飛ばす | hard違反/未知のshortlist、承認なし採用、矛盾するhard条件の両立主張を拒否 | 同テスト、CLIのsynthetic human-record試験 |

## 開発上の判断

AOFのmanaged-projectを実際に初期化し、TASK-001と品質ledgerを使用。QIFはDIF固有のquality-gate packageを公式CLIで検証する。フレームワーク本体をDIFの実行時必須依存にしない。archmodelを設計原本とし、ArchMapの公式parser/rendererで図示する。

BuilderとCheckerは今回同じエージェントによる実装・自己レビュー。自動テストは別の期待条件を検査するが独立した人間/別モデルのレビューではない。Council/人間のStable承認を作成しない。サブエージェントによる独立性は主張しない。

開発用停止条件: 必須のnegative acceptanceとローカル比較サンプルを検証し、失敗を修正。安定公開は独立した提案能力評価、主要ホストでの試験、実作業pilot、責任者の判断が揃うまでPending。

## 証拠の限界

テスト成功は対応する構造的境界の証拠。テスト数、コード量、ファイル数を品質とみなさない。SVGがあることは操作品質の証明ではない。仕様中のキーボード/フォーカス宣言は実機テストではない。サンプルのAIレビュー、QIFの0.3という低confidence値は較正された確率ではない。
