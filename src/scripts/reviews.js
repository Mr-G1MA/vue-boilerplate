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
      activeBtn: 1,
      num: -1,
      sliderOptions: {
        slidesPerView: 2,
        loop: false,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      otherSliderOptions: {
        slidesPerView: 1,
        loop: false,
        allowSlideNext: true,
        allowSlidePrev: true
      },
      resizeable: true
    };
  },
  computed: {
    slider() {
      if (this.resizeable){
        return this.$refs["slider"].$swiper;
      }
      else {
        return this.$refs["otherSlider"].$swiper;
      }
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
    },
    change(){
      if (this.sliderOptions.allowSlideNext&&this.sliderOptions.allowSlidePrev){
        this.activeBtn = 0;
      }
      this.sliderOptions.allowSlideNext = true;
      this.sliderOptions.allowSlidePrev = true;
      console.log(this.activeBtn);
    },
    changeParamNext (){
      this.activeBtn = 2;
      this.sliderOptions.allowSlideNext = false;
    },
    changeParamPrev (){
      if (this.num !== -1){
        this.activeBtn = 1;
        this.sliderOptions.allowSlidePrev = false;
      }
      else{
        this.activeBtn = 1;
      }
      this.num++;
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