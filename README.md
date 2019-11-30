# madokatanka

> まどか短歌会のリポジトリです。Credentialなどの一部のファイルを除いて公開しています。

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Licence

Copyright (c) 2019 Kato Akiru

Released under the MIT license

## `tanka.db`設計

### collection

``` SQL
CREATE TABLE "collection" ( `prefix` TEXT, `suffix` TEXT, `pyomi` TEXT, `syomi` TEXT, `plength` INTEGER, `slength` INTEGER )
```

prefixとその共起語であるsuffixのリスト

| prefix | suffix | pyomi    | syomi  | plengh | slength |
| ------ | ------ | -------- | ------ | ------ | ------- |
| 八月   | の     | ハチガツ | ノ     | 4      | 1       |
| の     | 夜明け | ノ       | ヨアケ | 1      | 3       |
| 夜明け | が     | ヨアケ   | ガ     | 3      | 1       |

### chunks

``` SQL
CREATE TABLE "chunks" ( `index` TEXT, `chunk` TEXT, `yomi` TEXT, `clength` INTEGER )
```

prefixがcollection中に見つからない場合はこの中からランダムに文節を返す

| index  | chunk    | yomi       | clength |
| ------ | -------- | ---------- | ------- |
| の     | 八月の   | ハチガツノ | 5       |
| が     | 夜明けが | ヨアケガ   | 4       |
| 明ける | 明ける   | アケル     | 3       |

### collection_prefix

``` SQL
CREATE INDEX `collection_prefix` ON `collection` (`prefix` )
```

collectionの`prefix`のインデックス
