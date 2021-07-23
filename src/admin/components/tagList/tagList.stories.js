import tagList from "./tagList.vue";

export default {
  title: "tagList",
  components: {tagList}
}

export const defaultView = () => ({
  components: { tagList },
  template: `
    <tagList />
  `
});