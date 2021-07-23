<template lang="pug">
  li.projects-item(:class="{editing: active}")
    .projects-item__img-wrapper
      img.projects-item__img(:src="workImg")
      tagsList(:tags="work.techs" class="tags-positioning")
    .project-content-wrapper 
      .projects-item__title {{work.title}}
      .projects-item__desc {{work.description}}
      a(:href="`${work.link}`").projects-item__link {{work.link}}
      .projects-item__btns 
        appIcon(title="Edit" symbol="pencil" @click="$emit('editExistWork', work)")
        appIcon(title="Delete" symbol="cross" @click="deleteWork(work)")
</template>

<script>
import { mapActions, mapState } from 'vuex';
import appButton from '../button';
import tagsList from '../../components/tagList';
import appIcon from '../../components/icon';

export default {
  data() {
    return {
      active: false,
      edit: this.editMode
    }
  },
  props: {
    work : {
      type: Object
    }
  },
  components:{
    appButton,
    tagsList,
    appIcon
  },
  computed : {
    workImg (){
      return `https://webdev-api.loftschool.com/${this.work.photo}`;
    }
  },
  methods: {
    ...mapActions({
      showNotificationAction: "notification/show",
      deleteProjectAction : "projects/delete",
    }),
    async deleteWork(item){
      try{
        await this.deleteProjectAction(item);
        this.showNotificationAction({
          msg : "Project deleted!",
          type : "success"
        });
      } catch (e) {
        this.showNotificationAction({
          msg : e.message,
          type : "error"
        });
      }
    }
  },
}
</script>

<style lang="postcss" scoped src="./projects.pcss">
</style>