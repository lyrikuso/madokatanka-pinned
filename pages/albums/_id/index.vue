<template>
<div>

    <header>
        <h1>
            <nuxt-link to="/">まどか短歌会</nuxt-link>
        </h1>
        <vs-breadcrumb>
            <li><nuxt-link to="/" title="Home">Home</nuxt-link><span class="vs-breadcrum--separator">/</span></li>
            <li aria-current="page" class="active">{{ data.name }}の短歌</li>
        </vs-breadcrumb>
    </header>

    <section>
        <div>
            <h2>Albums</h2>
            <ul>
                <li v-for="(item, index) in data.albums" :key="index">
                    <nuxt-link :to="links[index]">{{ item.title }}</nuxt-link>
                </li>
            </ul>
        </div>
    </section>

    <footer>
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
import nanoid from "nanoid"
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
                }],
        }
        return {
            __dangerouslyDisableSanitizers: ["script"],
            title: `${this.data.name}の短歌`,
            script: [
                {
                    innerHTML: JSON.stringify(structuredData),
                    type: "application/ld+json"
                }
            ]
        }
    },
    components: {
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
                            key: nanoid(5),
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
                        key: nanoid(5),
                        title: "まだ１件も保存されていません",
                        url: null
                    }]
                }
            })
        return {
            data: data
        }
    },
    computed: {
        links () {
            return _.map(this.data.albums, el => {
                return `/albums/${this.data.id}/${el.key}`
            })
        }
    }
}
</script>

<style scoped>
    div {
        padding: 1em;
    }
</style>