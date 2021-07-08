import pushTags from "./pushTags.vue";

export default {
  title : "pushTags",
  components: {pushTags}
}

export const defaultView = () =>({
  data() {
    return {
      tags: "Webpack, Terminal, Gulp"
    }
  },
  components: {pushTags},
  template: `
    <pushTags v-model="tags" />
  `
});