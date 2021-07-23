<template lang="pug">
  .header-component 
    headLine
      userCurrent
    pageSelector
</template>
<script>
import headLine from "../../components/headLine";
import userCurrent from "../../components/userCurrent";
import pageSelector from "../../components/pageSelector";

export default {
  components : {
    headLine,
    userCurrent,
    pageSelector
  }
}
</script>
<style lang="postcss" scoped>
  
</style>