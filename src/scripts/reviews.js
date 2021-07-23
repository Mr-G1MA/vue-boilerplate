import Vue from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import axios from 'axios';

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

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
    },
    changeParamNext (){
      this.activeBtn = 2;
      this.sliderOptions.allowSlideNext = false;
    },
    changeParamPrev (){
      if (this.activeBtn == 0){
        this.activeBtn = 1;
        this.sliderOptions.allowSlidePrev = false;
      }
      else{
        this.activeBtn = 1;
      }
    }
  },
  async created() {
    const { data } = await axios.get("/reviews/484");
    this.reviews = data;
  },
  mounted(){
    this.resize();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.resize);
  }
});