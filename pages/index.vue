<template>
<div>

    <header>
        <h1>
            <nuxt-link to="/">まどか短歌会</nuxt-link>
        </h1>
    </header>

    <section>
        <div class="underlined">
            <h2>About Us</h2>
            <p>
                まどか短歌会はインターネット上でのみ活動する、実体のない短歌会です。誰でも参加できますが、投稿された作品は誰が投稿したものかわからないように公開されます。
            </p>
        </div>
        <div class="underlined">
            <h2>Post</h2>
            <p>
                作品は<nuxt-link to="/post/tanka">こちら</nuxt-link>から投稿できます。投稿された作品は月ごとにひとつのページにまとめられて公開されます。
            </p>
        </div>
        <div class="underlined">
            <h2>Archives</h2>
            <p>
                過去に投稿された作品は<nuxt-link to="/archives">こちら</nuxt-link>からご覧いただけます。
            </p>
        </div>
        <div class="underlined">
            <h2>Report Abuse</h2>
            <p>
                サイトの性質上、自分の作品を断りなく投稿されるといった事態が起こりえます。作品が権利を侵害するものであると判断した場合には、<nuxt-link to="/post/abuse">こちら</nuxt-link>から公開済みの作品のIDを報告してください。<wbr>
                報告された作品は原則として確認なく削除します（虚偽の報告をするなどの濫用はお控えください）。
            </p>
        </div>
        <div class="underlined">
            <h2>Albums</h2>
            <p>
                <nuxt-link to="/post/albums">こちら</nuxt-link>から作品のデータをJSONで返すURLを指定することで、作品を公開するためのURLを発行できます。利用するにはGoogleアカウントでサインアップする必要があります。<nuxt-link to="/privacy">プライバシーポリシー</nuxt-link>を確認のうえ、ご利用ください。
            </p>
        </div>
        <div class="underlined">
            <h2>Socials</h2>
            <p>
                <nuxt-link to="/twitter">Twitter</nuxt-link>をやっています。DMを開放していますので、管理者にコンタクトを取りたい方は<a href="https://twitter.com/madokatanka" target="_new">@madokatanka</a>にご連絡ください。
            </p>
        </div>
    </section>

    <footer>
        <socials class="padding"></socials>
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
            "@type": "WebSite",
            "url": "https://madokatanka.herokuapp.com/",
            "name": "まどか短歌会"
        }
        return {
            __dangerouslyDisableSanitizers: ["script"],
            titleTemplate: "まどか短歌会",
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
    asyncData ({ query }) {
        return {
            redirected: (query.redirect === "true") ? true : false
        }
    },
    mounted () {
        if (this.redirected) {
            this.$vs.notify({
                time: 4000,
                title: "公開されていないページです",
                text: "",
                color: "warning",
                icon: "info"
            })
        }
    }
}
</script>

<style scoped>
    .underlined {
        padding: 1em;
        border-bottom: solid 1px #fafafa;
     }
     .padding {
        padding: 1em;
     }
</style>
