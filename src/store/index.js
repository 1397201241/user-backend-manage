import Vue from 'vue'
import Vuex from 'vuex'
import pay_apply_info from './modules/pay_apply_info.js'
import userInfo from './modules/userInfo.js'
import tab_info from "./modules/tab_info";
import base_info from "./modules/base_info";
import budget_index_info from "./modules/budget_index_info";
import agency_budget_apply from "./modules/agency_budget_apply";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'; // 开发环境 true
//const debug = true; // 产品环境 false
export default new Vuex.Store({
  modules: {
    userInfo,
    tab_info,
    base_info,
    pay_apply_info,
    budget_index_info,
    agency_budget_apply
  },
  strict: debug,
})




