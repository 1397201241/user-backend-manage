import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/page/Home.vue'
import Register from "../components/page/Register";
import Login from "../components/page/Login";
import Test from "../components/page/Test";
import NavigationBar from "../components/common/NavigationBar";
import {getToken} from "../utils/auth";
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{title:'首页',requireAuth:true},
    component: Home
  },
  {
    path: '/NavigationBar',
    name: 'NavigationBar',
    meta:{title:'导航栏',requireAuth:true},
    component: NavigationBar
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = new VueRouter({
  routes
});

//全局钩子，路由拦截(权限相关)
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let token=getToken();
    if (token) {
      //判断用户信息是否已获取，这里只能通过长度判断
      //正常情况下刷新会丢失store里的状态
      if (store.state['user_info'].info.length===0){
        store.dispatch('user_info/getInfo').catch(err=>{
          console.log(err)
        })
      }else{
        console.log('有了？')
      }
      next()
    } else {
      next({path: '/Login'})
    }
  } else {
    next()
  }
});

export default router
