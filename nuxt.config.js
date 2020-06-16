const webpack = require("webpack");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const config = require("./firebase.config.js");
const isdev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: "universal",
  head: {
    htmlAttrs: {
      lang: "ja",
      prefix: "og:http://ogp.me/ns#",
    },
    titleTemplate: "%s - まどか短歌会",
    meta: [
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui ",
      },
      {
        chrset: "utf-8 ",
      },
      {
        name: "google-site-verification",
        content: "235YhdO-YxyJEfMSllBfO_8PM3DL3tu-e3teVUZkksU",
      },
      {
        hid: "description",
        name: "description",
        content:
          "まどか短歌会はインターネット上でのみ活動する、実体のない短歌会（短歌×ナラティヴコミュニティ）です。誰でも参加できますが、投稿された作品は誰が投稿したものかわからないように公開されます。",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://madokatanka.firebaseapp.com/contents/cover.jpg",
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "まどか短歌会",
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "まどか短歌会",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "まどか短歌会はインターネット上でのみ活動する、実体のない短歌会（短歌×ナラティヴコミュニティ）です。誰でも参加できますが、投稿された作品は誰が投稿したものかわからないように公開されます。",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary",
      },
      {
        hid: "twitter:site",
        name: "twitter:site",
        content: "@madokatanka",
      },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: "@shinabitanori",
      },
      {
        hid: "twitter:widgets:autoload",
        name: "twitter:widgets:autoload",
        content: "off",
      },
      {
        hid: "twitter:widgets:csp",
        name: "twitter:widgets:csp",
        content: "on",
      },
      {
        hid: "twitter:dnt",
        name: "twitter:dnt",
        content: "on",
      },
      {
        name: "msapplication-TileColor",
        content: "#ffc40d",
      },
      {
        name: "msapplication-config",
        content: "https://madokatanka.firebaseapp.com/favicon/broserconfig.xml",
      },
      {
        name: "theme-color",
        content: "#ffffff",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "https://madokatanka.firebaseapp.com/favicon/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href:
          "https://madokatanka.firebaseapp.com/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "https://madokatanka.firebaseapp.com/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "https://madokatanka.firebaseapp.com/favicon/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        href:
          "https://madokatanka.firebaseapp.com/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
      {
        rel: "shortcut icon",
        href: "https://madokatanka.firebaseapp.com/favicon/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Noto+Serif+JP",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/fork-awesome/1.1.7/css/fork-awesome.min.css",
        integrity: "sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css",
        integrity: "sha256-XwfUNXGiAjWyUGBhyXKdkRedMrizx1Ejqo/NReYNdUE=",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/jsSocials/1.5.0/jssocials.min.css",
        integrity: "sha256-1tuEbDCHX3d1WHIyyRhG9D9zsoaQpu1tpd5lPqdqC8s=",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://cdnjs.cloudflare.com/ajax/libs/TableExport/5.2.0/css/tableexport.min.css",
        integrity: "sha256-ljRB06PkvKJLniqOfPxxNfnIGgtF3gSWnLqYuFhWoDY=",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css",
        crossorigin: "anonymous",
      },
    ],
  },
  loading: {
    color: "#5bbad5",
  },
  pwa: {
    manifest: {
      name: "madokatanka",
      short_name: "madokatanka",
      theme_color: "#2196f3",
      background_color: "#2196f3",
      display: "browser",
      Scope: "/",
      start_url: "/",
      icons: [
        {
          src: "images/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "images/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "images/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "images/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "images/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          src: "images/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "images/icons/icon-384x384.png",
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: "images/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      splash_pages: null,
      publicPath: "/_nuxt/",
    },
  },
  css: ["@/assets/css/icomoon.css"],
  plugins: [
    {
      src: "@/plugins/vue.js",
    },
    {
      src: "@/plugins/plugins.client.js",
      ssr: false,
    },
  ],
  modules: [
    [
      "@nuxtjs/axios",
      {
        proxy: true,
        retry: true,
      },
    ],
    [
      "@nuxtjs/proxy",
      {
        "/api": isdev
          ? "http://localhost:3000"
          : "https://madokatanka.herokuapp.com",
      },
    ],
    [
      "@nuxtjs/recaptcha",
      {
        hideBadge: false,
        siteKey: "6LdcMaUZAAAAAF3jFrz888WQiTsNF-bYL6U2XbJy",
        version: 3,
        size: "compact",
      },
    ],
    [
      "@nuxtjs/google-gtag",
      {
        id: "UA-73417314-12",
        config: {
          // check out official docs: https: //developers.google.com/analytics/devguides/collection/gtagjs/
          anonymize_ip: true,
          send_page_view: false,
        },
        debug: false,
      },
    ],
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-73417314-12",
      },
    ],
    [
      "@nuxtjs/component-cache",
      {
        maxAge: isdev ? 0 : 10 * 60 * 1000,
        updateAgeOnGet: true,
      },
    ],
    [
      "@miyaoka/nuxt-twitter-widgets-module",
      {
        directiveName: "twitter-widgets",
        scriptUrl: "https://platform.twitter.com/widgets.js",
      },
    ],
    [
      "@nuxtjs/firebase",
      {
        services: {
          auth: true,
        },
        onFirebaseHosting: false,
        config: config,
      },
    ],
    [
      "@nuxtjs/sitemap",
      {
        hostname: "https://madokatanka.herokuapp.com/",
        gzip: true,
      },
    ],
    "@nuxtjs/pwa",
    "nuxt-compress",
  ],
  build: {
    devtools: isdev,
    publicPath: "/_nuxt/",
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        _: "underscore",
        ClipboardJS: "clipboard",
        moment: "moment",
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /xlsx$/,
        contextRegExp: /xlsx/,
      }),
      new MomentLocalesPlugin({
        localesToKeep: ["ja"],
      }),
    ],
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.js$/, // Check for all js files
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/)/,
      });
    },
  },
};
