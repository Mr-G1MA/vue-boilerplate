<template lang="pug">
  .groupSkill-component(v-if="currentSkill.editMode == false")
    .groupSkill__title {{skill.title}}
    .groupSkill__percent.percent-symbol {{skill.percent}}
    .groupSkill__buttons 
      icon.groupSkill-btn(symbol="pencil" grayscale @click="currentSkill.editMode = true")
      icon.groupSkill-btn(symbol="trash" grayscale @click="$emit('remove', currentSkill)")
  .groupSkill-component(v-else)
    .groupSkill__title.active-title
      skillInput(:errorMessage="errorMsgTitle" v-model="currentSkill.title" noSidePaddings)
    .groupSkill__percent
      skillInput(:errorMessage="errorMsgPercent" v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3")
    icon.groupSkill-btn(symbol="tick" @click="valid")
    icon.groupSkill-btn(symbol="cross" @click="currentSkill.editMode = false")
</template>

<script>
import input from "../input";
import icon from "../icon";

export default {
  props: {
    skill: {
      type: Object,
      default : () => {},
      required: true
    }
  },
  components:{
    icon,
    skillInput: input
  },
  data() {
    return {
      currentSkill: {
        editMode: false,
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent,
        category: this.skill.category
      },
      errorMsgTitle : "",
      errorMsgPercent: ""
    }
  },
  watch : {
    currentSkill : {
      handler(val){
        if (val.title.trim().length !== 0){
          this.errorMsgTitle = "";
        }

        if (val.percent){
          this.errorMsgPercent = "";
        }
      },
      deep: true
    }
  },
  methods: {
    valid(){
      if (this.currentSkill.title.trim().length == 0){
        this.errorMsgTitle = "Must be filled!";
      }
      else if (!this.currentSkill.percent){
        this.errorMsgPercent = "Must be filled!";
      }
      else if (this.currentSkill.title.trim()==this.skill.title.trim()&&this.currentSkill.percent==this.skill.percent){
        this.currentSkill.editMode = false;
      }
      else {
        this.$emit("approve", this.currentSkill);
      }

      if (this.currentSkill.title.trim().length == 0&&!this.currentSkill.percent){
        this.errorMsgTitle = "Must be filled!";
        this.errorMsgPercent = "Must be filled!";
      }
    }
  },
}
</script>
<style lang="postcss" scoped src="./groupSkill.pcss">
  
</style>