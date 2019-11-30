<template>
<div>
    <header>
        <h1>
            <nuxt-link to="/">まどか短歌会</nuxt-link>
        </h1>
        <vs-breadcrumb>
            <li><nuxt-link to="/" title="Home">Home</nuxt-link><span class="vs-breadcrum--separator">/</span></li>
            <li aria-current="page" class="active">Generator</li>
        </vs-breadcrumb>
    </header>

    <section>
        <div class="padding">
            <h2>Generator</h2>
            <p>入力されたフレーズを詠み込んで短歌のようなものを生成します。</p>
            <p>好きな言葉を入力すると、その言葉が含まれる名詞・修飾部・述部をサジェストします。<wbr /> 「名詞」「修飾部」「述部」と入力すると一覧をサジェストします。また「3」「7」などと入力するとその音数の語彙をサジェストします。</p>
            <p>デフォルトで登録されている語彙は<a href="http://sasakiarara.com/sizzle/" target="_blank" rel="noopener">短歌自動生成装置「犬猿」（星野しずる）</a>に収録されている語彙を借りたものです。</p>
        </div>
    </section>

    <section>
        <form @submit.stop>
            <div class="padding">
                <label for="textArea">フレーズ</label>
                <div>
                    <input id="fdatalist" type="text" rows="3" minlength="1" maxlength="30" placeholder="30字まで入力できます" required>
                </div>
            </div>
            <div class="padding">
                <div class="pull-right">
                    <button @click.prevent="generate"><i class="fa fa-plus-square fa-fw" aria-hidden="true"></i></button>
                    <button @click.prevent="regenerate"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i></button>
                </div>
            </div>
            <div class="clearfix"></div>
        </form>
    </section>

    <section>
        <div class="padding" ref="panel"></div>
        <div class="padding">
            <p>この短歌ジェネレーターはインターネットから独自に収集した短歌をもとにして作品を生成しているため、もとになった短歌の一部がそのままのかたちで出現することがあります。生成される作品の自作発言等はご遠慮ください。</p>
        </div>
    </section>

    <footer>
        <socials class="padding"></socials>
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
                        "@id": "https://madokatanka.herokuapp.com/playground/generator",
                        "name": "Generator - まどか短歌会"
                    }
                }],
        }
        return {
            __dangerouslyDisableSanitizers: ["script"],
            title: "Generator",
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
    data () {
        return {
            text: "",
            keyphrase: {}
        }
    },
    asyncData ({ app, params }) {
        return app.$axios.get("/webhooks/vocab")
            .then(res => {
                return {
                    phrases: res.data.vocab
                }
            })
            .catch(error => {
                console.error(error.response)
                return {
                    phrases: []
                }
            })
    },
    methods: {
        createPoem (keyphrase) {
            $.ajax("/webhooks/poem",
            {
                type: "post",
                data: keyphrase,
                dataType: "json",
                timeout: 10000,
                dataFilter: (data, type) => { console.log(data)
                    return data
                },
                success: (data, dataType) => {
                    if (_.isError(data)) {
                        console.error(data)
                    } else {
                        const poems = [_.object(["text"], [data.info])]
                        const template = _.template(`<div class="hiddenfirst" style="display:none"><p><%= text %></p></div>`)
                        $.each(poems,
                            (index, elem) => {
                                const tmp = template(elem)
                                $(this.$refs.panel).prepend(tmp)
                                $(".hiddenfirst").fadeIn("fast")
                            }
                        )
                    }
                },
                complete: () => {
                    // console.log("Created")
                }
            })
        },
        generate () {
            const self = this
            const sep = $("#fdatalist").val()
            this.text = sep.replace(/;/g, "")
            this.$v.text.$touch()
            if (!this.$v.text.$invalid) {
                $.when(
                    $.ajax("https://kuromoji-now.paithiov909.now.sh/api/pronunce",
                    {
                        type: "post",
                        data: { sentence: self.$v.text.$model },
                        dataType: "json",
                        timeout: 15000,
                        dataFilter: (data, type) => {
                            return data
                        },
                        success: (data, dataType) => {
                            if (_.isError(data)) {
                                console.error(data)
                            } else {
                                const surfaces = _.map(data.info,
                                    obj => {
                                        return obj.surface
                                    }
                                )
                                const phraselast = _.last(surfaces)
                                const phrase = _.reduce(surfaces, (memo, str) => { return memo.concat(str) })
                                const rlengths = _.map(data.info,
                                    obj => {
                                        return obj.rlength
                                    }
                                )
                                const mora = _.reduce(rlengths, (memo, num) => { return memo + num }, 0)
                                self.keyphrase = { phraselast: phraselast, phrase: phrase, mora: mora }
                            }
                        },
                        error: (xhr, status, err) => {
                            console.error(status)
                        }
                    })
                ).done(function () {
                    self.$gtag("event", "click", {
                        event_category: "generate",
                        event_label: "generator"
                    })
                    self.createPoem(self.keyphrase)
                })
            } else {
                // console.log(this.$v.text.$invalid)
            }
        },
        regenerate () {
            if (!_.isEmpty(this.keyphrase)) {
                this.$gtag("event", "click", {
                    event_category: "regenerate",
                    event_label: "generator"
                })
                this.createPoem(this.keyphrase)
            }
        }
    },
    validations: {
        text: {
            required,
            maxLength: maxLength(30)
        }
    },
    mounted () {
        if (process.browser) {
            $("#fdatalist").flexdatalist({
                data: this.phrases,
                multiple: true,
                searchContains: true,
                searchByWord: true,
                groupBy: "mora",
                searchIn: ["word", "type", "mora"],
                visibleProperties: ["word", "type", "mora"],
                textProperty: "word",
                valueProperty: "word",
                allowDuplicateValues: true,
                minLength: 1,
                valuesSeparator: ";"
            })
        }
    }
}
</script>

<style scoped>
    .pull-right {
        float: right;
    }
    .clearfix {
        clear: both;
    }
    .padding {
        padding: 1em;
    }
</style>
