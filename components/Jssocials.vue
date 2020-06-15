<template>
    <div>
        <client-only>
            <div v-sharethis="text" class="px-2"></div>
        </client-only>
    </div>
</template>

<script>
// require jquery, jsSocial
export default {
    props: [
        "context"
    ],
    data () {
        return {
            title: ""
        }
    },
    directives: {
        sharethis: {
            inserted (el,binding,vnode) {
                vnode.context.$nextTick(() => {
                    $(el).jsSocials({
                        shareIn: "popup",
                        showCount: false,
                        showLabel: false,
                        text: binding.value,
                        shares: ["facebook", { share: "twitter", via: "madokatanka", hashtags: "madokatanka" }, "line", "hatena"]
                    })
                })
            }
        }
    },
    computed: {
        text () {
            if (process.client) {
                const context = _.isUndefined(this.context) ? "" : this.context
                const doc = document.createElement("div");
                doc.innerHTML = context
                const text = (context !== "") ? $(doc).text() + "／" + this.title : this.title
                return text
            } else {
                return ""
            }
        }
    },
    mounted () {
        if (process.client) {
            this.$data.title = this.$el.ownerDocument.title
        }
    }
}
</script>