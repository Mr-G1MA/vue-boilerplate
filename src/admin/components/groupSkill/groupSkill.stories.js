import groupSkill from "./groupSkill.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  onApprove : action("onApprove"),
  onRemove : action("onRemove")
}

export default {
  title : "groupSkill",
  components: {groupSkill}
}

export const defaultView = () =>({
  components: {groupSkill},
  data() {
    return {
      skill: {
        id: 1,
        title: "title here",
        percent: 99
      }
    }
  },
  template: `
    <groupSkill @approve="onApprove" @remove="onRemove" :skill="skill" />
  `,
  methods
});