import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    startLoading(state) {
      state.loading = !state.loading;
    },
    stopLoading(state) {
      state.loading = !state.loading;
    },
    saveQuestion(state, question) {
      state.question = question;
    },
  },
  actions: {
    async saveQuestion(context, question) {
      context.commit('startLoading');

      function sendApiRequest(_question) {
        return new Promise((resolve)=> {
          setTimeout(() => resolve(_question), 4000);
        })
      }

      const _question = await sendApiRequest(question); 
      context.commit('saveQuestion', _question)
      context.commit('stopLoading');

    },
  }
});

export default store;