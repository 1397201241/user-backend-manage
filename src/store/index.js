import Vue from 'vue'
import Vuex from 'vuex'
import user_info from './modules/user_info.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  /*state: {
  },
  mutations: {
  },
  actions: {
  },*/
  modules: {
    user_info
  },
  strict: debug,
})




