import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken,getUsernameToken} from "../utils/auth";
import store from '../store'
import {getInfo} from "../api/user";

const PayVoucher = () => import("../components/page/audit/PayVoucher");
const PayVoucherList1 = ()=>import('../components/page/audit/PayVoucherList');
const ViewProProgress = ()=>import("../components/page/Project/ViewProProgress");
const ProApply = ()=>import("../components/page/Project/ProApply");
const ProApply_add = ()=> import("../components/page/Project/ProApply_add");
const Register = ()=>import('../components/page/Register.vue');
const Login = ()=>import('../components/page/Login.vue');
const Users = ()=>import('../components/page/Users');
const Agency = ()=>import('../components/page/Agency');
const ActionBar = ()=>import('../components/common/ActionBar');
const Welcome = ()=>import('../components/page/Welcome');
const ProApply_exam = ()=>import('../components/page/Project/ProApply_exam')
const Reply = ()=>import('../components/page/Reply/Reply')
const DraftApproval = ()=>import('../components/page/Reply/DraftApproval')
const ReplyNavi = ()=>import('../components/page/Reply/ReplyNavi')
const TargetDown = ()=>import('../components/page/Reply/TargetDown')
/*const AcTarget = ()=>import('../components/page/Reply/AcTarget')*/
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
const BudgetApplyList3 = ()=>import('../components/page/budget/BudgetApplyList3');
const BudgetApplyList4 = ()=>import('../components/page/budget/BudgetApplyList4');
const AgencyProjectList = ()=>import('../components/page/budget/AgencyProjectList');
const DraftBudget = ()=>import('../components/page/budget/DraftBudget');
const DraftBudget2 = ()=>import('../components/page/budget/DraftBudget2');
const DraftBudgetList = ()=>import('../components/page/budget/DraftBudgetList');
const Pie = ()=>import('../components/common/Pie');
const RoleList = ()=>import('../components/page/RoleList')
const AcTarget = ()=>import('../components/page/Reply/AcTarget')
const TargetDetail = ()=>import('../components/page/Reply/TargetDetail')
const AddPay = ()=>import('../components/page/pay/AddPay')
const AddPay2 = ()=>import('../components/page/pay/PayApply2')
const PayVoucherList = ()=>import('../components/page/pay/PayVoucherList')
const PayVoucherDetail = ()=>import('../components/page/pay/PayVoucherDetail')
const CapitalLiquidation = ()=>import('../components/page/audit/CapitalLiquidation');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{title:'首页'},
    component: ()=>import('../views/Home')
  },
  {
    path: '/renderer',
    name: 'Renderer',
    meta:{title: '渲染器'},
    component: ()=>import('../components/vxeTable/Renderers')
  },
  {
    path: '/drumKit',
    name: 'DrumKit',
    meta:{title: '渲染器'},
    component: ()=>import('../views/DrumKit')
  },
  {
    path: '/atable',
    name: 'ATable',
    meta:{title:'首页'},
    component: ()=>import('../views/test/aTable')
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
    /*meta:{title:'登录界面',requireAuth:true},*/
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/pie',
    name: 'Pie',
    component: Pie
  },
  {
    path: '/home',
    name: 'Default',
    component: ()=>import('../components/page/Home'),
    meta:{title:'首页'},
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
        meta:{title:'用户列表'/*,requireAuth:true*/},
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
        /*meta:{title:'预算指标',requireAuth:true},*/
      },
      {
        path:'/agency_budget_apply',
        name:'AgencyBudgetApply',
        component:AgencyBudgetApply,
        meta:{title:'新建申报'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list',
        name:'BudgetApplyList',
        component:BudgetApplyList,
        meta:{title:'申报列表'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list2',
        name:'BudgetApplyList2',
        component:BudgetApplyList2,
        meta:{title:'申报列表'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list3',
        name:'BudgetApplyList3',
        component:BudgetApplyList3,
        meta:{title:'申报列表'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list4',
        name:'BudgetApplyList4',
        component:BudgetApplyList4,
        meta:{title:'申报列表'/*,requireAuth:true*/},
      },
      {
        path:'/agency_project_list',
        name:'AgencyProjectList',
        component:AgencyProjectList,
        meta:{title:'项目列表'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_details',
        name:'MyBudgetApply',
        component:BudgetApplyDetails,
        meta:{title:'申请详情'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_details2',
        name:'BudgetApplyDetails2',
        component:BudgetApplyDetails2,
        meta:{title:'申请详情'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_details3',
        name:'BudgetApplyDetails3',
        component:BudgetApplyDetails3,
        meta:{title:'申请详情'/*,requireAuth:true*/},
      },
      {
        path:'/draft_budget',
        name:'DraftBudget',
        component:DraftBudget,
        meta:{title:'单位预算草案'/*,requireAuth:true*/},
      },
      {
        path:'/draft_budget2',
        name:'DraftBudget2',
        component:DraftBudget2,
        meta:{title:'部门预算草案'/*,requireAuth:true*/},
      },
      {
        path:'/draft_budget_list',
        name:'DraftBudgetList',
        component:DraftBudgetList,
        meta:{title:'单位预算草案列表'/*,requireAuth:true*/},
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
        meta:{title:"项目列表",requireAuth:true}
      },

      {
        path: '/pay_voucher',
        name:'PayVoucher',
        component:PayVoucher,
        meta: {title: '支付凭证',requireAuth:true}
      },
      {
        path: '/pay_voucher_list1',
        name:'PayVoucherList1',
        component:PayVoucherList1,
        meta: {title: '支付凭证回单',requireAuth:true}
      },
      {
        path: '/capital_liquidation',
        name:'CapitalLiquidation',
        component:CapitalLiquidation,
        meta: {title: '资金清算',requireAuth: true}
      },
      {
        path: '/liquidation',
        name:'Liquidation',
        component:Liquidation,
        meta: {title: '清算凭证',requireAuth: true}
      },
      {
        path: '/bgt_pm',
        name:'Bgt_pm',
        component:Bgt_pm,
        meta: {title: '预算申请管理',requireAuth: true}
      },
      {
        path: '/pro_apply',
        name:'ProApply',
        component:ProApply,
        meta: {title: '项目申报',requireAuth: true},
        children:[
          {
            path: '/pro_apply/add',
            name:'ProApply_add',
            component:ProApply_add,
            meta:{title:"新建项目",requireAuth:true}
          },
          {
            path: '/pro_apply/exam',
            name:'ProApply_exam',
            component:ProApply_exam,
            meta:{title:"审核项目申报",requireAuth:true}
          },
        ]
      },
      {
        path: '/view_pro_progress',
        name: 'ViewProProgress',
        component:ViewProProgress,
        meta:{title:"查看详细",requireAuth:true}
      },
      {
        path: '/draft_app',
        name: 'DraftApproval',
        component:DraftApproval,
        meta:{title:"草案批准",requireAuth:true}
      },
      {
        path: '/reply_navi',
        name: 'ReplyNavi',
        component:ReplyNavi,
        meta:{title:"批复导航",requireAuth:true}
      },
      {
        path: '/target_down',
        name: 'TargetDown',
        component:TargetDown,
        meta:{title:"预算指标下达",requireAuth:true}
      },
      {
        path: '/ac_target',
        name: 'AcTarget',
        component:AcTarget,
        meta:{title:"单位接受指标",requireAuth:true}
      },
      {
        path: '/target_detail',
        name:'TargetDetail',
        component:TargetDetail,
        meta:{title:"指标详细",requireAuth:true}
      },
      {
        path: '/add_pay',
        name:'AddPay',
        component:AddPay,
        meta:{title:"可选指标",requireAuth:true}
      },
      {
        path: '/add_pay_2',
        name:'AddPay2',
        component:AddPay2,
        meta:{title:"新建申请",requireAuth:true}
      },
      {
        path: '/pay_voucher_list',
        name:'PayVoucherList',
        component:PayVoucherList,
        meta:{title:"单位凭证列表",requireAuth:true}
      },
      {
        path: '/pay_voucher_detail',
        name: 'PayVoucherDetail',
        component:PayVoucherDetail,
        meta:{title:"凭证详情",requireAuth:true}
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
    let token=getToken();//JWT
    let username=getUsernameToken();//用户名
    if (token) {
      //判断用户信息是否已获取，这里只能通过长度判断
      //正常情况下刷新会丢失store里的状态,因此每次跳转前获取一次（存在性能问题）
      if (store.state.user_info.info.length===0){
        getInfo(username).then(res=>{
          const data=res;
          store.dispatch('user_info/setInfo', {data}).then(()=>{
            next()
          });
        }).catch(err=>console.log(err))

      }else {
        next()
      }
    }else {
      next({path: '/Login'})
    }
  } else {
    next()
  }
});

export default router
