<template>
  <div class="headLine-component">
    <div class="container headline-container">
      <slot />
      <div class="title">{{title}}</div>
      <div class="buttons">
        <button class="headline-escape-btn">Log out</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title : {
      type: String,
      default: "Admin Panel"
    }
  }
}
</script>
<style lang="postcss" scoped src="./headLine.pcss">
  
</style>