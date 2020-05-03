<template>
<div>

    <header>
        <h1>
            <nuxt-link to="/">まどか短歌会</nuxt-link>
        </h1>
        <vs-breadcrumb>
            <li><nuxt-link to="/" title="Home">Home</nuxt-link><span class="vs-breadcrum--separator">/</span></li>
            <li><nuxt-link :to="link" title="Albums">{{ data.name }}の短歌</nuxt-link><span class="vs-breadcrum--separator">/</span></li>
            <li aria-current="page" class="active">{{ title }}</li>
        </vs-breadcrumb>
    </header>

    <section>
        <div id="swiper" class="swiper-container">
            <div class="swiper-wrapper">
                <div is="slide" class="swiper-slide" v-for="item in slides"
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
                    <tr v-for="item in parsed" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td class="clip" :data-clipboard-text="item.body" v-html="item.body"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section>
        <vue-disqus shortname="madokatanka"></vue-disqus>
    </section>

    <footer>
        <vs-button color="rgb(65,201,180)" type="line" icon="create" :href="noteLink" target="_blank">noteでこのページの記事を書く</vs-button>
        <vs-divider />
        <socials></socials>
        <p>
            Copyright &copy; 2019-2020 まどか短歌会
        </p>
        <p>
            Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" target="_blank" rel="noopener noreferrer">Kiranshastry</a> from <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>｜
            Photo on <a href="https://visualhunt.com/re5/d1c9edb0" target="_blank" rel="noopener noreferrer">Visual hunt</a>
        </p>
    </footer>

</div>
</template>

<script>
import swiper from "~/plugins/swiper.js"
import slide from "~/components/Nehan.vue"
import socials from "~/components/Jssocials.vue"

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
                        "@id": `https://madokatanka.herokuapp.com/albums/${this.data.id}`,
                        "name": `${this.data.name}の短歌 - まどか短歌会`
                    }
                }, {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@id": `https://madokatanka.herokuapp.com/albums/${this.data.id}/${this.data.albums.key}`,
                        "name": `${this.title} - まどか短歌会`
                    }
                }]
        }
        return {
            __dangerouslyDisableSanitizers: ["script"],
            title: this.title,
            script: [
                {
                    innerHTML: JSON.stringify(structuredData),
                    type: "application/ld+json"
                }
            ]
        }
    },
    mixins: [swiper],
    components: {
        "slide": slide,
        "socials": socials
    },
    async asyncData ({ app, params }) {
        const data = await app.$axios.get(`/api/albums/${params.id}`)
            .then(res => {
                return _.isUndefined(res.data.data)
                    ? {
                        id: params.id,
                        name: "匿名のユーザーさん",
                        albums: [{
                            key: params.key,
                            title: "まだ１件も保存されていません",
                            url: null
                        }]
                    }
                    : res.data.data
            })
            .catch(error => {
                console.error(error)
                return {
                    id: params.id,
                    name: "匿名のユーザーさん",
                    albums: [{
                        key: params.key,
                        title: "まだ１件も保存されていません",
                        url: null
                    }]
                }
            })
        const url = _.chain(data.albums)
            .where({ key: params.key })
            .pluck("url")
            .value()
        const title = _.chain(data.albums)
            .where({ key: params.key })
            .pluck("title")
            .value()
        const slides = _.isNull(url[0])
        ? [
            { id: 0, body: "表示できる作品がありません" }
        ]
        : await app.$axios.get(url[0])
            .then(res => {
                // console.log(res.data)
                return res.data
            })
            .catch(error => {
                console.error(error)
                return [
                    { id: 0, body: "表示できる作品がありません" }
                ]
            })
        return {
            data: data,
            key: params.key,
            title: title[0],
            slides: slides,
        }
    },
    computed: {
        config () {
            return {
                footer: false,
                formats: ["csv", "txt"],
                filename: this.title,
                exportButtons: true,
                bootstrap: true,
                trimWhitespace: true
            }
        },
        parsed () {
            return _.map(this.slides, (el, idx) => {
                return {
                    id: _.isUndefined(el.id) ? idx : el.id,
                    body: _.isUndefined(el.body) ? "" : el.body
                }
            })
        },
        link () {
            return `/albums/${this.data.id}`
        },
        noteLink () {
            return `https://note.com/intent/post?url=https://madokatanka.herokuapp.com/albums/${this.data.id}/${this.key}/&hashtags=madokatanka`
        }
    },
    mounted () {

        this.mySwiper(this.parsed)

        const cb = new ClipboardJS(".clip")
        cb.on("success", e => {
            if (process.client) {
                this.$vs.notify({
                    time: 4000,
                    title: "クリップボードにコピーしました",
                    text: e.text,
                    color: "primary",
                    icon: "info"
                })
            }
        })

        if (_.isUndefined(this.tableExport)) {
            if (process.browser) {
                this.$nextTick(function () {
                    const grid = this.$el.querySelector("#grid")
                    this.tableExport = $(grid).tableExport(this.config)
                })
            }
        } else {
            this.$nextTick(function () {
                this.tableExport.update(this.config)
            })
        }

    }
}
</script>

<style scoped>
    div {
        padding: 1em;
    }
    .csv:before, .txt:before, .xls:before, .xlsx:before {
        background: none;
        box-shadow: none;
    }
</style>