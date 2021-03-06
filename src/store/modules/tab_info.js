import router from "../../router";

const state = () => ({
  openTab:[],//所有打开的路由
  activeIndex:'' , //也可以是默认激活路径；激活状态
  isTabShow:false,
  isProApplyBtShow:true,
  dsb:"das"
});

// getters 相当于计算属性
const getters = {
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
  CLEAN_TABS(state){
    state.openTab=[]
  },
  CHANGE_PROAPPBTSHOW_TRUE(state){
    state.isProApplyBtShow = true
  },
  CHANGE_PROAPPBTSHOW_FALSE(state){
    state.isProApplyBtShow = false
  },
  CHECK_EXIST(state, name){
    for(let i=0;i<state.openTab.length;i++){
      if(state.openTab[i].route===name){
        console.log("该标签页已存在！");
        state.isTabShow=true;
        return
      }
    }
    state.isTabShow=false
  },
  // 添加tabs
  ADD_TABS(state, data) {
    state.openTab.unshift(data)
  },
  // 添加tabs
  ADD_TABS2(state, data) {
    state.openTab.unshift(data)
  },
  // 删除tabs
  DELETE_TABS (state, route) {
    let index = 0;
    for (let option of state.openTab) {
      if (option.route === route) {
        break;
      }
      index++;
    }
    state.openTab.splice(index, 1);
  },
  // 设置当前激活的tab
  SET_ACTIVE_INDEX (state, index) {
    state.activeIndex = index;
  },
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {
  setTab({commit,state},path){
    console.log(path);
    if (path !== '/' && path !== '/home') {
      let path_name_list = {
        "/users":"用户列表",
        "/roles":"角色列表",
        "/role_list":"权限管理",
        "/payApply":"支付申请",
        "/payCheck":"支付审核",
        "/welcome":"欢迎界面",
        "/project":"项目列表",
        "/agency":"单位管理",
        "/pay_voucher_list1":"支付凭证回单",
        "/pay_voucher":"支付凭证",
        "/capital_liquidation":"资金清算",
        "/liquidation":"清算凭证",
        "/bgt_pm":"预算申请管理",
        "/pro_apply":"项目申报",
        "/view_pro_progress":"项目进度查看",
        "/pro_apply/add":"新建项目申报",
        "/pro_apply/exam":"审核项目申报",
        "/budget":"指标管理",
        "/reply":"预算批复",
        "/draft_app":"草案批准",
        "/reply_navi":"预算批复导航",
        "/target_down":"指标下达",
        "/budget_index":"预算指标",
        "/agency_budget_apply":"单位预算申报",
        "/budget_apply_details":"预算申报详情",
        "/budget_apply_details2":"预算申报详情",
        "/budget_apply_details3":"预算申报详情",
        "/budget_apply_list":"预算申报列表",
        "/agency_project_list":"单位项目列表",
        "/budget_apply_list2":"预算申请列表",
        "/budget_apply_list3":"预算申请列表",
        "/budget_apply_list4":"预算申请列表",
        "/draft_budget":"单位预算草案",
        "/draft_budget2":"部门预算草案",
        "/draft_budget_list":"预算草案列表",
        "/ac_target":"接受预算指标",
        "/target_detail":"指标详情",
        "/add_pay":"新建支付申请",
        "/add_pay_2":"新建申请",
        "/pay_voucher_list":"支付凭证",
        "/pay_voucher_detail":"支付凭证详情"
      };
      //通过路由的判断，来加入标签页的名称
      if(path_name_list[path]){
        commit('CHECK_EXIST',path);
        if(!state.isTabShow){
          commit('ADD_TABS', {route: path , name: path_name_list[path]});
        }
        commit('SET_ACTIVE_INDEX', path)
      }
    } else {
      commit('CHECK_EXIST','/welcome');
      if(!state.isTabShow){
        commit('ADD_TABS', {route: '/welcome', name: '欢迎页面'});
        commit('SET_ACTIVE_INDEX', '/welcome')}
      router.push('/welcome').catch();
    }
  }
  };

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
