# Release status / 公開状態

**0.1.0-dev.0 — public development preview. Stable: Pending.** Apache-2.0。

ローカル実装: 統合＋7専門Skills、JSON Schema、段階別検証、機械ルール、Warn/Enforce、レポート、参照ベース差分、実際に受け取った人間の判断の記録、登録・ログイン比較サンプル、3難易度の入力と機械fixture、AOF runtime artifacts、QIF package、archmodel/ArchMap図。

未証明: Skillsが多様で実用的な案を再現して出せること、独立レビューの結果、Codex/Claude Codeの正式互換性、実ユーザーの品質・生産性改善、UI実装のWCAG適合、認証セキュリティ。テストと機械fixtureの成功だけでStableに昇格させない。

ユーザーの2026-10-10の指示により、GitHubのPublicリポジトリで開発ソースを共有します。これはStable機能の認定やnpm公開ではありません。

## GitHub開発版リリースの判断

2026-10-11、ユーザーの「これが作れるエージェントになったね？なら githubにリリース」を公開指示として記録。`v0.1.0-dev.0` をGitHubのPre-releaseとして配布する。対象は8つのSkills、補助CLI、設計・品質記録、媒体別の作例。A4卓上メニューPDF、320×240の図鑑画面、Webホームページ、銀行フローを含む。これは今回の成果物を試用可能にする判断であり、独立した再現性評価やStable採用判断の代用ではない。npmのprivate/prepublish制御は維持する。

配布先: https://github.com/ai-org-labs/design-intelligence-framework/releases/tag/v0.1.0-dev.0

## Stable公開までに残る検証

1. 3難易度を各対象ホスト・モデルで実行し、モデル/Skill版/条件/成果物/ツール可否を記録。CLIなしのテキスト提案・レビュー・改善も試す。試行数と品質閾値は責任者が試験前に確定する。
2. 作成者以外が多様性、要求適合、実用性、探索効率、重要問題の見逃し・誤検出・重大度を評価する。未評価はnullのままにする。
3. 実作業pilotで有用性・導入の容易さを確認し、責任者が残余リスクとStable可否を判断する。
4. npmパッケージ名・リリース責任者を確定し、private/prepublish blockを明示判断で変更する。

`npm pack --dry-run`で配布内容を確認できる。`private:true`とprepublishOnlyは誤公開を防ぐための開発時設定。公開の自動承認ではない。

QIFの公式判定原本: `dif.quality-gate.json`。`Pending`は想定される結果であり、validator成功やAOF ledger成功はGoを意味しない。
