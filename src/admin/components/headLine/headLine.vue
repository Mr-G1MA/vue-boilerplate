<template>
  <div class="headLine-component">
    <div class="container headline-container">
      <slot />
      <div class="title">{{title}}</div>
      <div class="buttons">
        <button @click="logout" class="headline-escape-btn">Log out</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: {
    title : {
      type: String,
      default: "Admin Panel"
    }
  },
  methods: {
    ...mapActions({
      logout : "user/logout",
    })
  },
}
</script>
<style lang="postcss" scoped src="./headLine.pcss">
  
</style>