# 課題

都道府県別の総人口推移グラフを表示する SPA(Single Page Application)を構築せよ
[ワイヤーフレーム](https://www.notion.so/yumemi/7646721865fa47e7b2c9b2a52c8c40ac)

## 内容

1. RESAS(地域経済分析システム) API の「都道府県一覧」から API を取得する
2. API レスポンスから都道府県一覧のチェックボックスを動的に生成する
3. 都道府県にチェックを入れると、RESAS API から選択された都道府県の「人口構成」を取得する
4. 人口構成 API レスポンスから、X 軸:年、Y 軸:人口数の折れ線グラフを動的に生成して表示する

## 制約

- [x] React/Vue.js/Angular のいずれかを用いて SPA を構築すること（バージョンはできるだけ最新版をご使用ください）
      React（ https://reactjs.org/ ）
      Vue（ https://vuejs.org/index.html ）
      Angular（ https://angular.io/ ）Nuxt.js や Next.js などの、これらを内包したフレームワークの利用も許可する
      Nuxt.js や Next.js などの、これらを内包したフレームワークの利用も許可する

- [x] 都道府県一覧および総人口情報は RESAS API のデータを用いること
- [x] グラフは Highcharts や Rechart.js などのサードパーティ製のグラフライブラリを用いて描画すること
      　ただし、グラフライブラリは上記のものに限らず、任意のものを用いてよい
- [x] Google Chrome 最新版で正しく動くこと
- [x] PC/スマートフォン表示に対応すること(レスポンシブデザイン対応)
      　ただし実機でなく、Google Chrome の検証ツールで確認できればよい
- [x] リンターやフォーマッターを適切に設定すること
      　リンターには ESLint、フォーマッターには Prettier を使用すること
- [x] style は自分で記述し、CSS・UI フレームワークなどは原則使用しないこと
      　ただし、chart ライブラリ内包の style、リセット系の CSS ライブラリについてはこの限りではない
      　また、css-in-js や css-modules、sass などのエコシステムの利用を妨げるものではなく、あくまで css の記述力を測る趣旨に留まる
- [ ]リードエンジニア・テックリード応募の場合は、以下も制約に加える
  　 TypeScript で記述すること
- [x] テストケース/テストコードを作成すること
      　テストツールは任意のものを用いてよい
      　テスト実行時にエラーが発生しないこと

## 注意事項

- [x] RESAS API の利用登録(無料)を行い、API Key を発行する必要がある
- [x] ソースコードは Git で管理し、作成したソースコードは GitHub にアップロードすること
- [x] Netlify / GitHub Pages / Firebase hosting / Vercel 等のホスティングサービスにデプロイし、インターネット経由で閲覧できる状態にし、その URL を提出時に共有すること
- [x] セキュリティを考慮してコードを記述すること
- [x] アプリのコンポーネント粒度の設計、Git コミットメッセージやコミット粒度、ドキュメンテーション等もレビュー対象となる
- [x] チーム開発を意識してコードを記述すること

## 参考

- RESAS API: https://opendata.resas-portal.go.jp/
- RESAS API 仕様書: https://opendata.resas-portal.go.jp/docs/api/v1/index.html
- Highcharts: https://www.highcharts.com/
- Recharts.js: http://recharts.org/en-US/
