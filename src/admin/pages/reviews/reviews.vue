<template lang="pug">
  .reviews-page-component
    .page-content-wrapper
      .page-content
        .container.reviews-container
          .page-content__header
            .page-content__title Page "Reviews"
          card(v-if="editMode").editing-card
            .edit-review-title(slot="title") Review editing
            template(slot="content")
              form.editing-block-wrapper(@submit.prevent="submitForm")
                label.upload-img-block 
                  .user-avatar-preview-wrapper(:class="[{errorImg:errorMsgPhoto}]")
                    img.user-avatar-preview(:src="`${currentReview.preview}`")
                  appButton(typeAttr="file" plain title="Upload photo" @change="uploadImg").upload-btn
                .editing-block 
                  .author-row 
                    appInput(:errorMessage="errorMsgAuthor" v-model="currentReview.author" title="Author name").edit-author-input
                    appInput(:errorMessage="errorMsgOcc" v-model="currentReview.occ" title="Author post").edit-post-input
                  app-input(:errorMessage="errorMsgText" v-model="currentReview.text" title="Info" fieldType="textarea").edit-info-input
                  .editing-block-btns 
                    appButton(@click.prevent="cancel" plain title="Cancel").cancel
                    appButton(title="Apply" typeAttr="submit").apply
          .reviews-wrapper
            ul.reviews-list
              li.review-item.add-review-btn(v-if="!editMode")
                appButton(@click="editMode=true" type="square" title="Add Review")
              li.review-item(v-for="review in reviews" :key="review.id" :review="review")
                reviewComponent(:review="review" @editExistReview="editExistReview")
</template>

<script>
import card from "../../components/card";
import appInput from "../../components/input";
import appButton from '../../components/button';
import reviewComponent from '../../components/review';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      currentReview : {
        photo: {},
        author: "",
        occ: "",
        text: "",
        preview: "",
        id : ""
      },
      editMode : false,
      errorMsgPhoto: false,
      errorMsgAuthor: "",
      errorMsgOcc: "",
      errorMsgText: "",
      errors: 0,
      editExistMode: false
    }
  },
  components : {
    card,
    appInput,
    appButton,
    reviewComponent
  },
  computed: {
    ...mapState("reviews", {
      reviews : state => state.data
    }),
  },
  created() {
    this.getReviewAction();
  },
  watch : {
    currentReview : {
      handler(val){
        if (val.author.trim().length !== 0){
          this.errorMsgAuthor = "";
        }

        if (val.occ.trim().length !== 0){
          this.errorMsgOcc = "";
        }

        if (val.text.trim().length !== 0){
          this.errorMsgText = "";
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
      addReviewAction : "reviews/add",
      editReviewAction : "reviews/edit",
      getReviewAction : "reviews/get"
    }),
    uploadImg(event){
      event.preventDefault();
      this.errorMsgPhoto = false;

      const file = event.dataTransfer 
        ? event.dataTransfer.files[0] 
        : event.target.files[0];

      this.currentReview.photo = file;
      this.renderPhoto(file);
      console.log(this.currentReview);
    },
    renderPhoto(img){
      const reader = new FileReader();

      reader.readAsDataURL(img);

      reader.onloadend = () => {
        this.currentReview.preview = reader.result;
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
    cancel(){
      this.editMode = false;
      this.currentReview = {
        photo: {},
        author: "",
        occ: "",
        text: "",
        preview: ""
      };
      this.errorMsgPhoto= false;
      this.errorMsgAuthor= "";
      this.errorMsgOcc= "";
      this.errorMsgText= "";
    },
    async submitForm(){
      for (var item in this.currentReview) {
        if (this.currentReview[item].length == 0){
          if (item == "author"){
            this.errorMsgAuthor = "Must be filled!";
            this.errors++;
          }
          else if (item == "text"){
            this.errorMsgText = "Must be filled!";
            this.errors++;
          } 
          else if (item == "occ"){
            this.errorMsgOcc = "Must be filled!";
            this.errors++;
          } 
        }

        if (item == "photo") {
          if(!this.currentReview[item].name&&!this.editExistMode){
            this.errorMsgPhoto = true;
            this.errors++;
          }
        }
      }
      if (this.errors == 0){
        try{
          if (this.editExistMode){
            await this.editReviewAction(this.currentReview);
              this.showNotificationAction({
              msg : "Review edited!",
              type : "success"
            });
            this.editExistMode = false;
          }
          else {
            await this.addReviewAction(this.currentReview);
            this.showNotificationAction({
              msg : "Review added!",
              type : "success"
            });
          }
          this.editMode=false;
          this.currentReview = {
            photo: {},
            author: "",
            occ: "",
            text: "",
            preview: ""
          };
        } catch (e) {
          this.showNotificationAction({
            msg : e.message,
            type : "error"
          });
        }
      }

      this.errors = 0;
    },
    editExistReview(e){
      this.editExistMode = true;
      this.currentReview = {
        photo: {},
        author: e.author,
        occ: e.occ,
        text: e.text,
        preview: `https://webdev-api.loftschool.com/${e.photo}`,
        id: e.id
      };
      this.editMode = true;
    },
  },
}
</script>

<style lang="postcss" scoped src="./reviews.pcss">
  
</style>