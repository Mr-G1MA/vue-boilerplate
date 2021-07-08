import addSkill from "./addSkill.vue";
import { action } from "@storybook/addon-actions";

const methods = {
  click : action("onClick")
}

export default {
  title : "addSkill",
  components: {addSkill}
}

export const defaultView = () =>({
  components: {addSkill},
  template: `
    <addSkill @click="click" />
  `,
  methods
});

export const blockedView = () =>({
  components: {addSkill},
  template: `
    <addSkill block />
  `,
});