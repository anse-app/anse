![Banner](https://user-images.githubusercontent.com/1998168/235366625-e615e68d-592c-4f18-9c9f-1e5cd1778557.png)

# Anse

[English](./README.md) | [简体中文](./README.zh-CN.md) | 日本語

Anse は AI チャット用に完全に最適化された UI です。

- 🍿 **ライブプレビュー**: https://anse.app
- 📖 **ドキュメント**: https://docs.anse.app
- ✨ **リリースノート**: https://github.com/anse-app/anse/releases

## 特徴

- **🚀 強力なプラグインシステム** - [OpenAI](https://openai.com/) や [Replicate](https://replicate.com/) のような AI プラットフォームを簡単に拡張できる `Provider plugin` を搭載し、カスタムモデルのパラメータもサポートしています。
- **💬 セッションレコードの保存** - `IndexDB` を使用してローカルデータを保存し、サーバーにアップロードすることはありません。
- **🎉 複数のセッションモード** - 様々な会話モードを提供し、`Single Conversation`, `Continuous Conversation`, `OpenAI Image Generation`、`Stable Diffusion` などをサポートします。
- **💎 UI エクスペリエンスの向上** - 前バージョンのウェブサイトのUIをリファクタリングし、多くの細部を最適化し、`mobile end` と `dark mode` にも対応しました。
- **🌈 ワンクリックデプロイ** - [Vercel](https://vercel.com/)、[Netlify](https://www.netlify.com/)、`Docker`、`Node` やその他のプラットフォームにウェブサイトをデプロイするには、私たちのドキュメントを参照することができます。

## ローカル実行

### プレ環境
1. **Node**: 開発環境とデプロイ環境の両方が `Node v18` 以降であることを確認してください。[nvm](https://github.com/nvm-sh/nvm) を使えば、複数の `node` バージョンをローカルで管理することができます。
   ```bash
    node -v
   ```
2. **PNPM**: 依存関係の管理には [pnpm](https://pnpm.io/) を使うことをお勧めします。pnpm をインストールしたことがない場合は、以下のコマンドでインストールできます:
   ```bash
    npm i -g pnpm
   ```
3. **OPENAI_API_KEY**: このアプリケーションを実行する前に、OpenAI から API キーを取得する必要があります。API キーの登録は [https://beta.openai.com/signup](https://beta.openai.com/signup) から行えます。

### はじめに

1. 依存関係のインストール
   ```bash
    pnpm install
   ```
2. アプリケーションを実行することで、ローカルプロジェクトは `http://localhost:3000/` で実行
   ```bash
    pnpm run dev
   ```
3. 設定パネルに [OpenAI API キー](https://platform.openai.com/account/api-keys)を追加して、お楽しみください！

## デプロイ方法
詳細はこちらをご覧ください: https://docs.anse.app/self-deploy

## 自動アップデートの有効化

プロジェクトをフォークした後、フォークしたプロジェクトのアクションページでワークフローとアップストリーム同期アクションを手動で有効にする必要があります。有効にすると、自動更新が毎日スケジュールされます:

![](https://cdn.jsdelivr.net/gh/yzh990918/static@master/20230518/image.2omctdf8bbk0.webp)
## よくある質問

Q: TypeError: フェッチに失敗しました。

A: 参照: https://github.com/anse-app/chatgpt-demo/issues/34

Q: throw new TypeError(`${context}` is not a ReadableStream.)

A: Node のバージョンが `v18` 以降である必要があります，参考: https://github.com/anse-app/chatgpt-demo/issues/65

Q: プロキシを導入することなく国内アクセスを高速化するチュートリアルはありますか？

A: こちらのチュートリアルをご参照ください: https://github.com/anse-app/chatgpt-demo/discussions/270

## コントリビュート

このプロジェクトが存在するのは、コントリビュートしてくださったすべての方々のおかげです。

サポーターの皆さん、ありがとうございました！🙏

[![img](https://contrib.rocks/image?repo=anse-app/anse)](https://github.com/anse-app/anse/graphs/contributors)

## ライセンス

MIT © [ddiu8081](https://github.com/anse-app/anse/blob/main/LICENSE)
