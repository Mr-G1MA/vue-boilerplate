import Vue from 'vue';
import App from './App.vue';
import router from './router';
import SimpleValidator from 'simple-vue-validator';
import store from './store';
import $axios from './request';

Vue.use(SimpleValidator, {mode: 'manual'});

store.$axios = $axios;

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});