import Vue from 'vue'
import VueRouter from 'vue-router'
import NavigationBar from "../components/common/NavigationBar";
import {getToken} from "../utils/auth";
import store from '../store'

const Home = ()=>import('../components/page/Home.vue')
const Register = ()=>import('../components/page/Register.vue')
const Login = ()=>import('../components/page/Login.vue')
const Users = ()=>import('../components/page/Users')
const Roles = ()=>import('../components/page/Roles')
const Test = ()=>import('../components/page/Test')
const NavigationBar = ()=>import('../components/common/NavigationBar')

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
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/users',
        name:'Users',
        component:Users,
        meta:{title:'用户列表'},
      },
      {
        path:'/roles',
        name:'Roles',
        component:Roles,
        meta:{title:'角色权限'},
      },
    ],
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
