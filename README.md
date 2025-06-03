# gs-mark2slides

Marp Markdown プレゼンテーションを Google Slides に変換するツール

## 🚀 Google Apps Script版（推奨）

最も簡単で、セットアップ不要な方法です。

### 使い方

1. **[こちらのリンク](https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec)** にアクセス（デプロイ後のURL）
2. Googleアカウントでログイン
3. Marp Markdownを入力またはファイルをアップロード
4. 「Convert to Google Slides」をクリック

### 主な機能

- 📝 **リアルタイムプレビュー** - Markdownを編集しながら即座にプレビュー
- 🎨 **複数テーマ対応** - default, dark, light テーマ
- 💻 **シンタックスハイライト** - 主要プログラミング言語対応
- 📊 **豊富な要素サポート**
  - 見出し (H1-H6)
  - リスト（箇条書き、番号付き、ネスト対応）
  - テーブル（列の配置指定可能）
  - コードブロック
  - 引用
  - 画像
  - 数式（基本的な表示）
  - スピーカーノート
- 🔢 **ページ番号、ヘッダー、フッター**
- 🎨 **背景色・背景画像**

## 開発者向け

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/gs-mark2slides.git
cd gs-mark2slides

# 依存関係をインストール
npm install

# TypeScriptをビルド
npm run build:gas
```

### デプロイ

詳細は [DEPLOY.md](./DEPLOY.md) を参照してください。

```bash
# clasp でログイン（初回のみ）
clasp login

# GASプロジェクトを作成（初回のみ）
npm run gas:create

# デプロイ
npm run gas:deploy

# ブラウザで開く
npm run gas:open
```

## 対応している Marp 記法

### 基本的な記法

```markdown
---
marp: true
theme: default
paginate: true
---

# プレゼンテーションタイトル

最初のスライド

---

## 2枚目のスライド

- 項目1
- 項目2
  - サブ項目

<!-- スピーカーノートはここに -->

---

<!-- _backgroundColor: #1e90ff -->

## 背景色付きスライド

青い背景のスライド

---

```javascript
// コードブロックの例
function hello() {
  console.log("Hello, World!");
}
```

---

| 言語 | 人気度 | タイプ |
|:-----|:------:|-------:|
| JavaScript | ⭐⭐⭐⭐⭐ | 動的 |
| Python | ⭐⭐⭐⭐⭐ | 動的 |
| Java | ⭐⭐⭐⭐ | 静的 |
```

### 対応ディレクティブ

- `marp: true` - Marpモードを有効化
- `theme` - テーマ選択 (default, dark, light)
- `paginate` - ページ番号表示
- `header` - ヘッダーテキスト
- `footer` - フッターテキスト
- `_backgroundColor` - スライド個別の背景色
- `_backgroundImage` - スライド個別の背景画像

## 制限事項

- カスタムCSSテーマは部分的にサポート
- 複雑なレイアウトは調整が必要な場合があります
- 数式表現は基本的な表示のみ（LaTeX完全互換ではない）
- Google Slides APIの制限により、一部のスタイリングオプションは制限されます

## 貢献

プルリクエストや Issue の報告を歓迎します！

## ライセンス

ISC