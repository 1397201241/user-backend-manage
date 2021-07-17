import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from "../utils/auth";
import store from '../store'
import ProApply from "../components/page/Project/ProApply";
import ProApply_add from "../components/page/Project/ProApply_add";

const Home = ()=>import('../components/page/Home.vue');
const Register = ()=>import('../components/page/Register.vue');
const Login = ()=>import('../components/page/Login.vue');
const Users = ()=>import('../components/page/Users');
const Test = ()=>import('../components/page/Test');
const Agency = ()=>import('../components/page/Agency');
const ActionBar = ()=>import('../components/common/ActionBar');
const Welcome = ()=>import('../components/page/Welcome');
const RoleList = ()=>import('../components/page/RoleList');
const Project = ()=>import('../components/page/Project/Project');
const Liquidation = ()=>import('../components/page/Liquidation');
const PayCheck = ()=>import('../components/page/pay/PayCheck');
const PayApply = ()=>import('../components/page/pay/PayApply');
const Bgt_pm = ()=>import('../components/page/Bgt_pm');
const BudgetIndex = ()=>import('../components/page/budget/BudgetIndex');
const AgencyBudgetApply = ()=>import('../components/page/budget/AgencyBudgetApply');
const BudgetApplyDetails = ()=>import('../components/page/budget/BudgetApplyDetails');
const BudgetApplyDetails2 = ()=>import('../components/page/budget/BudgetApplyDetails2');
const BudgetApplyDetails3 = ()=>import('../components/page/budget/BudgetApplyDetails3');
const BudgetApplyList = ()=>import('../components/page/budget/BudgetApplyList');
const BudgetApplyList2 = ()=>import('../components/page/budget/BudgetApplyList2');
const AgencyProjectList = ()=>import('../components/page/budget/AgencyProjectList');
const DraftBudget = ()=>import('../components/page/budget/DraftBudget');
const DraftBudget2 = ()=>import('../components/page/budget/DraftBudget2');
const Chart = ()=>import('../components/common/chart');

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
    path: '/chart',
    name: 'Chart',
    component: Chart
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{title:'首页',requireAuth:true},
    children:[
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
        path:'/budget_index',
        name:'BudgetIndex',
        component:BudgetIndex,
        meta:{title:'预算指标',requireAuth:true},
      },
      {
        path:'/agency_budget_apply',
        name:'AgencyBudgetApply',
        component:AgencyBudgetApply,
        meta:{title:'新建申报',requireAuth:true},
      },
      {
        path:'/budget_apply_list',
        name:'BudgetApplyList',
        component:BudgetApplyList,
        meta:{title:'申报列表',requireAuth:true},
      },
      {
        path:'/budget_apply_list2',
        name:'BudgetApplyList2',
        component:BudgetApplyList2,
        meta:{title:'申报列表',requireAuth:true},
      },
      {
        path:'/agency_project_list',
        name:'AgencyProjectList',
        component:AgencyProjectList,
        meta:{title:'项目列表',requireAuth:true},
      },
      {
        path:'/budget_apply_details',
        name:'MyBudgetApply',
        component:BudgetApplyDetails,
        meta:{title:'申请详情',requireAuth:true},
      },
      {
        path:'/budget_apply_details2',
        name:'BudgetApplyDetails2',
        component:BudgetApplyDetails2,
        meta:{title:'申请详情',requireAuth:true},
      },
      {
        path:'/budget_apply_details3',
        name:'BudgetApplyDetails3',
        component:BudgetApplyDetails3,
        meta:{title:'申请详情',requireAuth:true},
      },
      {
        path:'/draft_budget',
        name:'DraftBudget',
        component:DraftBudget,
        meta:{title:'单位预算草案',requireAuth:true},
      },
      {
        path:'/draft_budget2',
        name:'DraftBudget2',
        component:DraftBudget2,
        meta:{title:'部门预算草案',requireAuth:true},
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
            path: '/pro_apply_add',
            name:'ProApply_add',
            component:ProApply_add,
          },
        ]
      }
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
