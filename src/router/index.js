import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from "../utils/auth";
import store from '../store'

const ViewProProgress = ()=>import("../components/page/Project/ViewProProgress");
const ProApply = ()=>import("../components/page/Project/ProApply");
const ProApply_add = ()=> import("../components/page/Project/ProApply_add");
const Home = ()=>import('../components/page/Home.vue');
const Register = ()=>import('../components/page/Register.vue');
const Login = ()=>import('../components/page/Login.vue');
const Users = ()=>import('../components/page/Users');
const Test = ()=>import('../components/page/Test');
const Agency = ()=>import('../components/page/Agency');
const ActionBar = ()=>import('../components/common/ActionBar');
const Welcome = ()=>import('../components/page/Welcome');
const RoleList = ()=>import('../components/page/RoleList');
const Project = ()=>import('../components/page/Project/Project')
const Liquidation = ()=>import('../components/page/Liquidation')
const PayCheck = ()=>import('../components/page/pay/PayCheck')
const PayApply = ()=>import('../components/page/pay/PayApply')
const Bgt_pm = ()=>import('../components/page/Bgt_pm')
const Budget = ()=>import('../components/page/budget/index')
const ProApply_exam = ()=>import('../components/page/Project/ProApply_exam')
const Reply = ()=>import('../components/page/Reply/Reply')
const DraftApproval = ()=>import('../components/page/Reply/DraftApproval')
const ReplyNavi = ()=>import('../components/page/Reply/ReplyNavi')
const TargetDown = ()=>import('../components/page/Reply/TargetDown')
/*const AcTarget = ()=>import('../components/page/Reply/AcTarget')*/

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{title:'首页',requireAuth:true},
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    meta:{title:'首页',requireAuth:true},
    component: Test
  },
  {
    path: '/ActionBar',
    name: 'ActionBar',
    meta:{title:'导航栏',requireAuth:true},
    component: ActionBar
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
    meta:{title:'首页',requireAuth:true},
    children:[
      {
        path:'/reply',
        name:'Reply',
        component:Reply,
        meta:{title:'预算批复',requireAuth:true},
      },
      {
        path:'/users',
        name:'Users',
        component:Users,
        meta:{title:'用户列表',requireAuth:true},
      },
      {
        path:'/payApply',
        name:'payApply',
        component:PayApply,
        meta:{title:'支付申请',requireAuth:true},
      },
      {
        path:'/PayCheck',
        name:'PayCheck',
        component:PayCheck,
        meta:{title:'支付审核',requireAuth:true},
      },
      {
        path:'/role_list',
        name:'RoleList',
        component:RoleList,
        meta:{title:'权限管理',requireAuth:true},
      },
      {
        path:'/agency',
        name:'Agency',
        component:Agency,
        meta:{title:'单位信息',requireAuth:true},
      },
      {
        path:'/budget',
        name:'Budget',
        component:Budget,
        meta:{title:'预算指标',requireAuth:true},
      },
      {
        path: '/welcome',
        name:'Welcome',
        component:Welcome,
        meta: {title: '欢迎页面',requireAuth:true}
      },
      {
        path: '/project',
        name:'Project',
        component:Project,
        meta: {title: '项目列表'}
      },
      {
        path: '/liquidation',
        name:'Liquidation',
        component:Liquidation,
        meta: {title: '清算凭证'}
      },
      {
        path: '/bgt_pm',
        name:'Bgt_pm',
        component:Bgt_pm,
        meta: {title: '预算申请管理'}
      },
      {
        path: '/pro_apply',
        name:'ProApply',
        component:ProApply,
        meta: {title: '项目申报'},
        children:[
          {
            path: '/pro_apply/add',
            name:'ProApply_add',
            component:ProApply_add,
          },
          {
            path: '/pro_apply/exam',
            name:'ProApply_exam',
            component:ProApply_exam,
          },
        ]
      },
      {
        path: '/view_pro_progress',
        name: 'ViewProProgress',
        component:ViewProProgress
      },
      {
        path: '/draft_app',
        name: 'DraftApproval',
        component:DraftApproval
      },
      {
        path: '/reply_navi',
        name: 'ReplyNavi',
        component:ReplyNavi
      },
      {
        path: '/target_down',
        name: 'TargetDown',
        component:TargetDown
      },
      /*{
        path: '/ac_target',
        name: 'AcTarget',
        component:AcTarget
      }*/
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
      //正常情况下刷新会丢失store里的状态,因此每次跳转前获取一次（存在性能问题）
      if (store.state.user_info.info.length===0){
        store.dispatch('user_info/getInfo').catch(err=>{
          console.log(err)
        })
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
