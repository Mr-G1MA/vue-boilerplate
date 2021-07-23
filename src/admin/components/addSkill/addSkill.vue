<template lang="pug">
  div(:class="['addSkill-component', {block: block}]")
    addInput(v-model="skill.title" :errorMessage="errorMsgTitle" noSidePaddings placeHolder="New Skill").new-skill-input
    addInput(v-model="skill.percent" :errorMessage="errorMsgPercent" type="number" min="0" max="100" maxlength="3").percent-input
    iconedBtn(type="iconed" title="" @click="valid").add-btn
</template>

<script>
import input from "../input";
import button from "../button";

export default {
  data() {
    return {
      skill : {
        title : "",
        percent : ""
      },
      errorMsgTitle : "",
      errorMsgPercent: ""
    }
  },
  watch : {
    skill : {
      handler(val){
        if (val.title.trim().length !== 0){
          this.errorMsgTitle = "";
        }

        if (val.percent.trim().length !== 0){
          this.errorMsgPercent = "";
        }
      },
      deep: true
    }
  },
  props: {
    block: Boolean,
  },
  components:{
    iconedBtn: button,
    addInput: input
  },
  methods: {
    valid(){
      if (!this.skill.title.trim().length){
        this.errorMsgTitle = "Must be filled!";
      }
      else if (!this.skill.percent.trim().length){
        this.errorMsgPercent = "Must be filled!";
      }
      else if (JSON.parse(this.skill.percent)> 100){
        this.errorMsgPercent = "Must be less than 100!";
      }
      else {
        this.$emit("addSkill", this.skill);
      }

      if (!this.skill.percent.trim().length&&!this.skill.title.trim().length){
        this.errorMsgTitle = "Must be filled!";
        this.errorMsgPercent = "Must be filled!";
      }
      else if (!this.skill.title.trim().length&&JSON.parse(this.skill.percent)> 100){
        this.errorMsgTitle = "Must be filled!";
        this.errorMsgPercent = "Must be less than 100!";
      }
    }
  },
}
</script>
<style lang="postcss">
  @import "../../../styles/mixins.pcss";
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
    @include tablets{
      width: 45%;
    }
  }

  .percent-input{
    margin: auto;
    width: 17%;
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

    @include tablets{
      width: 22%;
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
      margin-right: 0 !important; 
    }
  }
  
</style>