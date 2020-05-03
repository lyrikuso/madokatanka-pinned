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
                まどか短歌会はインターネット上でのみ活動する、実体のない短歌会（短歌×ナラティヴコミュニティ）です。誰でも参加できますが、投稿された作品は誰が投稿したものかわからないように公開されます。
            </p>
            <vs-collapse>
                <vs-collapse-item>
                    <div slot="header">
                        Concepts
                    </div>
                    <div>
                        <h3>なぜ、短歌×ナラティヴコミュニティなのか</h3>
                        <p class="padding">
                            参加者の「語り」をベースにして何らかの目的をもった活動をするコミュニティをナラティヴコミュニティといいます。詳細は<a href="http://kainishii.hatenablog.com/entry/2019/09/27/200553" target="_blank" rel="noopener noreferrer">こういった記事</a>を読んでもらうとして、イメージとしては自分の経験や感じたことを共有することで、考えを整理したり、何らかの課題の解決策を探ったりするグループワークを想像すればだいたい合っていると思われます。
                        </p>
                        <p class="padding">
                            従来の短歌を軸にしたコミュニティである「歌会」は、基本的に短歌のよしあしについて話し合ったり、アドバイスをしあったりする場であることがほとんどです。それらは短歌がうまくなりたいという思いをもっている人にとっては有益な機会ですが、自分の思いや考えを他者と共有したりすることに関心をもっている人にとっては必ずしも適切な場ではありません。
                        </p>
                        <p class="padding">
                            また、一般的なナラティヴコミュニティは、設定されたテーマをもとに自由に語ることができる場合が多いものです。しかし、たとえ誰かに話したいと思っていることであっても、いざ自由な形式で語ろうとすると案外難しく感じられてしまうこともあります。その点、自分の思いを短歌のような決められた形式で表現してしまうことは、誰かに伝えたいことをことばにするためのよい取っかかりになるものだと思います。
                        </p>
                        <p class="padding">
                            このような事情から、短歌を足がかりにして自分の思いや考えていることを表現し、そこから対話を展開するようなナラティヴコミュニティには一定の需要があるのではないかと考えています。
                        </p>
                    </div>
                </vs-collapse-item>
                <vs-collapse-item>
                    <div slot="header">
                        How to Join Us
                    </div>
                    <div>
                        <h3>参加の仕方</h3>
                        <p class="padding">
                            投稿ページから自作の短歌を投稿してください。作品は投稿された月ごとにまとめられて公開されます。作品は誰でも投稿できますが、コメントを残すには<a href="https://disqus.com/" target="_blank" rel="noopener noreferrer">Disqus</a>にサインアップする必要があります。
                        </p>
                        <h3>コメントの投稿について</h3>
                        <p class="padding">
                            短歌に詠みこまれていることについて、そのときの背景や状況として連想されたこと、そうしたことについて自分だったらどう思うかなど自由に書いてください。
                        </p>
                        <p class="padding">
                            コメント時の注意点として、まどか短歌会のナラティヴコミュニティという性質に配慮したうえで内容を考えるようにしてください。まどか短歌会では、作品を語りとして「受けとめる」という体験を重要視しています。そのため、たとえば作品の内容について「そんなことを考えるなんておかしい」とか「あなたの考え方は間違っている」などと否定的に決めつけるようなコメントはしないようにしてください。また、まどか短歌会は一般的な歌会のように、短歌のよしあしについて「評」をしあう場ではありません。そのため、短歌の表現について、たとえばリズムがよいだとか比喩が巧みだなどと指摘するのではなく、投稿した人の語りについてあなたがどう思ったのかをコメントしてください。
                        </p>
                        <p class="padding">
                            また、スレッド内のコメントについて言及することにとくにルールは設けませんが、他の人のコメントについても、その人の語りとしてまず「受けとめる」という態度を大事にしてください。
                        </p>
                    </div>
                </vs-collapse-item>
            </vs-collapse>
        </div>
        <div class="underlined">
            <h2>Post</h2>
            <p>
                作品は<nuxt-link to="/post/tanka">こちら</nuxt-link>から投稿できます。投稿された作品は月ごとにひとつのページにまとめられて公開されます。なお、投稿する短歌は既発表・未発表を問いませんが、まどか短歌会に投稿した時点で既発表扱いになる点に注意してください。また、短歌にかぎらず、他者の著作権やその他の権利を侵害するような投稿はやめましょう。
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
            <h2>Discussion</h2>
            <section>
                <vue-disqus shortname="madokatanka"></vue-disqus>
            </section>
        </div>
    </section>

    <footer>
        <vs-collapse>
            <vs-collapse-item>
                <div slot="header">
                    Follow us on <a href="https://twitter.com/madokatanka" target="_blank" rel="noopener">Twitter@madokatanka</a>
                </div>
                <div v-twitter-widgets>
                    <a class="twitter-timeline" data-chrome="noheader, nofooter, noscrollbar" data-tweet-limit="6" href="https://twitter.com/madokatanka"></a>
                </div>
            </vs-collapse-item>
        </vs-collapse>
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
