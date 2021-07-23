<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="currentInput.editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="currentInput.editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="New group"
          :value="value"
          :errorMessage="errorMsg"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="trash" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    editModeDefault: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      currentInput : {
        editmode: this.editModeDefault,
        title: this.value
      },
      errorMsg: this.errorText
    };
  },
  watch : {
    value : function (val){
      this.errorMsg = "";
    }
  },
  methods: {
    async onApprove() {
      if (this.currentInput.title.trim() === this.value.trim()) {
        if (this.currentInput.title.trim().length !== 0){
          this.currentInput.editmode = false;
        }
        else{
          this.errorMsg = "Must be filled";
        }
      } else if (this.value.trim().length == 0){
        this.errorMsg = "Must be filled";
      } else {
        this.$emit("approve", [this.currentInput, this.value]);
      }
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>