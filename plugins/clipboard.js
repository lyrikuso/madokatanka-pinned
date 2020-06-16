export default {
  data() {
    return {
      cb: undefined,
    };
  },
  mounted() {
    this.cb = new ClipboardJS(".clip");
    this.cb.on("success", (e) => {
      if (process.client) {
        this.$vs.notify({
          time: 4000,
          title: "クリップボードにコピーしました",
          text: e.text,
          color: "primary",
          icon: "info",
        });
      }
    });
  },
};
