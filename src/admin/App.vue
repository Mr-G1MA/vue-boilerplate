<template lang="pug">
  .app-container
    headLine
      userCurrent
    pageSelector
    .page-content-wrapper
      .page-content
        .container
          .page-content__header
            .page-content__title Page "About"
            iconedBtn(type="iconed" title="Add group" v-if="emptyGroup == false" @click="emptyGroup = true")
          ul.groups
            li.groups__item(v-if="emptyGroup")
              group(@remove="emptyGroup = false" empty)
            li.groups__item(v-for="item in groups" :key="item.id")
              group(
                :title="item.group" 
                :skillsArray="item.skills"
              )
</template>

<script>
import headLine from "./components/headLine";
import userCurrent from "./components/userCurrent";
import pageSelector from "./components/pageSelector";
import button from "./components/button";
import group from "./components/group";

export default {
  data() {
    return {
      groups: [],
      emptyGroup: false,
    }
  },
  created() {
    this.groups = require("./data/groups.json");
  },
  components : {
    headLine,
    userCurrent,
    pageSelector,
    iconedBtn: button,
    group,
  }
}
</script>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss">
  
</style>