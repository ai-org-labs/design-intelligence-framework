# 他プロダクトでの試用 / Product pilot

DIFの開発版を、既存プロダクトの1つの画面・フローで試します。最初はMVP対象の登録・ログイン・復旧フローが適しています。別の領域を試す場合は、対応範囲外の探索試用として記録します。

## 始め方

DIFを対象プロダクトとは別のフォルダへcloneします。対象プロダクトで使っているAI環境に `skills/dif-design/SKILL.md` を読ませ、必要なreferencesも参照できる状態にします。初回はCLIを使わず、テキスト提案・レビュー・改善が成立するかも確認します。DIF自身の `.aof/`、`AGENTS.md`、品質ゲートを対象プロダクトへ上書きコピーする必要はありません。

最初の依頼例（角括弧を実際の条件に置き換える）:

```text
DIFの skills/dif-design/SKILL.md を使って、[プロダクト]の
[登録・ログイン・復旧フロー]を改善してください。

対象ユーザー: [誰が使うか]
目的: [困っていること・実現したいこと]
既存画面/コード: [対象への参照]
変更できない条件: [認証方式・ブランド・期限など]

まず既存実装を読み、事実と仮説を分けてください。
保守的な改善案と、導線を再構成する案を比較してください。
比較後に有力な複数案のフロー、モックアップ、設計データを作り、
レビュー・改善前後の差分まで示してください。
プロダクトのコード変更や採用判断はまだ行わず、提案として保存してください。
画像・ツールが使えない場合は未生成/未検証を明示してください。
```

成果物は対象プロダクト側の作業フォルダに保存します。顧客情報、実際の認証情報、非公開コード、未公開画面をDIFリポジトリへ移送しないでください。共有する場合は人間が確認した匿名化サマリーを使います。

## 人間が見たいこと

- **差異:** 色違いだけでなく、比較する価値のある操作・構成の違いがあるか。
- **要求適合:** 制約を守り、重要な不明点を勝手に事実にしていないか。
- **実用性:** 採用したい案や部分があるか。ない場合は、何が足りないか。
- **指摘の正確さ:** 見逃し、誤指摘、重大度の違和感を具体的な画面と結び付けられるか。
- **改善:** レビューを受けた修正が実際に問題を減らしたか。
- **導入負担:** 指示し直した内容や手作業を記録し、普段の方法と比較する。計測していない時間・費用は推定と表示する。

AIの自己採点と、試した本人の判断を分けます。人間が気に入ったことと、実ユーザーで効果が出たことも別です。1プロダクトで使えたことを全環境対応やStable認定にしません。

## 記録テンプレート

対象プロダクトの非公開作業フォルダで記入してください。

```yaml
pilot_id: null
product: null
scope: null
in_mvp_scope: null
dif_commit: null
host_and_version: null
model: null
skill_version: 0.1.0-dev.0
cli_used: false
image_tool_available: null
request_ref: null
artifact_refs: []
human_review:
  reviewer: null
  worthwhile_differences: null
  constraint_violations: []
  missed_issues: []
  false_positives: []
  useful_parts: []
  rejected_parts_and_reasons: []
  extra_instructions_needed: []
  adoption: pending
measured_outcomes: null
uncertainties: []
next_improvement: null
```

観測結果からDIFのSkill・モデル・ルールを直す場合は、具体的な失敗例と修正理由を残します。採用判断、プロダクト実装への適用、Stable公開はそれぞれ別の判断です。

## English summary

Start with one registration/login/recovery flow in an existing product. Read the standalone `dif-design` skill and its references; keep output in that product's workspace. Compare conservative and radical proposals before changing product code. Record the exact DIF commit, host/model, tool availability, artifacts, human feedback, missed issues and false positives. Keep adoption pending until the human decides. Share only reviewed, anonymized findings with DIF. A successful pilot is not proof of universal compatibility or stable readiness.
