import headLine from "./headLine.vue";

export default {
  title : "headLine",
  components: {headLine}
}

export const defaultView = () =>({
  components: {headLine},
  template: `
    <headLine title="Admin Panel" />
  `
});