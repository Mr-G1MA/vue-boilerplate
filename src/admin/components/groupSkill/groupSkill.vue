<template lang="pug">
  .groupSkill-component(v-if="editMode == false")
    .groupSkill__title {{skill.title}}
    .groupSkill__percent.percent-symbol {{skill.percent}}
    .groupSkill__buttons 
      icon.groupSkill-btn(symbol="pencil" grayscale @click="editMode = true")
      icon.groupSkill-btn(symbol="trash" grayscale @click="$emit('remove', skill.id)")
  .groupSkill-component(v-else)
    .groupSkill__title.active-title
      skillInput(v-model="currentSkill.title" noSidePaddings)
    .groupSkill__percent
      skillInput(v-model="currentSkill.percent" type="number" min="0" max="100" maxlength="3")
      icon.groupSkill-btn(symbol="tick" @click="$emit('approve', currentSkill)")
      icon.groupSkill-btn(symbol="cross" @click="editMode = false")
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
      editMode: false,
      currentSkill: {
        id: this.skill.id,
        title: this.skill.title,
        percent: this.skill.percent
      }
    }
  },
}
</script>
<style lang="postcss" scoped src="./groupSkill.pcss">
  
</style>