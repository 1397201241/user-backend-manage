import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import('../components/page/Home.vue')
const Register = ()=>import('../components/page/Register.vue')
const Login = ()=>import('../components/page/Login.vue')
const Users = ()=>import('../components/page/Users')
const Roles = ()=>import('../components/page/Roles')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
})

export default router
