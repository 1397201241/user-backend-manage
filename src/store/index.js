import Vue from 'vue'
import Vuex from 'vuex'
import pay_apply_info from './modules/pay_apply_info.js'
import user_info from './modules/user_info.js'
import tab_info from "./modules/tab_info";
import base_info from "./modules/base_info";
import budget_info from "./modules/budget_info";
Vue.use(Vuex);

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
    tab_info,
    base_info,
    pay_apply_info,
    budget_info
  },
  strict: debug,
})




