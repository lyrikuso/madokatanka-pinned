<template>
  <div>
    <client-only>
      <div class="flex">
        <div
          ref="nehan"
          class="pull"
          style="height: 90vh;"
          role="presentation"
          v-nehan="display"
        ></div>
      </div>
    </client-only>
  </div>
</template>

<script>
  import * as Nehan from "nehan";

  export default {
    props: ["item"],
    directives: {
      nehan: {
        bind(el, binding, vnode) {
          vnode.context.$nextTick(() => {
            if (vnode.context.checkHTML(binding.value)) {
              const rows = binding.value.split("\n");
              const item = _.reduce(
                rows,
                (memo, row) => {
                  return (
                    memo +
                    vnode.context.compiled({
                      row: row,
                    })
                  );
                },
                ""
              );
              new Nehan.PagedHtmlDocument(
                vnode.context.wrapper({
                  item: item,
                }),
                {
                  styleSheets: [
                    Nehan.SemanticStyle.create({
                      all: true,
                    }),
                    new Nehan.CssStyleSheet({
                      body: {
                        display: "inline-block",
                        writingMode: "vertical-rl",
                        measure: $(el).height(),
                      },
                      ".serif": {
                        "font-family":
                          "'Noto Serif JP', 'Yu Mincho', YuMincho, 'Hiragino Mincho ProN', 'Hiragino Mincho Pro', 'HGP明朝B', sans-serif",
                        color: "#dbdbdb",
                      },
                    }),
                  ],
                }
              ).render({
                onPage: (ctx) => {
                  const evaluatedPage = ctx.caller.getPage(ctx.page.index);
                  $(vnode.context.$refs.nehan).html(evaluatedPage.dom);
                },
              });
            } else {
              return null;
            }
          });
        },
        update(el, binding, vnode) {
          vnode.context.$nextTick(() => {
            if (vnode.context.checkHTML(binding.value)) {
              const rows = binding.value.split("\n");
              const item = _.reduce(
                rows,
                (memo, row) => {
                  return (
                    memo +
                    vnode.context.compiled({
                      row: row,
                    })
                  );
                },
                ""
              );
              new Nehan.PagedHtmlDocument(
                vnode.context.wrapper({
                  item: item,
                }),
                {
                  styleSheets: [
                    Nehan.SemanticStyle.create({
                      all: true,
                    }),
                    new Nehan.CssStyleSheet({
                      body: {
                        display: "inline-block",
                        writingMode: "vertical-rl",
                        measure: $(el).height(),
                      },
                      ".serif": {
                        "font-family":
                          "'Noto Serif JP', 'Yu Mincho', YuMincho, 'Hiragino Mincho ProN', 'Hiragino Mincho Pro', 'HGP明朝B', sans-serif",
                        color: "#dbdbdb",
                      },
                    }),
                  ],
                }
              ).render({
                onPage: (ctx) => {
                  const evaluatedPage = ctx.caller.getPage(ctx.page.index);
                  $(vnode.context.$refs.nehan).html(evaluatedPage.dom);
                },
              });
            } else {
              return null;
            }
          });
        },
      },
    },
    computed: {
      display() {
        if (_.isUndefined(this.item)) {
          return "";
        } else {
          return this.item.body;
        }
      },
      wrapper() {
        return _.template(`<div><%= item %></div>`);
      },
      compiled() {
        return _.template(`<h4 class="serif"><%= row %></h4>`);
      },
    },
    methods: {
      checkHTML(html) {
        const doc = document.createElement("div");
        doc.innerHTML = html;
        return doc.innerHTML === html;
      },
    },
  };
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
    -webkit-transform: translate(-46%);
    -ms-transform: translate(-46%);
    transform: translate(-46%);
  }
</style>
