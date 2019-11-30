<template>
    <div>
        <client-only>
            <div class="flex">
                <div ref="nehan" class="pull" style="height: 90vh" role="presentation" v-nehan="display"></div>
            </div>
        </client-only>
    </div>
</template>

<script>
export default {
    data () {
        return {
            nehan: undefined
        };
    },
    props: [
        "item"
    ],
    mounted () {
        const nehan = new Nehan.Document();
        this.nehan = nehan;
    },
    directives: {
        nehan: {
            bind (el, binding, vnode) {
                vnode.context.$nextTick(() => {
                    if (vnode.context.checkHTML(binding.value)) {
                        const rows = binding.value.split("\n");
                        const item = _.reduce(rows, (memo, row) => { return memo + vnode.context.compiled({ row: row }) }, "");
                        vnode.context.nehan.setContent(vnode.context.wrapper({ item: item }));
                        vnode.context.nehan.setStyle("body", {
                            display: "inline-block",
                            flow: "tb-rl",
                            height: $(el).height()
                        });
                        vnode.context.nehan.setStyle(".serif", {
                            "font-family": "'Noto Serif JP', 'Yu Mincho', YuMincho, 'Hiragino Mincho ProN', 'Hiragino Mincho Pro', 'HGP明朝B', sans-serif"
                        });
                        vnode.context.nehan.render({
                            onPage: (page, ctx) => {
                                $(vnode.context.$refs.nehan).html(page.element);
                            }
                        });
                    } else {
                        return null;
                    }
                });
            }
        }
    },
    computed: {
        display () {
            if (_.isUndefined(this.item)) {
                return "";
            } else {
                return this.item.body;
            }
        },
        wrapper () {
            return _.template(`<div class="disp-iblock"><%= item %></div>`);
        },
        compiled () {
            return  _.template(`<h6 class="serif"><%= row %></h6>`);
        }
    },
    methods: {
        checkHTML (html) {
            const doc = document.createElement("div");
            doc.innerHTML = html;
            return ( doc.innerHTML === html );
        }
    }
}
</script>

<style scoped>
    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 90vh;
    }
    .pull {
        text-align: center;
        -webkit-transform: translate(-49%);
        -ms-transform: translate(-49%);
        transform: translate(-49%);
    }
</style>