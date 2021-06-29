import Vue from 'vue';

const projectsBtns = {
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
  },
  computed : {
    sliced(){
      const works = [...this.projects]
      return works.slice(0, 4);
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
      const lastItem = this.projects[this.projects.length - 1];
      switch (dir) {
        case "next":
          this.projects.push(this.projects[0]);
          this.projects.shift();
          if (this.currentIndex + 1 >= this.projects.length){
            this.currentIndex = 0;
          } 
          else{
            this.currentIndex++;
          }
          break;
        case "prev":
          this.projects.unshift(lastItem);
          this.projects.pop();
          if (this.currentIndex - 1 < 0){
            this.currentIndex = this.projects.length - 1;
          } 
          else{
            this.currentIndex--;
          }
          break;
      }
    },
    goTo(index){
      while (index > 0){
        this.projects.push(this.projects[0]);
        this.projects.shift();
        if (this.currentIndex + 1 >= this.projects.length){
          this.currentIndex = 0;
        } 
        else{
          this.currentIndex++;
        }
        index--;
      }
    }
  },
  computed: {
    current(){
      return this.projects[0];
    }
  },
  created(){
    const projectsArr = require("../data/projects.json");
    this.projects = this.requireImagesToArray(projectsArr);
  }
})