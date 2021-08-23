import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import axios from "axios";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(Antd);
Vue.use(VXETable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
