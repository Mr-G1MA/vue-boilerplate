<template lang="pug">
  .projects-page-component
    .page-content-wrapper
      .page-content
        .container.projects-container
          .page-content__header
            .page-content__title Page "Projects"
          card(v-if="editMode").editing-card
            .edit-projects-title(slot="title") Project editing
            template(slot="content")
              form.editing-block-wrapper(@submit.prevent="submitForm")
                label.upload-img-block(:class="[{active:hovered}, {errorImg:errorMsgPhoto}]" :style="{backgroundImage: `url(${projectForm.preview})`}" @dragover="handleDragOver" @dragleave="hovered=false" @drop="uploadImg") 
                  .upload-title Drag & drop or click for uploading picture
                  appButton(typeAttr="file" title="Upload" @change="uploadImg").upload-btn
                .editing-block 
                  appInput(:errorMessage="errorMsgName" v-model="projectForm.title" title="Name").edit-name-input
                  appInput(:errorMessage="errorMsgLink" v-model="projectForm.link" title="Link").edit-link-input
                  app-input(:errorMessage="errorMsgDesc" v-model="projectForm.description" title="Info" fieldType="textarea").edit-info-input
                  pushTags(:tags="projectForm.techs" v-model="projectForm.techs").edit-tags-input
                  .editing-block-btns 
                    appButton(@click.prevent="cancel" plain title="Cancel").cancel
                    appButton(title="Apply" typeAttr="submit").apply
          .projects-wrapper
            ul.projects-list
              li.projects-item.add-project-btn(v-if="!editMode")
                appButton(@click="editMode=true" type="square" title="Add Project")
              projectsComponent(v-for="work in projects" :key="work.id" :work="work" @editExistWork="editExistWork")
</template>

<script>
import card from "../../components/card";
import appInput from "../../components/input";
import appButton from '../../components/button';
import pushTags from '../../components/pushTags';
import projectsComponent from '../../components/projects';
import { mapActions, mapState } from 'vuex';

export default {
  components : {
    card,
    appInput,
    appButton,
    pushTags,
    projectsComponent
  },
  computed : {
    ...mapState("projects", {
      projects : state => state.data
    })
  },
  created() {
    this.getProjectAction();
  },
  data() {
    return {
      hovered: false,
      editMode: false,
      projectForm: {
        id: "",
        title: "",
        techs: "",
        photo: {},
        link: "",
        description: "",
        preview: "",
        photoEdit: ""
      },
      errorMsgName: "",
      errorMsgLink: "",
      errorMsgDesc: "",
      errorMsgPhoto: false,
      errors: 0,
      editExistMode: false
    }
  },
  watch : {
    projectForm : {
      handler(val){
        if (val.title.trim().length !== 0){
          this.errorMsgName = "";
        }

        if (val.link.trim().length !== 0){
          this.errorMsgLink = "";
        }

        if (val.description.trim().length !== 0){
          this.errorMsgDesc = "";
        }

        if (val.photo.length !== undefined){
          this.errorMsgPhoto = false;
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      showNotificationAction: "notification/show",
      addProjectAction : "projects/add",
      editProjectAction : "projects/edit",
      getProjectAction : "projects/get"
    }),
    uploadImg(event){
      event.preventDefault();
      this.errorMsgPhoto = false;

      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      this.projectForm.photo = file;
      this.renderPhoto(file);
      this.hovered = false;
      this.projectForm.photoEdit = "";
    },
    renderPhoto(img){
      const reader = new FileReader();

      reader.readAsDataURL(img);

      reader.onloadend = () => {
        this.projectForm.preview = reader.result;
      }

      reader.onerror = () => {
        this.showNotificationAction({
          msg: reader.error.message,
          type: "error"
        });
      }

      reader.onabort = () => {
        this.showNotificationAction({
          msg: reader.error.message,
          type: "error"
        });
      }
    },
    handleDragOver (e){
      e.preventDefault();
      this.hovered = true;
      this.errorMsgPhoto = false;

    },
    async submitForm(){
      for (var item in this.projectForm) {
        if (this.projectForm[item].length == 0){
          if (item == "title"){
            this.errorMsgName = "Must be filled!";
            this.errors++;
          }
          else if (item == "link"){
            this.errorMsgLink = "Must be filled!";
            this.errors++;
          } 
          else if (item == "description"){
            this.errorMsgDesc = "Must be filled!";
            this.errors++;
          } 
        }

        if (item == "photo") {
          if(!this.projectForm[item].name&&!this.editExistMode){
            this.errorMsgPhoto = true;
            this.errors++;
          }
        }
      }
      if (this.errors == 0){
        try{
          if (this.editExistMode){
            await this.editProjectAction(this.projectForm);
              this.showNotificationAction({
              msg : "Project edited!",
              type : "success"
            });
            this.editExistMode = false;
          }
          else {
            await this.addProjectAction(this.projectForm);
            this.showNotificationAction({
              msg : "Project added!",
              type : "success"
            });
          }
          this.editMode=false;
          for (var item in this.projectForm){
            if (item !== "photo"){
              this.projectForm[item] = "";
            }
            else{
                this.projectForm[item] = {};
            }
          }
        } catch (e) {
          this.showNotificationAction({
            msg : e.message,
            type : "error"
          });
        }
      }

      this.errors = 0;
    },
    editExistWork(e){
      this.editExistMode = true;
      this.projectForm.title = e.title;
      this.projectForm.link = e.link;
      this.projectForm.techs = e.techs;
      this.projectForm.description = e.description;
      this.projectForm.photoEdit = e.photo;
      this.projectForm.preview = `https://webdev-api.loftschool.com/${e.photo}`;
      this.editMode = true;
      this.projectForm.id = e.id;
    },
    cancel(){
      this.errorMsgName= "";
      this.errorMsgLink= "";
      this.errorMsgDesc= "";
      this.errorMsgPhoto= false;
      this.errors = 0;
      this.editMode = false;
      this.editExistMode = false;
      this.projectForm.title = "";
      this.projectForm.link = "";
      this.projectForm.techs = "";
      this.projectForm.description = "";
      this.projectForm.photo = {};
      this.projectForm.preview = "";
      this.projectForm.id = "";
    }
  },
}
</script>

<style lang="postcss" scoped src="./projects.pcss">
  
</style>