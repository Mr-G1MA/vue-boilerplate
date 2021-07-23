<template lang="pug">
  card(slim)
    editLine(slot="title" v-model="groupTitle" :editModeDefault="empty" @remove="$emit('remove', $event)" @approve="$emit('approve', $event)")
    template(slot="content")
      ul.group-skills(v-if="empty == false")
        li.group-skills__item(v-for="skill in skillsArray" :key="skill.id")
          groupSkill(:skill="skill" @remove="$emit('removeSkill', $event)" @approve="$emit('commitSkillChanges', $event)")
      .add-skill-component 
        addSkill(@addSkill="$emit('addSkill', $event)" :block="empty")
</template>

<script>
import card from "../card";
import editLine from "../editLine";
import groupSkill from "../groupSkill";
import addSkill from "../addSkill";


export default {
  components:{
    card,
    editLine,
    groupSkill,
    addSkill,
  },
  props: {
    empty: Boolean,
    title: {
      type: String,
      default: ""
    },
    skillsArray: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      groupTitle: this.title
    }
  },
}
</script>
<style lang="postcss" scoped src="./group.pcss">
  
</style>