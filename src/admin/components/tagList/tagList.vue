<template>
  <ul class="tags-list">
    <li v-for="(item, index) in tagsArray" :key="`${item}-${index}`" class="tags-item" v-if="item.trim()">
      <tag :title="item" />
    </li>
  </ul>
</template>

<script>
import tag from "../tag";

export default {
  components : {
    tag
  },
  props: {
    tags: {
      type: String,
      default: ""
    }
  },
  computed: {
    tagsArray(){
      let array = this.tags.replace(/\s+/g, '').split(",");
      for (let i = 0; i<array.length; i++){
        if(array[i]==""){
          array.splice(i,1);
          i--;
        }
      }
      return array;
    }
  }
}
</script>

<style lang="postcss" scoped src="./tagList.pcss">
  
</style>