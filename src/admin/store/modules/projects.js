export default {
  namespaced: true,
  state : {
    data : []
  },
  mutations : {
    SET_PROJECTS: (state, projects) => (state.data = projects),
    ADD_PROJECT: (state, project) => (state.data.push(project)),
    DELETE_PROJECTS: (state,project) => {
      state.data = state.data.filter(item => project.id !== item.id);
    }
  },
  actions: {
    async add ({commit, dispatch}, project) {
      try{
        const formData = new FormData();

        for (var item in project){
          if (item !== "preview"&&item !== "id"&&item !== "photoEdit"){
            formData.append(item, project[item]);
          }
        }

        const response = await this.$axios.post("/works", formData);
        dispatch("get");
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async get ({commit}) {
      try{
        const response = await this.$axios.get("/works/484");
        commit("SET_PROJECTS", response.data);
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async edit ({commit, dispatch}, project) {
      try{
        const editData = new FormData();
        if (project.photoEdit==""){
          for (var item in project){
            if (item !== "preview"&&item !== "id"&&item !== "photoEdit"){
              editData.append(item, project[item]);
            }
          }
        }
        else{
          for (var item in project){
            if (item !== "preview"&&item !== "id"&&item !== "photoEdit"&&item !== "photo"){
              editData.append(item, project[item]);
            }
            else if (item == "photoEdit"){
              editData.append("photo", project[item]);
            }
          }
        }
        const response = await this.$axios.post(`/works/${project.id}`, editData);
        dispatch("get");
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async delete ({commit}, project) {
      try{
        const response = await this.$axios.delete(`/works/${project.id}`);
        commit("DELETE_PROJECTS", project);
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
  }
}