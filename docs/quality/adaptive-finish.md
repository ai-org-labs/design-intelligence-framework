# 画面適応・配色・動き・質感 — 2026-10-11

ユーザーの追加要求を受け、5つの既存Skillに提案・レビュー上の責務を追加。dif-ux-uiに詳細ガイド、共通知識と同梱コピーに参照と境界、詳細UIの手動評価課題に適応シナリオを追加した。CLI/Finalizeスキーマは拡張していない。

| 根拠 | 実際に確認したこと | 証明しないこと |
| --- | --- | --- |
| examples/settings-detail/adaptive-checks.json | 境界前後と短い窓、入力/フォーカス/dialogを保つ縦横相当リサイズ、200%ルート文字と保存、DPR別物理画像幅、明暗の特定文字組、動き軽減時の操作 | 実機回転、native再生成、400%ズーム、支援技術、色域、全面WCAG適合、動作性能 |
| examples/settings-detail/checks.json | 既存の精密入力・エラー・保存失敗・再試行・戻る・取消を更新CSSで再確認 | サーバー保存、実ユーザーの成功率 |
| renders/dark-390.png, text-200-390.png, landscape-844.png | 作者が画像を確認。暗い表面、折返し、横向きの配置を目視 | 独立レビュー、美的評価の向上 |
| skills/dif-ux-ui/references/adaptive-finish.md | 公式情報の限定的な参照と、DIFによる設計方法の整理 | OSガイドラインの網羅、全Skill利用場面での実証 |
| evidence/verification.json, evidence/benchmark.json | 通常の機械検証 | デザイン能力・センス・人間による採用 |

配色検査の最初の実行ではテーマ切替の遷移中の色を最終色として測定して失敗した。アニメーション完了を待って最終状態の指定ペアを確認するよう修正。遷移中の全フレームのコントラストを測定したという主張はしない。読み見本もrem単位に変更し、ルート文字拡大に追従させて再確認した。

出典はW3C Understanding、Android Developers、MDNの本文およびApple HIGの公式検索本文。アクセス日は2026-10-11、Living guidanceは固定規格版ではない。W3C Understandingは説明資料として扱い、規範の条件・例外を省略しない。具体的な120ms、角丸、ブレークポイントは試作固有の選択である。

QIFの損失境界：幅と密度、回転とリサイズ、規範と参考、宣言と観測、文字ストレスとOS拡大、機械通過と人間の評価を混同しない。forced-colors用CSSは存在するが、その検証結果はunknown。Human adoption / Stableはpendingのまま。

AOF作業記録と品質台帳にこの根拠を追加。ArchModelのcontrols責務を更新し、固定版の任意ツールで投影を再生成。controls-trials等の独立試行結果はunknownのまま。
