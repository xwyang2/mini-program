import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    favorites: []
  },
  mutations: {
    addItem: (state, payload) => state.favorites = payload,
    delItem: (state, payload) => state.favorites = payload,
  },
})

export default store
