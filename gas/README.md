# gs-mark2slides - Google Apps Script Enhanced Edition

This is the enhanced Google Apps Script (GAS) version of gs-mark2slides that runs entirely in Google's cloud environment. No authentication or setup required!

## Enhanced Features

### 1. **Syntax Highlighting for Code Blocks**
- Automatically detects language from code fence (```javascript, ```python, etc.)
- Supports multiple languages:
  - JavaScript, TypeScript
  - Python
  - Java
  - HTML, CSS
  - SQL
  - And more!
- Custom color schemes for each language

### 2. **Enhanced Markdown Support**
- **Inline formatting**:
  - Bold text: `**bold**` or `__bold__`
  - Italic text: `*italic*` or `_italic_`
  - Strikethrough: `~~strikethrough~~`
  - Inline code: `` `code` `` with background color
- **Links**: `[text](url)` - automatically clickable in slides
- **Nested lists** with proper indentation (up to 3 levels)
- **Multi-line blockquotes** with enhanced styling

### 3. **Better Image Support**
- **Custom sizing**: `![alt](url =widthxheight)`
- Automatic centering of images
- Support for:
  - External URLs (with limitations)
  - Data URLs (embedded images)
  - Google Drive images (drive:FILE_ID)

### 4. **Enhanced Table Styling**
- Table borders and proper styling
- Alternating row colors for better readability
- Column alignment support:
  - Left: `:---`
  - Center: `:---:`
  - Right: `---:`
- Header row highlighting

### 5. **Theme Support**
Three built-in themes:
- **Default**: Clean white background
- **Dark**: Dark mode with syntax highlighting adjustments
- **Light**: Soft light theme

### 6. **Math Expression Support**
- Display math: `$$E = mc^2$$`
- Inline math: `$A = \pi r^2$`
- Basic LaTeX-style rendering

### 7. **Additional Features**
- Background colors: `<!-- _backgroundColor: #color -->`
- Background gradients (fallback to solid color)
- Custom fonts and styling per theme
- Speaker notes with enhanced formatting
- Page numbering with `paginate: true`
- Headers and footers

## デプロイ方法

1. [Google Apps Script](https://script.google.com) にアクセス
2. 新しいプロジェクトを作成
3. 以下のファイルをコピー：
   - `Code.gs` → Code.gs ファイル
   - `index.html` → HTMLファイル「index」を作成
   - `appsscript.json` → ファイル > プロジェクトの設定 > 「appsscript.json」マニフェストファイルを表示

4. Google Slides APIを有効化：
   - Apps Scriptエディタで「サービス」(+) をクリック
   - 「Google Slides API」を見つけて「追加」

5. Webアプリとしてデプロイ：
   - 「デプロイ」>「新しいデプロイ」をクリック
   - 種類: ウェブアプリ
   - 実行ユーザー: 自分（あなたのアカウント）
   - アクセスできるユーザー: 全員
   - 「デプロイ」をクリック

6. WebアプリのURLをコピーして共有！

## 使い方

1. WebアプリのURLを開く
2. Marp Markdownを貼り付けまたは入力
3. リアルタイムプレビューで確認
4. 「Convert to Google Slides」をクリック
5. プレゼンテーションが作成され、リンクが表示されます

## 対応Marp記法の例

```markdown
---
marp: true
title: プレゼンテーションタイトル
theme: default
paginate: true
backgroundColor: #ffffff
header: ヘッダーテキスト
footer: フッターテキスト
---

# メインタイトル

最初のスライドの内容

---

## 2枚目のスライド

- 項目1
- 項目2
  - ネストされた項目
- 項目3

```javascript
// コードブロック
function hello() {
  console.log("Hello, World!");
}
```

---

<!-- _backgroundColor: #f0f0f0 -->

### カスタム背景色のスライド

> これは引用ブロックです。
> 複数行にも対応しています。

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A1  | B1  | C1  |
| A2  | B2  | C2  |

---

#### 画像の例

![代替テキスト](https://example.com/image.png)

※ URL画像は現在プレースホルダー表示となります

<!-- 
スピーカーノートはここに記述します。
複数行のノートも可能です。
-->
```

## 技術的な詳細

### パーサー実装
- カスタムMarkdownパーサーを実装
- フロントマター、スライド区切り、各種要素を正確に解析
- スピーカーノートとディレクティブの抽出

### コンテンツマッピング
- 各Marp要素をGoogle Slidesの対応する要素に変換
- 適切なスタイリングと配置を適用
- SlidesApp APIの制限内で最大限の機能を実現

### パフォーマンス
- 6分の実行時間制限内で効率的に動作
- 大きなプレゼンテーションにも対応

## トラブルシューティング

### 画像が表示されない
- URL画像は現在サポートされていません
- Google Drive内の画像を使用する場合は、`drive:FILE_ID`形式で指定してください

### スタイルが適用されない
- カスタムCSSは部分的にしかサポートされていません
- 基本的なMarkdownスタイルは全て対応しています

### エラーが発生する
- Markdownの構文を確認してください
- 特殊文字や無効なYAMLがないか確認してください

## 今後の改善予定

- [ ] URL画像のダウンロードと挿入
- [ ] 背景画像のサポート
- [ ] より多くのMarpテーマ対応
- [ ] アニメーション効果
- [ ] SVGサポート