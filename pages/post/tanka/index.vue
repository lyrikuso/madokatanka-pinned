<template>
<div>

    <header>
        <h1>
            <nuxt-link to="/">まどか短歌会</nuxt-link>
        </h1>
        <vs-breadcrumb>
            <li><nuxt-link to="/" title="Home">Home</nuxt-link><span class="vs-breadcrum--separator">/</span></li>
            <li aria-current="page" class="active">Post</li>
        </vs-breadcrumb>
    </header>

    <section>
        <div>
            <h3>投稿におけるルール</h3>
            <ul>
                <li>投稿された作品は匿名で公開されます。作品を投稿することで、サイト利用者はまどか短歌会が作品を匿名で公開することに同意したものと見なします。</li>
                <li>個人情報や誹謗・中傷、その他の他者の権利を侵害したり法律に触れたりすると考えられる文言は、サイト管理者の判断で削除することがあります。また、これらの例に限らず、作品はサイト管理者の判断で削除することがあります。</li>
                <li>過去に公開した作品でも投稿することができます。ただし、まどか短歌会に投稿された特定の作品について自分の作品であると発信することはお控えください。</li>
            </ul>
        </div>
        <form @submit.stop>
            <div>
                <label for="textarea">投稿したい短歌を入力してください</label>
                <textarea v-model.trim="text" placeholder="140字まで（長すぎると正しく表示されないことがあります）" rows="5" minlength="1" maxlength="140" name="textarea"></textarea>
            </div>
            <vs-row vs-w="12">
                <vs-col vs-type="flex" vs-justify="flex-start" vs-align="flex-start" vs-lg="6" vs-sm="12">
                    <vs-checkbox v-model="rule">投稿におけるルールに同意する</vs-checkbox>
                </vs-col>
                <vs-col vs-type="flex" vs-justify="flex-end" vs-align="flex-start" vs-offset="2" vs-lg="4" vs-sm="12">
                    <vs-button type="border" @click.prevent="post">投稿</vs-button>
                </vs-col>
            </vs-row>
        </form>
        <div>
            <h3>利用できる記法</h3>
            <p>一部のHTMLタグを利用して表示を調整できます。</p>
            <div>
                <h4>&lt;ruby&gt;タグ</h4>
                <h5>使用例</h5>
                <pre><code>&lt;ruby&gt;漢字&lt;rp&gt;(&lt;/rp&gt;&lt;rt&gt;かんじ&lt;/rt&gt;&lt;rp&gt;)&lt;/rp&gt;&lt;/ruby&gt;</code></pre>
                <h4>&lt;span class="tcy"&gt;タグ</h4>
                <p>囲った文字を縦書き時に強制的に縦中横で表示します。</p><br>
                <h5>使用例</h5>
                <pre><code>&lt;span class=&quot;tcy&quot;&gt;100&lt;/span&gt;</code></pre>
            </div>
        </div>
    </section>

    <footer>
        <p>
            Copyright &copy; 2019 まどか短歌会
        </p>
        <p>
            Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" target="_blank" rel="noopener noreferrer">Kiranshastry</a> from <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>｜
            Photo on <a href="https://visualhunt.com/re5/d1c9edb0" target="_blank" rel="noopener noreferrer">Visual hunt</a>
        </p>
    </footer>

</div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators"

export default {
    head () {
        const structuredData = {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
                "itemListElement":
                [{
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@id": "https://madokatanka.herokuapp.com",
                        "name": "まどか短歌会"
                    }
                }, {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@id": "https://madokatanka.herokuapp.com/post/tanka",
                        "name": "Post - まどか短歌会"
                    }
                }],
        }
        return {
            __dangerouslyDisableSanitizers: ["script"],
            title: "Post",
            script: [
                {
                    innerHTML: JSON.stringify(structuredData),
                    type: "application/ld+json"
                }
            ]
        }
    },
    middleware: ["setLocale"],
    data () {
        return {
            rule: false,
            text: ""
        }
    },
    methods: {
        post () {
            if (!this.$v.text.$invalid && this.rule) {
                this.$axios.post("/api/tanka", {
                    _csrf: this.$store.getters.csrf,
                    data: this.$v.text.$model,
                    month: moment().format("YYYYMM")
                })
                .then(res => {
                    this.$gtag("event", "click", {
                        event_category: "post_tanka"
                    })
                    this.$vs.notify({
                        time: 4000,
                        title: "以下の内容で投稿しました",
                        text: this.$v.text.$model,
                        color: "success",
                        icon: "info"
                    });
                })
                .catch(error => {
                    this.$gtag("event", "click", {
                        event_category: "post_tanka",
                        event_label: JSON.stringify(error)
                    })
                    this.$vs.notify({
                        time: 4000,
                        title: "うまく投稿できませんでした。あとでもう一度お試しください",
                        text: "",
                        color: "warning",
                        icon: "info"
                    })
                })
            } else {
                this.$vs.notify({
                    time: 4000,
                    title: "この文字列は投稿できません",
                    text: "",
                    color: "warning",
                    icon: "info"
                })
            }
        }
    },
    validations: {
        text: {
            required,
            maxLength: maxLength(140)
        }
    }
}
</script>

<style scoped>
    div, section {
        padding: 1em;
    }
    pre {
        padding: 1em;
    }
</style>
