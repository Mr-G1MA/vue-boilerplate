<template>
  <component 
    :is="type"
    v-bind="$attrs"
    v-on="$listeners"
  /> 
</template>

<script>
import def from './types/defaultBtn';
import squar from './types/squareBtn';
import ico from './types/iconedBtn';
import roun from './types/roundBtn';
export default {
  props: {
    type: {
      type: String,
      default: "default"
    }
  },
  components: {
    default: def,
    square: squar,
    iconed: ico,
    round: roun,
  }
}
</script>