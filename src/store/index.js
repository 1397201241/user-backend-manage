import Vue from 'vue'
import Vuex from 'vuex'
import pay_apply_info from './modules/pay_apply_info.js'
import user_info from './modules/user_info.js'
import tab_info from "./modules/tab_info";
import base_info from "./modules/base_info";
import budget_index_info from "./modules/budget_index_info";
import agency_budget_apply from "./modules/agency_budget_apply";
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
    budget_index_info,
    agency_budget_apply
  },
  strict: debug,
})




