const state = () => ({
  openTab:[],//所有打开的路由
  activeIndex:'' , //也可以是默认激活路径；激活状态
});

// getters 相当于计算属性
const getters = {
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
  checkExist(state,name){
    for(let i=0;i<state.openTab.length;i++){
      if(state.openTab[i].route===name){
        return true
      }
    }
    return false
  },
  // 添加tabs
  add_tabs (state, data) {
    state.openTab.push(data)
  },
  // 删除tabs
  delete_tabs (state, route) {
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
  set_active_index (state, index) {
    state.activeIndex = index;
  },
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {
  };

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
