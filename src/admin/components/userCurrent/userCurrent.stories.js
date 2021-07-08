import userCurrent from "./userCurrent.vue";

export default {
  title : "userCurrent",
  components: {userCurrent}
}

export const defaultView = () =>({
  components: {userCurrent},
  template: `
    <userCurrent  />
  `
});