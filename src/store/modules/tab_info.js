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
      //通过路由的判断，来加入标签页的名称
      if(path === "/users"){
        commit('CHECK_EXIST','/users');
        if(!state.isTabShow){
          commit('ADD_TABS', {route: path , name: "用户列表"});
        }
      }
      else if(path === "/roles"){
        commit('CHECK_EXIST','/roles');
        if(!state.isTabShow){
          console.log("现在添加角色列表",state.isTabShow);
          commit('ADD_TABS', {route: path , name: "角色列表"});
        }
      }
      else if(path === "/welcome"){
        commit('CHECK_EXIST','/welcome');
        if(!state.isTabShow){
          commit('ADD_TABS', {route: path , name: "欢迎页面"});
        }
      }
      else if(path === "/agency") {
        commit('CHECK_EXIST', '/agency');
        if (!state.isTabShow) {
          commit('ADD_TABS', {route: path, name: "单位管理"});
        }
      }
      else if(path === "/role_list") {
        commit('CHECK_EXIST', '/role_list');
        if (!state.isTabShow) {
          commit('ADD_TABS', {route: path, name: "角色管理"});
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
