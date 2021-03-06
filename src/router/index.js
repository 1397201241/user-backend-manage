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
    meta:{title:'??????'},
    component: ()=>import('../views/Home')
  },
  {
    path: '/renderer',
    name: 'Renderer',
    meta:{title: '?????????'},
    component: ()=>import('../components/vxeTable/Renderers')
  },
  {
    path: '/drumKit',
    name: 'DrumKit',
    meta:{title: '?????????'},
    component: ()=>import('../views/DrumKit')
  },
  {
    path: '/atable',
    name: 'ATable',
    meta:{title:'??????'},
    component: ()=>import('../views/test/aTable')
  },
  {
    path: '/ActionBar',
    name: 'ActionBar',
    meta:{title:'?????????',requireAuth:true},
    component: ActionBar
  },
  {
    path: '/login',
    name: 'Login',
    /*meta:{title:'????????????',requireAuth:true},*/
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
    meta:{title:'??????'},
    children:[
      {
        path:'/reply',
        name:'Reply',
        component:Reply,
        meta:{title:'????????????',requireAuth:true},
      },
      {
        path:'/users',
        name:'Users',
        component:Users,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/payApply',
        name:'payApply',
        component:PayApply,
        meta:{title:'????????????',requireAuth:true},
      },
      {
        path:'/PayCheck',
        name:'PayCheck',
        component:PayCheck,
        meta:{title:'????????????',requireAuth:true},
      },
      {
        path:'/role_list',
        name:'RoleList',
        component:RoleList,
        meta:{title:'????????????',requireAuth:true},
      },
      {
        path:'/agency',
        name:'Agency',
        component:Agency,
        meta:{title:'????????????',requireAuth:true},
      },
      {
        path:'/budget_index',
        name:'BudgetIndex',
        component:BudgetIndex,
        /*meta:{title:'????????????',requireAuth:true},*/
      },
      {
        path:'/agency_budget_apply',
        name:'AgencyBudgetApply',
        component:AgencyBudgetApply,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list',
        name:'BudgetApplyList',
        component:BudgetApplyList,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list2',
        name:'BudgetApplyList2',
        component:BudgetApplyList2,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list3',
        name:'BudgetApplyList3',
        component:BudgetApplyList3,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_list4',
        name:'BudgetApplyList4',
        component:BudgetApplyList4,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/agency_project_list',
        name:'AgencyProjectList',
        component:AgencyProjectList,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_details',
        name:'MyBudgetApply',
        component:BudgetApplyDetails,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_details2',
        name:'BudgetApplyDetails2',
        component:BudgetApplyDetails2,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/budget_apply_details3',
        name:'BudgetApplyDetails3',
        component:BudgetApplyDetails3,
        meta:{title:'????????????'/*,requireAuth:true*/},
      },
      {
        path:'/draft_budget',
        name:'DraftBudget',
        component:DraftBudget,
        meta:{title:'??????????????????'/*,requireAuth:true*/},
      },
      {
        path:'/draft_budget2',
        name:'DraftBudget2',
        component:DraftBudget2,
        meta:{title:'??????????????????'/*,requireAuth:true*/},
      },
      {
        path:'/draft_budget_list',
        name:'DraftBudgetList',
        component:DraftBudgetList,
        meta:{title:'????????????????????????'/*,requireAuth:true*/},
      },
      {
        path: '/welcome',
        name:'Welcome',
        component:Welcome,
        meta: {title: '????????????',requireAuth:true}
      },
      {
        path: '/project',
        name:'Project',
        component:Project,
        meta:{title:"????????????",requireAuth:true}
      },

      {
        path: '/pay_voucher',
        name:'PayVoucher',
        component:PayVoucher,
        meta: {title: '????????????',requireAuth:true}
      },
      {
        path: '/pay_voucher_list1',
        name:'PayVoucherList1',
        component:PayVoucherList1,
        meta: {title: '??????????????????',requireAuth:true}
      },
      {
        path: '/capital_liquidation',
        name:'CapitalLiquidation',
        component:CapitalLiquidation,
        meta: {title: '????????????',requireAuth: true}
      },
      {
        path: '/liquidation',
        name:'Liquidation',
        component:Liquidation,
        meta: {title: '????????????',requireAuth: true}
      },
      {
        path: '/bgt_pm',
        name:'Bgt_pm',
        component:Bgt_pm,
        meta: {title: '??????????????????',requireAuth: true}
      },
      {
        path: '/pro_apply',
        name:'ProApply',
        component:ProApply,
        meta: {title: '????????????',requireAuth: true},
        children:[
          {
            path: '/pro_apply/add',
            name:'ProApply_add',
            component:ProApply_add,
            meta:{title:"????????????",requireAuth:true}
          },
          {
            path: '/pro_apply/exam',
            name:'ProApply_exam',
            component:ProApply_exam,
            meta:{title:"??????????????????",requireAuth:true}
          },
        ]
      },
      {
        path: '/view_pro_progress',
        name: 'ViewProProgress',
        component:ViewProProgress,
        meta:{title:"????????????",requireAuth:true}
      },
      {
        path: '/draft_app',
        name: 'DraftApproval',
        component:DraftApproval,
        meta:{title:"????????????",requireAuth:true}
      },
      {
        path: '/reply_navi',
        name: 'ReplyNavi',
        component:ReplyNavi,
        meta:{title:"????????????",requireAuth:true}
      },
      {
        path: '/target_down',
        name: 'TargetDown',
        component:TargetDown,
        meta:{title:"??????????????????",requireAuth:true}
      },
      {
        path: '/ac_target',
        name: 'AcTarget',
        component:AcTarget,
        meta:{title:"??????????????????",requireAuth:true}
      },
      {
        path: '/target_detail',
        name:'TargetDetail',
        component:TargetDetail,
        meta:{title:"????????????",requireAuth:true}
      },
      {
        path: '/add_pay',
        name:'AddPay',
        component:AddPay,
        meta:{title:"????????????",requireAuth:true}
      },
      {
        path: '/add_pay_2',
        name:'AddPay2',
        component:AddPay2,
        meta:{title:"????????????",requireAuth:true}
      },
      {
        path: '/pay_voucher_list',
        name:'PayVoucherList',
        component:PayVoucherList,
        meta:{title:"??????????????????",requireAuth:true}
      },
      {
        path: '/pay_voucher_detail',
        name: 'PayVoucherDetail',
        component:PayVoucherDetail,
        meta:{title:"????????????",requireAuth:true}
      }
    ],
  },
]

const router = new VueRouter({
  routes
});

//???????????????????????????(????????????)
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    let token=getToken();//JWT
    let username=getUsernameToken();//?????????
    if (token) {
      //??????????????????????????????????????????????????????????????????
      //??????????????????????????????store????????????,?????????????????????????????????????????????????????????
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
