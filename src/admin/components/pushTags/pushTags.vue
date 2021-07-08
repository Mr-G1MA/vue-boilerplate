<template>
  <div class="push-tag-component">
    <tagInput title="Tag adding" v-model="current" @input="$emit('change', current)" />
    <ul class="tags-list">
      <li v-for="(item, index) in tagsArray" :key="`${item}-${index}`" class="tags-item" v-if="item.trim()">
        <tag @click="deleteTag(item, index)" interactive :title="item" />
      </li>
    </ul>
  </div> 
</template>

<script>
import tagInput from "../input";
import tag from "../tag";

export default {
  data() {
    return {
      current: this.tags
    }
  },
  props: {
    tags : {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "tags",
    event: "change"
  },
  components: {
    tagInput,
    tag
  },
  methods: {
    deleteTag(item, index){
      console.log(this.tagsArray);
      let array = this.tagsArray;
      let tagsString = "";

      array.splice(index,1);

      for (let i = 0; i< array.length; i++){
        if (i==array.length-1){
          tagsString = tagsString + array[i];
        }
        else{
          tagsString = tagsString + array[i] + ", ";
        }
      }

      this.current = tagsString;
      this.$emit("change", this.current);
    }
  },
  computed: {
    tagsArray(){
      let array = this.current.replace(/\s+/g, '').split(",");
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
<style lang="postcss" scoped>
  .tags-list{
    display: flex;
    flex-wrap: wrap;
    margin-top: 22px;

  }

  .tags-item{
    margin-right: 11px;
  }
</style>