import group from "./group.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onCommitSkillChanges : action("onCommitSkillChanges"),
  onRemoveSkill : action("onRemoveSkill"),
  onRemove : action("onRemove")
}

export default {
  title : "group",
  components: {group}
}

export const defaultView = () =>({
  data() {
    return {
      title: "Title will be here",
      skills: [
        {
          "id": 0, 
          "title": "HTML5", 
          "percent": 100
        },
        {
          "id": 1, 
          "title": "CSS3", 
          "percent": 90
        }
      ]
    }
  },
  components: {group},
  template: `
    <group @commitSkillChanges="onCommitSkillChanges" @removeSkill="onRemoveSkill" @remove="onRemove" :title="title" :skillsArray="skills" />
  `,
  methods
});

export const emptyView = () =>({
  components: {group},
  template: `
    <group empty />
  `
});