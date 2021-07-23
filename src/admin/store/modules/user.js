import login from "../../pages/login";

export default {
  namespaced: true,
  state : {
    user : {}
  },
  mutations : {
    SET_USER : (state, user) => (state.user = user),
    CLEAR_USER : state => (state.user = {})
  },
  getters: {
    loggedIn: state => {
      const userObj = state.user;
      const isEmpty = Object.keys(userObj).length == 0 && userObj.constructor == Object;

      return isEmpty == false;
    }
  },
  actions: {
    logout({commit}){
      localStorage.removeItem("token");
      location.reload();
    },
    login({commit}, user){
      commit("SET_USER", user);
    }
  }
}