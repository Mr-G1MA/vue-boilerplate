<template>
  <div class="userCurrent-component">
    <avatar size="3" :src="avatarImg" />
    <div class="user-name">Bulat Gimadiev</div>
  </div>
</template>
<script>
import avatar from "../avatar";
export default {
  components: {
    avatar
  },
  computed: {
    avatarImg(){
      return require("../../../images/content/user.png").default;
    }
  }
}
</script>
<style lang="postcss" scoped>
  .userCurrent-component{
    display: flex;
    font-size: 18px;
    font-weight: 600;
    align-items: center;
  }

  .user-name{
    margin-left: 20px;
  }
</style>