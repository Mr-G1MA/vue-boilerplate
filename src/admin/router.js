import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import axios from 'axios';

Vue.use(VueRouter);

import header from './components/header';
import about from './pages/about';
import login from './pages/login';
import projects from './pages/projects';
import reviews from './pages/reviews';

const routes = [
  {
    path: "/about",
    components: {
      default : about,
      header: header
    }
  },
  {
    path: "/projects",
    components: {
      default : projects,
      header: header
    }
  },
  {
    path: "/reviews",
    components: {
      default : reviews,
      header: header
    }
  },
  {
    path: "/login",
    component: login,
    meta: {
      public : true
    }
  }
];

const router = new VueRouter({routes});

const check = axios.create({
  baseURL : "https://webdev-api.loftschool.com/"
});

router.beforeEach(async (to, from, next) => {
  const isPublic = to.matched.some(route => route.meta.public);
  const isLoggedIn = store.getters["user/loggedIn"];

  if (!isPublic&&!isLoggedIn){
    const token = localStorage.getItem("token");

    check.defaults.headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await check.get("/user");
      store.dispatch("user/login", await response.data.user);
      next();
    } catch(e){
      router.replace("/login");
      localStorage.removeItem("token");
    }
  }
  else {
    next();
  }
})

export default router;