export default {
  namespaced: true,
  state : {
    show : false,
    msg: "",
    type: "error"
  },
  mutations : {
    EDIT_NOTIFICATION : (state, notification) => {
      state.show = notification.show;
      state.msg = notification.msg;
      state.type = notification.type;
    }
  },
  actions: {
    show({commit, dispatch}, notification){
      let timeout = null;

      commit("EDIT_NOTIFICATION", {
        show : true,
        msg : notification.msg,
        type : notification.type
      });

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        dispatch("hide");
      }, 2500);
    },
    hide({commit, state}){
      commit("EDIT_NOTIFICATION", {
        ...state,
        show : false
      });
    }
  }
}