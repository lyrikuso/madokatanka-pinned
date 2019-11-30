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
    directives: {
        sharethis: {
            bind (el,binding,vnode) {
                const doc = document.createElement("div");
                doc.innerHTML = binding.value;
                const text = (binding.value !== "") ? $(doc).text() + "／" + document.title : document.title;
                $(el).jsSocials({
                    shareIn: "popup",
                    showCount: false,
                    showLabel: false,
                    text: text,
                    shares: ["facebook", { share: "twitter", hashtags: "madokatanka" }, "line", "hatena"]
                });
            }
        }
    },
    computed: {
        text () {
            return _.isUndefined(this.context) ? "" : this.context
        }
    }
}
</script>