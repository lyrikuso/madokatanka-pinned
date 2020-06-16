import Swiper from "swiper";
export default {
  data() {
    return {
      swiper: undefined,
      virtualData: {
        offset: undefined,
        from: undefined,
        to: undefined,
        slides: [],
      },
    };
  },
  methods: {
    mySwiper(slides) {
      if (this.swiper !== undefined) {
        this.swiper = this.swiper.destroy();
      }
      this.swiper = new Swiper("#swiper", {
        loop: false,
        freeMode: true,
        virtual: {
          slides: slides,
          cache: false,
          renderExternal: (slides) => {
            this.virtualData = {
              offset: slides.offset,
              from: slides.from,
              to: slides.to,
              slides: slides,
            };
          },
          addSlidesAfter: slides.length,
        },
        slidesPerRow: 1,
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          hideOnClick: true,
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        on: {
          init: () => {
            console.info("Swiper instance initialized");
          },
        },
      });
    },
  },
};
