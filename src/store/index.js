import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInform:{

    }
  },
  mutations: {
    addInform(state,inform){
      state.userInform=inform

    }
  },
  actions: {
  },
  modules: {
  }
})
