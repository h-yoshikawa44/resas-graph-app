# RESAS Graph App

## 構成

- Node.js：14.18.2
- TypeScript：4.5.2
- Next.js：12.0.5

API

- [RESAS API](https://opendata.resas-portal.go.jp/)

※Node.js および yarn のバージョン管理には [Volta](https://volta.sh/) を使用。

## 環境構築

RESAS API に登録して、API Key を取得 + .env.example をコピーして値をセットする（初回のみ）

```bash
$ cp .env.example .env.local
```

コミットメッセージテンプレ反映（初回のみ）

```bash
$ git config commit.template .gitmessage
```

ライブラリインストール + Pre Commit 設定反映

```bash
$ yarn install
```

開発サーバ起動

```
$ yarn dev
```

ブラウザでアクセス

```
localhost:3000
```
