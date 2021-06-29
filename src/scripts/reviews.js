import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

new Vue({
  el: "#reviews-slider-component",
  template: "#reviews-slider",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: 2,
        loop: true
      },
      otherSliderOptions: {
        slidesPerView: 1,
        loop: true
      },
      resizeable: true
    };
  },
  computed: {
    slider() {
      return this.$refs["slider"].$swiper;
    },
  },
  methods: {
    requireImagesToArray(data) {
      return data.map((item) => {
        item.image = require(`../images/content/${item.image}`).default;
        return item;
      });
    },
    slide(dir) {
      switch (dir) {
        case "next":
          this.slider.slideNext();
          break;
        case "prev":
          this.slider.slidePrev();
          break;
      }
    },
    resize(){
      if (window.matchMedia("(min-width: 480px)").matches) {
        this.resizeable = true;
      } else {
        this.resizeable = false;
      }
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
  },
  mounted(){
    this.resize();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.resize);
  }
});