import Vue from 'vue';

const hamburgerMenu = {
  props:["current"],
  template: "#hamburger-menu",
  methods: {
    close(){
      this.$emit("close");
    }
  }
}


new Vue({
  el: "#hamburger-component",
  template: "#hamburger",
  components: {
    hamburgerMenu
  },
  data() {
    return{
      current: false
    }
  },
  methods:{
    open(){
      this.current = true;
    },
    close(){
      this.current = false;
    }
  }
})