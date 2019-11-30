<template>
<div>

    <header>
        <h1>
            <nuxt-link to="/">まどか短歌会</nuxt-link>
        </h1>
        <vs-breadcrumb>
            <li><nuxt-link to="/" title="Home">Home</nuxt-link><span class="vs-breadcrum--separator">/</span></li>
            <li aria-current="page" class="active">Twitter</li>
        </vs-breadcrumb>
    </header>

    <section>
        <div v-twitter-widgets class="bg-white">
            <a class="twitter-timeline" data-chrome="noheader, nofooter, noscrollbar" data-tweet-limit="8" href="https://twitter.com/madokatanka"></a>
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
                        "@id": "https://madokatanka.herokuapp.com/twitter",
                        "name": "Twitter - まどか短歌会"
                    }
                }],
        }
        return {
            __dangerouslyDisableSanitizers: ["script"],
            title: "Twitter",
            script: [
                {
                    innerHTML: JSON.stringify(structuredData),
                    type: "application/ld+json"
                }
            ]
        }
    }
}
</script>

<style scoped>
    .bg-white {
        padding: 1em;
        background-color: #fafafa;
    }
</style>