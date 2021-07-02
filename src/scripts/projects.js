import Vue from 'vue';

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

const projectsText = {
  props: ["current"],
  template: "#projects-text",
  components: {
    Tags,
  },
  computed: {
    tagsArr(){
      return this.current.skills.split(",");
    }
  }
}


new Vue({
  el: "#projects-component",
  template: "#projects",
  components: {
    currentPreview,
    projectsText,
  },
  data() {
    return{
      projects : [],
      currentIndex: 0
    }
  },
  methods: {
    requireImagesToArray(projectsArr) {
      return projectsArr.map((item) => {
        const requiredImage = require(`../images/content/${item.image}`).default;
        item.image = requiredImage;
        return item;
      });
    },
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
  computed: {
    current(){
      return this.projects[this.currentIndex];
    }
  },
  created(){
    const projectsArr = require("../data/projects.json");
    this.projects = this.requireImagesToArray(projectsArr);
  }
})