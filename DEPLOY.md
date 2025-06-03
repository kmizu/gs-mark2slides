# Google Apps Script デプロイガイド

## 初回セットアップ

### 1. claspのインストール

```bash
npm install -g @google/clasp
```

### 2. Googleアカウントでログイン

```bash
clasp login
```

### 3. GASプロジェクトの作成

```bash
# TypeScriptをビルド
npm run build:gas

# 新しいGASプロジェクトを作成
npm run gas:create
```

これで `.clasp.json` ファイルが作成されます。

### 4. デプロイ

```bash
npm run gas:deploy
```

### 5. Webアプリとして公開

1. ブラウザでGASプロジェクトを開く
   ```bash
   npm run gas:open
   ```

2. メニューから「デプロイ」→「新しいデプロイ」を選択

3. 設定:
   - 種類: ウェブアプリ
   - 説明: gs-mark2slides
   - 実行ユーザー: 自分
   - アクセスできるユーザー: 全員

4. 「デプロイ」をクリック

5. 表示されたWebアプリのURLにアクセス

## 開発フロー

### コードの変更

1. `src/gas/` 内のTypeScriptファイルを編集

2. ビルド & デプロイ
   ```bash
   npm run gas:deploy
   ```

3. ブラウザでテスト

### HTMLの変更

`src/gas/index.html` を編集後、同様にビルド & デプロイ

## トラブルシューティング

### エラー: "User has not enabled the Apps Script API"

1. [Google Cloud Console](https://console.cloud.google.com) にアクセス
2. Apps Script APIを有効化

### エラー: "押し込みに失敗しました"

- `.claspignore` を確認
- `dist-gas/` ディレクトリが存在することを確認
- `npm run build:gas` を実行してから再試行