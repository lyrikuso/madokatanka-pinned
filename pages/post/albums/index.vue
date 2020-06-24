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
        <li aria-current="page" class="active">Albums</li>
      </vs-breadcrumb>
    </header>

    <section>
      <vs-row vs-w="12">
        <client-only>
          <vs-col
            vs-type="flex"
            vs-justify="flex-end"
            vs-align="flex-end"
            v-if="authenticated"
          >
            <vs-button type="border" @click.prevent="signout" icon="exit_to_app"
              >サインアウト</vs-button
            >
          </vs-col>
          <vs-col
            vs-type="flex"
            vs-justify="flex-end"
            vs-align="flex-end"
            v-else
          >
            <vs-button type="border" @click.prevent="signin" icon="person_add"
              >サインイン</vs-button
            >
          </vs-col>
        </client-only>
      </vs-row>
      <div class="padding" v-show="authenticated">
        <p>
          あなたのユーザーページ：<a :href="link">{{ link }}</a>
        </p>
        <form @submit.stop>
          <label for="name">あなたのなまえ</label>
          <input
            type="text"
            v-model.trim="data.name"
            placeholder="作者として表示される名前です"
            minlength="1"
            maxlength="50"
            name="name"
          />
          <label for="textarea">タイトル</label>
          <input
            type="text"
            v-model.trim="title"
            placeholder="ページのタイトル"
            minlength="1"
            maxlength="50"
            name="title"
          />
          <label for="url">URL</label>
          <input
            type="url"
            v-model.trim="url"
            placeholder="有効なJSONを返すURL"
            minlength="1"
            maxlength="180"
            name="url"
          />
        </form>
        <vs-row vs-w="12">
          <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-end">
            <vs-button type="border" @click.prevent="push" icon="add_circle"
              >アルバムを追加</vs-button
            >
            <vs-button type="border" @click.prevent="update" icon="cloud_upload"
              >データを更新</vs-button
            >
          </vs-col>
        </vs-row>
        <table>
          <thead>
            <tr>
              <td>Remove</td>
              <td>タイトル</td>
              <td>URL</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val, idx) in data.albums" :key="val.key">
              <td>
                <a role="button" @click.stop="splice(idx)"
                  ><i class="material-icons">remove_circle</i></a
                >
              </td>
              <td v-clipboard:copy="val.title" v-clipboard:success="on_copy">
                {{ val.title }}
              </td>
              <td v-clipboard:copy="val.url" v-clipboard:success="on_copy">
                {{ val.url }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <div class="padding">
        <h3>アルバム機能について</h3>
        <ul>
          <li>
            作品のデータをJSONで返すURLを指定することで、作品を公開するためのURLを発行できます。
          </li>
          <li>
            この機能を利用するためにはGoogleアカウントでまどか短歌会にサインアップする必要があります。<nuxt-link
              to="/privacy"
              >プライバシーポリシー</nuxt-link
            >を確認したうえで利用してください。
          </li>
        </ul>
      </div>
      <div class="padding">
        <h3>アルバムの使い方</h3>
        <ul>
          <li>
            id列（一意のIDを含む列）とbody列（公開したい作品を含む列）からなるGoogleスプレッドシートを用意したうえで、「ファイル
            > ウェブに公開」からCSV形式でスプレッドシートを公開します。
          </li>
          <li>
            <a
              href="https://gson.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
              >Gson</a
            >で返されるURLを指定してアルバムを新しく追加すると、公開用のURLが発行されます。
          </li>
          <li>
            アルバム機能の利用をやめるには、サインインしてから公開をやめたいアルバムを削除してください。まどか短歌会にサインアップしたユーザーデータを完全に削除する（退会する）必要がある場合には、お手数ですが<a
              href="https://twitter.com/madokatanka"
              target="_new"
              >@madokatanka</a
            >に個別にご連絡ください。
          </li>
        </ul>
      </div>
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
  import firebase from "firebase/app";
  import nanoid from "nanoid";
  import { maxLength, url } from "vuelidate/lib/validators";
  import clipboard from "~/plugins/clipboard.js";

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
              "@id": "https://madokatanka.herokuapp.com/post/albums",
              name: "Albums - まどか短歌会",
            },
          },
        ],
      };
      return {
        __dangerouslyDisableSanitizers: ["script"],
        title: "Albums",
        script: [
          {
            innerHTML: JSON.stringify(structuredData),
            type: "application/ld+json",
          },
        ],
      };
    },
    mixins: [clipboard],
    data() {
      return {
        data: {
          id: "",
          name: "匿名のユーザーさん",
          albums: [
            {
              key: nanoid(5),
              title: "まだ１件も保存されていません",
              url: null,
            },
          ],
        },
        title: "",
        url: "",
      };
    },
    computed: {
      authenticated() {
        return !_.isNull(this.$store.getters.uid);
      },
      link() {
        return `https://madokatanka.herokuapp.com/albums/${this.data.id}`;
      },
    },
    async mounted() {
      await this.$recaptcha.init();
      this.$fireAuth.onAuthStateChanged(async (user) => {
        const token = await this.$recaptcha.execute({ action: "auth" });
        if (user) {
          this.$vs.loading({
            text: "ログインしています",
          });
          this.$nextTick(function () {
            this.$gtag("set", {
              login: true,
            });
            this.$axios
              .put("/api/albums", {
                _csrf: this.$store.getters.csrf,
                authuser: this.$store.getters.uid,
                token: token,
              })
              .then((res) => {
                this.data = res.data.data;
                this.$vs.loading.close();
              })
              .catch((error) => {
                console.error(error.response);
                this.$vs.loading.close();
              });
          });
        } else {
          this.$gtag("set", {
            login: false,
          });
        }
      });
    },
    methods: {
      signin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.$fireAuth.signInWithRedirect(provider).catch((err) => {
          console.error(err);
          this.$vs.notify({
            time: 8000,
            title:
              "Googleアカウントで正常にログインできませんでした。もう一度お試しください",
            text: "",
            color: "warning",
            icon: "info",
          });
        });
      },
      signout() {
        this.$fireAuth.signOut().catch((err) => {
          this.$vs.notify({
            time: 8000,
            title:
              "Googleアカウントから正常にログアウトできませんでした。もう一度お試しください",
            text: "",
            color: "warning",
            icon: "info",
          });
        });
      },
      push() {
        if (!this.$v.$invalid) {
          if (_.isArray(this.data.albums)) {
            this.data.albums.push({
              key: nanoid(8),
              title: this.title,
              url: this.url,
            });
          } else {
            this.data.albums = [
              {
                key: nanoid(8),
                title: this.title,
                url: this.url,
              },
            ];
          }
        }
      },
      splice(idx) {
        this.data.albums.splice(idx, 1);
      },
      async update() {
        const token = await this.$recaptcha.execute({ action: "update_album" });
        this.$axios
          .post("/api/albums", {
            _csrf: this.$store.getters.csrf,
            authuser: this.$store.getters.uid,
            data: this.data,
            token: token,
          })
          .then((res) => {
            this.$vs.notify({
              time: 4000,
              title: "データを更新しました",
              text: "",
              color: "primary",
              icon: "info",
            });
          })
          .catch((error) => {
            this.$vs.notify({
              time: 8000,
              title: "データの更新に失敗しました。もう一度お試しください",
              text: "",
              color: "warning",
              icon: "info",
            });
          });
      },
    },
    validations: {
      title: {
        maxLength: maxLength(50),
      },
      url: {
        maxLength: maxLength(180),
        url: url(),
      },
    },
  };
</script>

<style scoped>
  .padding {
    padding: 1em;
  }
</style>
