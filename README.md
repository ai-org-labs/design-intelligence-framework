# DIF — Design Intelligence Framework

根拠・制約・未検証事項を保ちながら、複数のデザイン案を比較するための **Skills中心の設計提案フレームワーク**。採用は人間が判断します。

**開発版 0.1.0-dev.0 / Apache-2.0。Public開発リポジトリ、Stable公開前。** 現在の縦断サンプルは会員登録・ログインUX/UI。認証基盤を実装する製品ではありません。[English](README.en.md)

## すぐ見る

- [比較提案](examples/login/proposal.md) / [モックアップ](examples/login/mockup.svg) / [フロー図](examples/login/flow.svg) / [設計データ](examples/login/design.json)
- [ArchModel原本](docs/architecture/dif.archmodel.yaml) / [設計マップ](docs/architecture/design-map.svg) / [ArchMap図](docs/architecture/dif.svg)
- [要件原本](docs/requirements/design-agent-requirements-v0.3.md) / [要件対応](docs/requirements/coverage.md) / [設計判断](docs/decisions.md)
- [品質ゲートと公開状態](docs/quality/release-status.md)

## 他プロダクトで試す

[試用手順と記録テンプレート](docs/pilot.md)を使い、まず既存プロダクトの1フローで提案の差異・要求適合・実用性を確認します。プロダクトのコードを変える前に、提案と人間の評価を記録します。

## Skills単体で使う

`skills/dif-design/` を、Agent Skills対応環境のSkillディレクトリへフォルダごとコピーします。`references/`も同梱してください。統合Skillだけでテキスト提案・レビュー・改善ができます。必要に応じて他の専門Skillもコピーできます。

> dif-designを使って、会員登録とログインを複数案で提案してください。対象者・認証方式が未定の部分は仮説を分け、比較理由と未評価項目を示してください。

| Skill | 責務 |
|---|---|
| dif-design | Explore → Select → Visualize → Finalizeの統合 |
| dif-intake | 要求・制約・矛盾・仮説 |
| dif-explore | 意味のある差異を持つ候補と比較 |
| dif-ux-ui | フロー・画面・状態・モックアップ |
| dif-art-direct | ブランドの意味から構図・文字・形を導き、複数の画面案を比較・推敲 |
| dif-controls | 設定・フォーム・スライダー等の構成、状態と保存、Web/iOS/Android別の判断 |
| dif-evaluate | 規則・専門判断・実測を区別したレビュー |
| dif-improve | 改善版・前後差分・由来の保持 |

CLI、画像生成サービス、サブエージェントは必須ではありません。画像が生成できなければ代替仕様を返しますが、提案パッケージは未完成です。Agent Skillsの書式を確認しており、Codex/Claude Code等での正式互換性はまだ実証していません。

### 見た目の方向性を提案する

`dif-art-direct` は「ブランドの意味 → 構図・文字・形 → 実際の画面案 → 批評と修正」を扱います。[架空のお茶ブランドの3方向比較](examples/visual-directions/proposal.md)と[操作できるHTML](examples/visual-directions/preview.html)を同梱しています。HTMLはローカルで開けます。PC・狭幅の画像、参照元、改善前後、未検証事項を確認できます。これは作者による実例で、独立評価や全業種への品質保証ではありません。[視覚提案の評価課題](benchmarks/visual-craft/README.md)は機械fixtureとは別に扱います。

### 詳細な設定・フォームを設計する

`dif-controls` は部品の選択、精密入力、依存関係、プレビューと保存、失敗・取消・戻るを扱います。[公式ガイドラインの参照表](skills/dif-controls/references/sources.md)と[Web/iOS/Androidの適用差](skills/dif-controls/references/platform-guidance.md)を同梱しています。[読書環境の設定例](examples/settings-detail/proposal.md)には操作できるWeb試作とエラー状態の画像があります。ネイティブOS・支援技術の検証は別に必要です。認証以外の利用は探索的拡張で、Finalize契約の範囲を自動的に広げません。

## 補助CLI

Node.js 22以上。npm配布可能な構成ですが、まだ公開していません。

```sh
npm ci
node bin/dif.mjs init my-design.json
node bin/dif.mjs validate examples/login/design.json --gate enforce
node bin/dif.mjs report examples/login/design.json
node bin/dif.mjs diff examples/login/before.json examples/login/design.json
npm run verify
npm run benchmark
```

`validate`は既定でWarn。違反があっても終了値0で、JSONには`valid:false`と問題を返します。`--gate enforce`は違反で1、入力/使用方法/IOエラーは2です。`ready-for-human-review`は構造上の準備完了を意味し、有用性や採用承認の証明ではありません。

`dif decide MODEL.json RECORD.json OUTPUT.json` は実際に受け取った人間の判断を記録します。[記録形式](docs/decision-record.md)を参照。元データを上書きせず、更新が必要な提案書をmissingに戻して整合性の再確認を促します。

## AOF・QIF・設計図

AOFのmanaged-projectを`.aof/`に導入し、作業・品質の証拠を記録します。QIF固有packageを公式検証器で検査します。外部フレームワークのコードはDIF本体にコピーしていません。[固定バージョン](docs/architecture/providers.json)と[再現手順](docs/architecture/README.md)を参照。

```sh
npm run architecture -- /path/to/built/archmodel /path/to/built/archmap-mermaid
node tools/provider-check.mjs /path/to/aof /path/to/qif
```

archmodel原本からMermaidとSVGを再生成します。図の手修正は原本に逆反映されません。AOF/QIFの実行と図の再生成は開発用の任意ツールであり、Skills利用者にインストールを要求しません。

## 検証範囲

段階別スキーマ、ID参照、必須制約、証拠種別、成果物の実在・ハッシュ、宣言された色のコントラスト、変更履歴、人間の判断記録を機械検査します。成果物の意味的一致、実機のアクセシビリティ、設計の多様性や有用性は自動証明しません。

3難易度のベンチマークは入力・期待条件・ルーブリック・機械fixtureを同梱しています。fixtureのPrecision/RecallとAIの提案能力は別です。AI能力・重大度分類・実ユーザー効果は未評価です。
