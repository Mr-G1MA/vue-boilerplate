<template>
  <div class="userCurrent-component">
    <avatar size="3" :src="avatarImg" />
    <div class="user-name">Bulat Gimadiev</div>
  </div>
</template>
<script>
import userPng from "../../../images/content/user.png";
import avatar from "../avatar";
export default {
  components: {
    avatar
  },
  computed: {
    avatarImg(){
      return "../" + userPng;
    }
  }
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .userCurrent-component{
    display: flex;
    font-size: 18px;
    font-weight: 600;
    align-items: center;

    @include phones{
      position: absolute;
      align-items: end;
    }
  }

  .user-name{
    margin-left: 20px;
  }
</style>