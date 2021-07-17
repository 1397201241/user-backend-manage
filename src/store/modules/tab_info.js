import router from "../../router";
const state = () => ({
  openTab:[],//所有打开的路由
  activeIndex:'' , //也可以是默认激活路径；激活状态
  isTabShow:false
});

// getters 相当于计算属性
const getters = {
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
  CLEAN_TABS(state){
    state.openTab=[]
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
    state.openTab.push(data)
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
        "/liquidation":"清算凭证",
        "/bgt_pm":"预算申请管理",
        "/pro_apply":"项目申报",
        "/budget_index":"预算指标",
        "/agency_budget_apply":"单位预算申报",
        "/budget_apply_details":"预算申报详情",
        "/budget_apply_details2":"预算申报详情",
        "/budget_apply_details3":"预算申报详情",
        "/budget_apply_list":"预算申报列表",
        "/agency_project_list":"单位项目列表",
        "/budget_apply_list2":"预算申请列表",
        "/draft_budget":"单位预算草案",
        "/draft_budget2":"部门预算草案",
      };
      //通过路由的判断，来加入标签页的名称
      if(path_name_list[path]){
        commit('CHECK_EXIST',path);
        if(!state.isTabShow){
          commit('ADD_TABS', {route: path , name: path_name_list[path]});
        }
      }
      commit('SET_ACTIVE_INDEX', path);
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
