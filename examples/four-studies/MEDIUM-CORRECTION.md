# 主成果物の訂正

ユーザーの意図は、レストランのテーブルに置くメニューと、モンスター図鑑端末の画面内だった。以前の紹介Webページを主成果物にした判断は誤り。

| 用途 | 現在の主成果物 | 形式 |
| --- | --- | --- |
| メニュー | ../../output/pdf/casa-tutti-table-menu.pdf | A4縦・表裏2ページ。実際にはリポジトリrootのoutput/pdf配下 |
| 編集元・紙面プレビュー | menu-print.html / menu-print.css | 固定210×297mm、Webサイトのナビやヒーローなし |
| モンスター図鑑 | monster.html / screen.css / monster.js | 画面だけの320×240。クリックで操作可能 |
| 画面画像 | renders/screen-list/detail/search/found/failure/saved.png | 各320×240、筐体や紹介文なし |
| 状態比較 | screen-board.html / renders/screen-board.png | 上記画面の比較用シート |

PDFは2ページを両面・長辺とじで印刷して使う想定。紙面の内容は架空で、食材情報は未確定。生成画像の実効解像度・色・断裁は商業印刷向けに別途確認が必要。PDFはフォントを含むブラウザ出力をPopplerで見直した。色校正や全PDFアクセシビリティを保証しない。

旧menu-web-study.html / monster-study.htmlとv1画像は経緯の記録として保持。主リンクは新版へ切り替えた。メーカーと銀行をこの訂正で合格扱いにはしない。

再生成：render-media.mjsでPDFと画面画像、pdftoppmでPDFページ画像、render-boards.mjsで比較シート。外部導入済みPlaywright/Chromiumを任意で使用。画像素材はassets/menu-food-grid.png（新規生成、実料理の写真ではない）。
