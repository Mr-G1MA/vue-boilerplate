<template lang="pug">
  .about-page-component
    .page-content-wrapper
      .page-content
        .container(v-if="groups.length").about-container
          .page-content__header
            .page-content__title Page "About"
            iconedBtn(type="iconed" title="Add group" v-if="emptyGroup == false" @click="emptyGroup = true")
          ul.groups
            li.groups__item(v-if="emptyGroup")
              group(@remove="emptyGroup = false" empty @approve="createGroup")
            li.groups__item(v-for="item in groups" :key="item.id")
              group(
                :title="item.category" 
                :skillsArray="item.skills"
                @addSkill="addSkill($event, item.id)"
                @removeSkill="removeSkill"
                @commitSkillChanges="commitSkillChanges"
                @remove="deleteGroup(item)"
                @approve="editGroup($event, item.id)"
              )
        .container(v-else)
          h2(style="color:grey") Loading...
</template>
<script>
import button from "../../components/button";
import group from "../../components/group";
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      emptyGroup: false
    }
  },
  computed : {
    ...mapState("groups", {
      groups : state => state.data
    })
  },
  created() {
    this.getGroupsAction();
  },
  components : {
    iconedBtn: button,
    group
  },
  methods: {
    ...mapActions({
      createGroupAction : "groups/create",
      getGroupsAction : "groups/getGroups",
      addSkillAction : "skills/add",
      removeSkillAction : "skills/remove",
      editSkillAction : "skills/edit",
      showNotificationAction: "notification/show",
      deleteGroupAction : "groups/deleteGroup",
      editGroupAction : "groups/editGroup"
    }),
    async createGroup (event){
      try{
        await this.createGroupAction(event[1]);
        this.emptyGroup = false;
        this.showNotificationAction({
          msg : "Group created!",
          type : "success"
        });
        event[0].editmode = false;
      } catch (e) {
        this.showNotificationAction({
          msg : e.message,
          type : "error"
        });
      }
    },
    async addSkill (skill, skillId){
      const newSkill = {
        ...skill,
        category: skillId
      };

      try{
        await this.addSkillAction(newSkill);
        skill.title = "";
        skill.percent = "";
        this.showNotificationAction({
          msg : "Skill added!",
          type : "success"
        });
      } catch (e) {
        this.showNotificationAction({
          msg : e.message,
          type : "error"
        });
      }
    },
    async removeSkill (skill){
      try{
        await this.removeSkillAction(skill);
        this.showNotificationAction({
          msg : "Skill removed!",
          type : "success"
        });
      } catch (e) {
        this.showNotificationAction({
          msg : e.message,
          type : "error"
        });
      }
    },
    async commitSkillChanges (skill){
      try{
        await this.editSkillAction(skill);
        skill.editMode = false;
        this.showNotificationAction({
          msg : "Skill edited!",
          type : "success"
        });
      } catch (e) {
        this.showNotificationAction({
          msg : e.message,
          type : "error"
        });
      }
    },
    async editGroup(event, itemId){
      try{
        await this.editGroupAction({id : itemId, title: event[1]});
        this.showNotificationAction({
          msg : "Group title changed!",
          type : "success"
        });
        event[0].editmode = false;
      } catch (e) {
        this.showNotificationAction({
          msg : e.message,
          type : "error"
        });
      }
    },
    async deleteGroup(item){
      try{
        await this.deleteGroupAction(item);
        this.showNotificationAction({
          msg : "Group deleted!",
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

<style lang="postcss" scoped src="./about.pcss">
</style>