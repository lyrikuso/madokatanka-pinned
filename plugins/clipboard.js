export default {
  methods: {
    on_copy(e) {
      this.$vs.notify({
        time: 4000,
        title: "クリップボードにコピーしました",
        text: e.text,
        color: "primary",
        icon: "info",
      });
    },
  },
};
