# madokatanka

[![Open Source Love](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](https://github.com/paithiov909/madokatanka-pinned)

> まどか短歌会のリポジトリです

## About Us

インターネット上でのみ活動する、実体のない短歌会です

- [まどか短歌会](https://madokatanka.herokuapp.com/)
- [Twitter (@madokatanka) ](https://twitter.com/madokatanka)
- [API doc](https://paithiov909.github.io/madokatanka-pinned/)

## Deployment Guide

### Stacks

[madokatanka](#)は以下の 3 点にとくに留意しながら開発しています。

1. Simple
2. Clean
3. Sustainable

[madokatanka](#)は OSS として実際に無料で継続的に運営していけることに注力しており、以下のスタックを自前で用意することで、誰でも同様に動かすことが可能です。

- Heroku (Node.js, heroku-18)
  - Heroku Reddis
  - Memcached Cloud
  - Moesif API Anlytics
- Firebase
  - Cloud Function (現在は未使用)
  - Hosting
  - Authentication
  - Realtime Database
  - Cloud Storage
- reCAPTCHA (v3)

### Necessary Settings

FIrebase のプロジェクト設定を JS ファイル内でエクスポートするようにして、`firebase.config.js`としてプロジェクトルートに置く必要があります（API key は公開リポジトリにプッシュできないのでこのリポジトリには含まれていません）。

```js
module.exports = {
  apiKey: "...",
  authDomain: "...",
  // 以下略...
};
```

また、Realtime Database API を firebase-admin を通じてサーバーサイドで叩いているため、該当の箇所を書き換えつつ`server/routes/adminsdk-hogehoge.js`として権限のあるアカウントの credentials を渡す必要があります（サービスアカウントの credentials は公開リポジトリにプッシュしてはいけないので、このリポジトリには含まれていません）。

### Developping on Local Environments

本番環境と同様の Firebase のスタックがあれば、ローカルでも動作確認できます。

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## License

Copyright (c) 2019-2020 Kato Akiru

Released under the MIT license
