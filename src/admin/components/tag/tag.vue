<template>
  <div v-if="interactive" class="tag">
    {{title}}
    <icon class="delete-tag-btn" symbol="cross" grayscale v-on="$listeners" />
  </div>
  <div v-else class="tag">
    {{title}}
  </div>
</template>

<script>
import crossIcon from '../icon';
export default {
  components:{
    icon: crossIcon
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    interactive: Boolean
  }
}
</script>

<style lang="postcss" scoped src="./tag.pcss"></style>