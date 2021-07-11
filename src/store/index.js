import Vue from 'vue'
import Vuex from 'vuex'
import user_info from './modules/user_info.js'
import tab_info from "./modules/tab_info";
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
    user_info,
    tab_info
  },
  strict: debug,
})




