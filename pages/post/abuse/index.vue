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
        <li aria-current="page" class="active">Report abuse</li>
      </vs-breadcrumb>
    </header>

    <section>
      <h2>Report abuse</h2>
      <form @submit.stop>
        <label for="text">報告する短歌のIDを入力してください</label>
        <textarea
          v-model.trim="text"
          placeholder="IDはひとつずつ報告してください"
          rows="1"
          minlength="1"
          maxlength="24"
        ></textarea>
        <vs-row vs-w="12">
          <vs-col
            vs-type="flex"
            vs-justify="flex-end"
            vs-align="flex-start"
            vs-offset="8"
            vs-lg="4"
            vs-sm="12"
          >
            <vs-button type="border" @click.prevent="post">報告</vs-button>
          </vs-col>
        </vs-row>
      </form>
    </section>

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
  import { required, maxLength } from "vuelidate/lib/validators";

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
              "@id": "https://madokatanka.herokuapp.com/post/abuse",
              name: "Report abuse - まどか短歌会",
            },
          },
        ],
      };
      return {
        __dangerouslyDisableSanitizers: ["script"],
        title: "Report abuse",
        script: [
          {
            innerHTML: JSON.stringify(structuredData),
            type: "application/ld+json",
          },
        ],
      };
    },
    data() {
      return {
        text: "",
      };
    },
    methods: {
      async post() {
        const token = await this.$recaptcha.execute({ action: "post_tanka" });
        if (!this.$v.text.$invalid) {
          this.$axios
            .put("/api/tanka", {
              _csrf: this.$store.getters.csrf,
              data: this.$v.text.$model,
              token: token,
            })
            .then((res) => {
              this.$gtag("event", "click", {
                event_category: "report_abuse",
                event_label: this.$v.text.$model,
              });
              this.$vs.notify({
                time: 4000,
                title: "以下の内容を報告しました",
                text: this.$v.text.$model,
                color: "success",
                icon: "info",
              });
            })
            .catch((error) => {
              this.$gtag("event", "click", {
                event_category: "report_abuse",
                event_label: JSON.stringify(error.response.data),
              });
              this.$vs.notify({
                time: 4000,
                title:
                  "うまく報告できませんでした。あとでもう一度お試しください",
                text: "",
                color: "warning",
                icon: "info",
              });
            });
        } else {
          this.$vs.notify({
            time: 4000,
            title: "空文字は投稿できません",
            text: "",
            color: "warning",
            icon: "info",
          });
        }
      },
    },
    async mounted() {
      await this.$recaptcha.init();
    },
    validations: {
      text: {
        required,
        maxLength: maxLength(24),
      },
    },
  };
</script>

<style scoped>
  div {
    padding: 1em;
  }
</style>
