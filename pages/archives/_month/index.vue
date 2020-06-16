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
        <li>
          <nuxt-link to="/archives" title="Archives">Archives</nuxt-link
          ><span class="vs-breadcrum--separator">/</span>
        </li>
        <li aria-current="page" class="active">{{ title }}</li>
      </vs-breadcrumb>
    </header>

    <section>
      <div id="swiper" class="swiper-container">
        <div class="swiper-wrapper">
          <div
            is="slide"
            class="swiper-slide"
            v-for="item in slides"
            :item="item"
            :key="item.id"
          ></div>
        </div>
        <!-- <div class="swiper-pagination"></div> -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <!-- <div class="swiper-scrollbar"></div> -->
      </div>
    </section>

    <section>
      <div>
        <table id="grid">
          <thead>
            <tr>
              <th>ID</th>
              <th>作品</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in slides" :key="item.id">
              <td class="clip" :data-clipboard-text="item.id">{{ item.id }}</td>
              <td
                class="clip"
                :data-clipboard-text="item.body"
                v-html="item.body"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <vue-disqus shortname="madokatanka"></vue-disqus>
    </section>

    <footer>
      <vs-button
        color="rgb(65,201,180)"
        type="line"
        icon="create"
        :href="noteLink"
        target="_blank"
      >
        noteでこのページの記事を書く</vs-button
      >
      <vs-divider />
      <socials></socials>
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
  import swiper from "~/plugins/swiper.js";
  import clipboard from "~/plugins/clipboard.js";
  import slide from "~/components/Nehan.vue";
  import socials from "~/components/Jssocials.vue";

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
              "@id": "https://madokatanka.herokuapp.com/archives",
              name: "Archives - まどか短歌会",
            },
          },
          {
            "@type": "ListItem",
            postion: 3,
            item: {
              "@id": `https://madokatanka.herokuapp.com/archives/${this.month}`,
              name: `${moment(this.month, "YYYYMM").format(
                "MMM YYYY"
              )} - まどか短歌会`,
            },
          },
        ],
      };
      return {
        __dangerouslyDisableSanitizers: ["script"],
        title: moment(this.month, "YYYYMM").format("MMM YYYY"),
        script: [
          {
            innerHTML: JSON.stringify(structuredData),
            type: "application/ld+json",
          },
        ],
      };
    },
    middleware: ["checkPublished"],
    mixins: [swiper, clipboard],
    components: {
      slide: slide,
      socials: socials,
    },
    async asyncData({ app, params }) {
      const data = await app.$axios
        .get(`/api/tanka?month=${params.month}`)
        .then((res) => {
          if (_.isEmpty(res.data.data)) {
            return [
              {
                id: "dummy",
                body: "表示できる短歌がありません",
              },
            ];
          } else {
            return res.data.data;
          }
        })
        .catch((error) => {
          return [
            {
              id: "dummy",
              body: "表示できる短歌がありません",
            },
          ];
        });
      return {
        title: moment(params.month, "YYYYMM").format("MMM YYYY"),
        month: params.month,
        slides: _.shuffle(data),
        tableExport: undefined,
      };
    },
    computed: {
      config() {
        return {
          footer: false,
          formats: ["csv", "txt"],
          filename: moment(this.month, "YYYYMM").format("MMM YYYY"),
          exportButtons: true,
          bootstrap: true,
          trimWhitespace: true,
        };
      },
      noteLink() {
        return `https://note.com/intent/post?url=https://madokatanka.herokuapp.com/archives/${this.month}&hashtags=madokatanka`;
      },
    },
    mounted() {
      this.mySwiper(this.slides);

      if (_.isUndefined(this.tableExport)) {
        if (process.browser) {
          this.$nextTick(function () {
            const grid = this.$el.querySelector("#grid");
            this.tableExport = $(grid).tableExport(this.config);
          });
        }
      } else {
        this.$nextTick(function () {
          this.tableExport.update(this.config);
        });
      }
    },
  };
</script>

<style scoped>
  div {
    padding: 1em;
  }

  .csv:before,
  .txt:before,
  .xls:before,
  .xlsx:before {
    background: none;
    box-shadow: none;
  }
</style>
