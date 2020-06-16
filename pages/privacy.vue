<template>
  <div>
    <header>
      <h1>
        <nuxt-link to="/">まどか短歌会</nuxt-link>
      </h1>
      <vs-breadcrumb>
        <li>
          <nuxt-link to="/" title="Home">Home</nuxt-link
          ><span class="vs-breadcrum--separator">/</span>
        </li>
        <li aria-current="page" class="active">Privacy</li>
      </vs-breadcrumb>
    </header>

    <article>
      <div>
        <p>
          まどか短歌会の管理者（以下、開発者とします）は以下のプライバシーポリシー（以下、本ポリシーとします）にもとづいてまどか短歌会（以下、本サイトとします）の利用者の個人情報を取り扱います。
        </p>
      </div>
      <div>
        <h3>個人情報の範囲</h3>
        <p>
          本ポリシーにおいて個人情報とは、個人情報保護法における定義に従い、当該情報により特定の個人を識別することができるものとします。
        </p>
        <p>
          この定義に照らしたとき、開発者が収集する利用者の個人情報には以下のものが含まれます。
        </p>
        <ul class="indent">
          <li>利用者のGmailアドレス</li>
          <li>利用者の匿名ID</li>
        </ul>
        <p>
          また、上記の情報を収集する際、利用者のGoogleアカウントに保存されている個人情報が一時的に読み取られることがあります。それらの情報を確認するには<a
            href="https://myaccount.google.com/privacy?hl=ja#personalinfo"
            target="_blank"
            rel="noopener"
            >このリンク</a
          >を参照してください。
        </p>
      </div>
      <div>
        <h3>Google Analyticsやその他の解析ツールの利用について</h3>
        <p>
          開発者は本サイトの利用者の動向を調査するためにGoogle
          Analyticsやその他の解析ツールを用いて統計的な利用情報を収集することがあります。
        </p>
      </div>
      <div>
        <h3>個人情報の利用と管理</h3>
        <p>
          開発者は本サイトのサービスを提供するうえで必要と認められる範囲においてのみ、収集した個人情報を利用・管理します。ただし、法令、国が定める指針、その他規範を遵守するうえでやむを得ない事情がある場合には、このかぎりではありません。
        </p>
      </div>
      <div>
        <h3>本ポリシーの変更</h3>
        <p>
          開発者は、サービスの拡張等により、合理的と判断される場合には本ポリシーの内容を変更することがあります。その場合、新しいプライバシーポリシーは本サイト内で公表します。
        </p>
      </div>
      <div>
        <span>附則</span>
        <p>2019年8月23日 制定（第一版）</p>
        <p>2019年9月18日 改定（第二版）</p>
      </div>
    </article>

    <footer>
      <p>
        Copyright &copy; 2019-2020 まどか短歌会
      </p>
      <p>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/kiranshastry"
          target="_blank"
          rel="noopener noreferrer"
          >Kiranshastry</a
        >
        from
        <a
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noopener noreferrer"
          >www.flaticon.com</a
        >
        is licensed by
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          target="_blank"
          rel="noopener noreferrer"
          >CC 3.0 BY</a
        >｜ Photo on
        <a
          href="https://visualhunt.com/re5/d1c9edb0"
          target="_blank"
          rel="noopener noreferrer"
          >Visual hunt</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
  export default {
    head() {
      const structuredData = {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": "https://madokatanka.herokuapp.com",
              name: "まどか短歌会",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@id": "https://madokatanka.herokuapp.com/privacy",
              name: "Privacy - まどか短歌会",
            },
          },
        ],
      };
      return {
        __dangerouslyDisableSanitizers: ["script"],
        title: "Privacy",
        script: [
          {
            innerHTML: JSON.stringify(structuredData),
            type: "application/ld+json",
          },
        ],
      };
    },
  };
</script>

<style scoped>
  div {
    padding: 1em;
  }

  .indent {
    padding: 0.5em;
    list-style: none;
    text-indent: 1em;
  }
</style>
