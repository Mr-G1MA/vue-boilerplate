<template lang="pug">
  .login-wrapper
    .login-wrapper-bg 
      .login 
        form.form(@submit.prevent="validate")
          .login__title Authorization
          .login__inputs 
            appInput(v-model="user" icon="user" title="Login" :errorMessage="validation.firstError('user')")
            appInput(v-model="pass" icon="key" type="password" title="Password" :errorMessage="validation.firstError('pass')")
          logBtn(:disabled="disabledSubmit" title="Proceed").login__btn
</template>
<script>
import appInput from '../../components/input';
import logBtn from '../../components/button';
import { Validator, mixin as ValidatorMixin } from 'simple-vue-validator';
import $axios from '../../request.js';
import { mapActions, mapState } from 'vuex';

export default {
  mixins : [ValidatorMixin],
  validators : {
    "user" : value =>{
      return Validator.value(value).required("Incorrect username");
    },
    "pass" : value =>{
      return Validator.value(value).required("Incorrect password");
    }
  },
  data() {
    return {
      user : "",
      pass : "",
      disabledSubmit : false
    }
  },
  components : {
    appInput,
    logBtn
  },
  methods: {
    ...mapActions({
      showNotificationAction: "notification/show",
      loginAction: "user/login"
    }),
    async validate (){
      if (await this.$validate() == false) return;

      this.errorMsg = "";
      this.submitResolve = false;
      this.disabledSubmit = true;
      
      try {
        const response = await $axios.post("/login", {name : this.user, password: this.pass});

        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        const userResponse = await $axios.get("./user");
        this.loginAction(userResponse.data.user);

        this.$router.replace("/about");
      } catch (e) {
        this.showNotificationAction({
          msg : e.response.data.error,
          type : "error"
        });
      } finally {
        this.disabledSubmit = false;
      }
    }
  },
}
</script>
<style lang="pcss" scoped src="./login.pcss">
  
</style>