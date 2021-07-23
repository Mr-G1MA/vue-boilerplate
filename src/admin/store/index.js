import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import groups from './modules/groups';
import skills from './modules/skills';
import notification from './modules/notification';
import projects from './modules/projects';
import user from './modules/user';
import reviews from './modules/reviews';

export default new Vuex.Store({
  modules: {
    groups,
    skills,
    notification,
    projects,
    user,
    reviews
  }
});