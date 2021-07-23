export default {
  namespaced: true,
  state : {
    data : []
  },
  mutations : {
    SET_REVIEWS: (state, reviews) => (state.data = reviews),
    ADD_REVIEW: (state, review) => (state.data.push(review)),
    DELETE_REVIEW: (state,review) => {
      state.data = state.data.filter(item => review.id !== item.id);
    }
  },
  actions: {
    async add ({commit, dispatch}, review) {
      try{
        const formData = new FormData();

        for (var item in review){
          if (item !== "preview"&&item !== "id"){
            formData.append(item, review[item]);
          }
        }

        const response = await this.$axios.post("/reviews", formData);
        dispatch("get");
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async get ({commit}) {
      try{
        const response = await this.$axios.get("/reviews/484");
        commit("SET_REVIEWS", response.data);
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async edit ({commit, dispatch}, review) {
      try{
        const editData = new FormData();

        for (var item in review){
          if (item !== "preview"&&item !== "id"){
            editData.append(item, review[item]);
          }
        }
        const response = await this.$axios.post(`/reviews/${review.id}`, editData);
        dispatch("get");
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
    async delete ({commit}, review) {
      try{
        const response = await this.$axios.delete(`/reviews/${review.id}`);
        commit("DELETE_REVIEW", review);
      } catch(e){
        throw new Error("Something went wrong");
      }
    },
  }
}