import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = "https://webdev-api.loftschool.com/";

const skillsItem = {
  props: ["skill"],
  template: "#skills-item",
  mounted (){
    const circle = this.$refs["colored-circle"];
    circle.style.strokeDashoffset = 251 - (this.skill.percent / 100) * 251;
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
  async created() {
    const { data } = await axios.get("/categories/484");
    this.skills = data;
  }
})