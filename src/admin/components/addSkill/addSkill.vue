<template lang="pug">
  div(:class="['addSkill-component', {block: block}]")
    addInput(:value="valueTitle" :errorMessage="errorMsgTitle" noSidePaddings placeHolder="New Skill").new-skill-input
    addInput(:value="valuePercent" :errorMessage="errorMsgPercent" type="number" min="0" max="100" maxlength="3").percent-input
    iconedBtn(type="iconed" title="" @click="valid").add-btn
</template>

<script>
import input from "../input";
import button from "../button";

export default {
  data() {
    return {
      title: this.value,
      errorMsgTitle: this.errorTextTitle,
      errorMsgPercent: this.errorTextPercent
    }
  },
  props: {
    block: Boolean,
    valueTitle: {
      type: String,
      default: ""
    },
    errorTextTitle: {
      type: String,
      default: ""
    },
    valuePercent: {
      type: String,
      default: ""
    },
    errorTextPercent: {
      type: String,
      default: ""
    }
  },
  components:{
    iconedBtn: button,
    addInput: input
  },
  methods: {
    valid(){
      if (this.valueTitle.trim().length == 0){
        this.errorMsgTitle = "This field must be filled";
      }
      else if (this.valuePercent.trim().length == 0){
        this.errorMsgPercent = "This field must be filled";
      }
      else {
        this.$emit("addSkill", this.value);
      }

      if ((this.valueTitle.trim().length == 0)&&(this.valuePercent.trim().length == 0)){
        this.errorMsgTitle = "This field must be filled";
        this.errorMsgPercent = "This field must be filled";
      }
    }
  },
}
</script>
<style lang="postcss">
  .addSkill-component{
    display: flex;
    align-items: center;
    position: relative;
    font-size: 16px;
    font-weight: 400;

    &.block{
      pointer-events: none;
      opacity: .65;

      &:after{
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
  .new-skill-input{
    width: 60%;
  }

  .percent-input{
    margin: auto;
    position: relative;
    color: #414C63;
    &:after{
      content:"%";
      position: absolute;
      display: block;
      font-size: 16px;
      font-weight: 400;
      right: 5%;
      top: 20%;
    }

    &:hover{
      &:after{
        display: none;
      }
    }

    
    &:focus-within{
      &:after{
        display: none;
      }
    }
  }

  .add-btn{
    &:before{
      width: 38px !important;
      height: 38px !important;
      flex-basis: 38px !important;
      line-height: 36px !important;
      font-size: 35px;
      font-weight: 400;
    }
  }
  
</style>