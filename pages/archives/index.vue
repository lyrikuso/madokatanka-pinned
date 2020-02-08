<template>
<div>

    <header>
        <h1>
            <nuxt-link to="/">まどか短歌会</nuxt-link>
        </h1>
        <vs-breadcrumb>
            <li><nuxt-link to="/" title="Home">Home</nuxt-link><span class="vs-breadcrum--separator">/</span></li>
            <li aria-current="page" class="active">Archives</li>
        </vs-breadcrumb>
    </header>

    <section>
        <div>
            <h2>Archives</h2>
            <ul>
                <li v-for="(item, index) in months" :key="index">
                    <nuxt-link :to="links[index]">{{ format[index] }}</nuxt-link>
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
                        "@id": "https://madokatanka.herokuapp.com/archives",
                        "name": "Archives - まどか短歌会"
                    }
                }],
        }
        return {
            __dangerouslyDisableSanitizers: ["script"],
            title: "Archives",
            script: [
                {
                    innerHTML: JSON.stringify(structuredData),
                    type: "application/ld+json"
                }
            ]
        }
    },
    middleware: ["setLocale"],
    components: {
        "socials": socials
    },
    data () {
        return {
            months: [moment()]
        }
    },
    computed: {
        format () {
            return _.map(this.months, el => {
                return el.format("MMM YYYY")
            })
        },
        links () {
            return _.map(this.months, el => {
                return `/archives/${el.format("YYYYMM")}`
            })
        }
    },
    mounted () {

        this.months = [
            moment().subtract(1, "M"),
            moment().subtract(2, "M"),
            moment().subtract(3, "M"),
            moment().subtract(4, "M"),
            moment().subtract(5, "M"),
            moment().subtract(6, "M")
        ]

    }
}
</script>

<style scoped>
    div {
        padding: 1em;
    }
</style>