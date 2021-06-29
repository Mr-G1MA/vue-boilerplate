import Vue from 'vue';

const skillsItem = {
  props: ["skill"],
  template: "#skills-item",
  mounted (){
    const circle = this.$refs["colored-circle"];
    circle.style.strokeDashoffset = this.skill.dash;
  }
}

const skillsRow = {
  props: ["item"],
  template: "#skills-row",
  components: {
    skillsItem,
  },
};


new Vue({
  el: "#skills-component",
  template: "#skills",
  components: {
    skillsRow,
  },
  data() {
    return{
      skills : []
    }
  },
  created() {
    this.skills = require("../data/skills.json")
  }
})