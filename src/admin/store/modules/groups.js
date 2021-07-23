export default {
  namespaced: true,
  state : {
    data : []
  },
  mutations : {
    SET_GROUPS: (state, groups) => (state.data = groups),
    ADD_GROUP: (state, group) => (state.data.unshift(group)),
    ADD_SKILL: (state, newSkill) => {
      state.data = state.data.map(item => {
        if (newSkill.category == item.id){
          item.skills.push(newSkill);
        }

        return item;
      })
    },
    REMOVE_SKILL: (state, RemovingSkill) => {
      state.data = state.data.map(item => {
        if (RemovingSkill.category == item.id){
          item.skills = item.skills.filter(skill => skill.id !== RemovingSkill.id);
        }
        return item;
      });
    },
    EDIT_SKILL : (state, editedSkill) => {
      state.data = state.data.map(item => {
        if (editedSkill.category == item.id){
          item.skills.map(skill => {
            if (skill.id == editedSkill.id){
              skill.title = editedSkill.title;
              skill.percent = editedSkill.percent;
            }
            return skill;
          });
        }
        return item;
      });
    },
    DELETE_GROUP : (state, group) => {
      state.data = state.data.filter(item => item.id !== group.id);
    },
    EDIT_GROUP : (state, group) => {
      state.data = state.data.map(item => {
        if (group.id == item.id){
          item.title = group.title;
        }
        return item;
      });
    }
  },
  actions: {
    async create ({commit}, groupTitle){
      try{
        const response = await this.$axios.post("/categories", {title : groupTitle});
        commit("ADD_GROUP", response.data);
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async getGroups ({commit}){
      try{
        const response = await this.$axios.get("/categories/484");
        commit("SET_GROUPS", response.data);
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async deleteGroup ({commit}, group){
      try{
        const response = await this.$axios.delete(`/categories/${group.id}`);
        commit("DELETE_GROUP", group);
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async editGroup ({commit}, group){
      try{
        const response = await this.$axios.post(`/categories/${group.id}`, {title : group.title});
        commit("EDIT_GROUP", group);
      } catch(e){
        throw new Error("Something went wrong");
      }
    }
  }
}