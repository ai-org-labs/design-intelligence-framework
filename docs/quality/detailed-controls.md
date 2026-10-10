# 詳細UI・プラットフォーム知見 — 2026-10-11

ユーザーの指示により、設定画面、詳細フォーム、スライダー等の構成とWeb・スマホOS別の公式知見を追加した。

| 変更 | 根拠・成果物 | 証明しないこと |
| --- | --- | --- |
| standalone dif-controls | 公式資料の参照表、操作選択、状態と回復、プラットフォーム差 | すべてのガイドライン・OS版の網羅 |
| 知識と同梱コピー | knowledge/principles.json とdif-designのコピーを同時更新 | ガイドラインを自動適合判定する機能 |
| Web設定の実例 | examples/settings-detail: 通常・エラー画像、localStorage保存と失敗、数値/range同期、戻るとUndo | native UI、サーバー競合、実機入力の正しさ |
| 評価課題 | benchmarks/controls: Web/iOS/Android、状態喪失、精度・IME・参照不能の課題 | 未実施の独立試行の合格 |
| 設計記録 | controls責務をArchModelへ追加し固定版ArchMapで再生成 | controls-trialsの実証。unknownを維持 |

調査はApple HIG、Material 3、Android Developers、W3Cの一次資料。AppleのJSページは公式ページの検索索引本文を参照、MaterialはChromiumでページ本文を読取、W3C/Androidは直接本文を確認。引用集やサイト丸ごとの複製を作らず、適用範囲と短い要約を残した。知識拡張はユーザーの明示依頼によるもので、非公開プロダクトからの自動昇格ではない。

QIF損失境界：WebのCSS pxとnativeのpt/dp、規範と参考パターン、previewとpersisted、作者の観測と実ユーザー成果を混同しない。保存失敗や無効入力を隠さず、実機未検証を既知として残す。Human adoption/Stableはpending。

ローカルWeb試作は1280/390/320pxで状態遷移を実行し、checks.jsonへ結果を記録。作者は画像を見て、狭幅で見本が遠くなる点を修正した。機械確認と自己レビューであり、人間の使いやすさ評価ではない。新しいコードはこの試作と任意の確認スクリプトに限定。CLI/スキーマの契約は変更していない。
