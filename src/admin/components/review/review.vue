<template lang="pug">
  card(:class="{editing: active}")
    .review-item__user-wrapper(slot="title")
      .review-item__img 
        img.projects-item__img(:src="reviewImg")
      .review-item__user 
        .user-name {{review.author}}
        .oser-occ {{review.occ}}
    .review-content-wrapper(slot="content")
      .review-item__desc {{review.text}}
      .review-item__btns 
        appIcon(title="Edit" symbol="pencil" @click="$emit('editExistReview', review)")
        appIcon(title="Delete" symbol="cross" @click="deleteReview(review)")
</template>

<script>
import { mapActions, mapState } from 'vuex';
import appIcon from '../../components/icon';
import card from '../../components/card';

export default {
  props : {
    review : {
      type : Object,
    },
    active: false,
  },
  components: {
    appIcon,
    card,
  },
  computed: {
    reviewImg(){
      return `https://webdev-api.loftschool.com/${this.review.photo}`;
    }
  },
  methods: {
    ...mapActions({
      deleteReviewAction: "reviews/delete",
      showNotificationAction: "notification/show",
    }),
    async deleteReview(review){
      try{
        console.log(review);
        await this.deleteReviewAction(review);
        this.showNotificationAction({
          msg : "Review deleted!",
          type : "success"
        });
      }catch(e){
        this.showNotificationAction({
          msg : e.message,
          type : "error"
        });
      }
    }
  },
}
</script>

<style lang="postcss" scoped src="./review.pcss">
  
</style>