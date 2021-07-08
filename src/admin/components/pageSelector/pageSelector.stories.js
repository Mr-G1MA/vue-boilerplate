import pageSelector from "./pageSelector.vue";

export default {
  title : "pageSelector",
  components: {pageSelector}
}

export const defaultView = () =>({
  components: {pageSelector},
  template: `
    <pageSelector  />
  `
});