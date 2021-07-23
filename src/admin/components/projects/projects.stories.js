import projects from "./projects.vue";

export default {
  title : "projects",
  components: {projects}
}

export const defaultView = () =>({
  components: {projects},
  template: `
    <projects  />
  `
});