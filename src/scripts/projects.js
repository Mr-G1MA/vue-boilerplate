import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

const projectsBtns = {
  props: ["current", "projects"],
  template: "#projects-btns",
  methods: {
    go(dir){
      this.$emit("go", dir);
    }
  }
}

const Tags = {
  props: ["tags"],
  template: "#projects-tags",
}

const previewRoll = {
  props: ["current", "projects"],
  template: "#projects-preview-roll",
  components: {
    projectsBtns,
  },
  methods: {
    go(dir){
      this.$emit("go", dir);
    },
    goTo(index){
      this.$emit("goTo", index);
    }
  }
}

const currentPreview = {
  props: ["current", "projects", "currentIndex"],
  template: "#projects-current-preview",
  components: {
    previewRoll,
  },
  methods: {
    go(dir){
      this.$emit("go", dir);
    },
    goTo(index){
      this.$emit("goTo", index);
    }
  }
};


new Vue({
  el: "#projects-component",
  template: "#projects",
  components: {
    currentPreview,
    Tags,
  },
  data() {
    return{
      projects : [],
      currentIndex: 0,
      tagsRes : [],
      current : {}
    }
  },
  methods: {
    go(dir){
      switch (dir) {
        case "next":
          if (this.currentIndex + 1 >= this.projects.length){

          } 
          else{
            this.currentIndex++;
          }
          break;
        case "prev":
          if (this.currentIndex - 1 < 0){

          } 
          else{
            this.currentIndex--;
          }
          break;
      }
    },
    goTo(index){
      this.currentIndex = index;
    }
  },
  watch : {
    currentIndex : {
      handler(val){
        this.tagsRes = this.projects[this.currentIndex].techs.split(",");
        this.current = this.projects[this.currentIndex];
      }
    }
  },
  async beforeMount(){
    const { data } = await axios.get("/works/484");
    this.projects = data;
    this.tagsRes = this.projects[0].techs.split(",");
    this.current = this.projects[0];
  }
})