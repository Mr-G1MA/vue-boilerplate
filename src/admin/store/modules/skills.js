export default {
  namespaced: true,
  state : {
    data : []
  },
  mutations : {
    
  },
  actions: {
    async add ({commit}, skill){
      try {
        const response = await this.$axios.post("/skills", skill);
        commit("groups/ADD_SKILL", response.data, { root: true });
      } catch (e){
        throw new Error("Something went wrong");
      }
    },
    async remove ({commit}, RemovingSkill){
      try {
        const response = await this.$axios.delete(`/skills/${RemovingSkill.id}`);
        commit("groups/REMOVE_SKILL", RemovingSkill, { root: true });
      } catch (e){
        throw new Error("Something went wrong");
      }
    },
    async edit ({commit}, editedSkill){
      try {
        const response = await this.$axios.post(`/skills/${editedSkill.id}`, editedSkill);
        commit("groups/EDIT_SKILL", editedSkill, { root: true });
      } catch (e){
        throw new Error("Something went wrong");
      }
    }
  }
}