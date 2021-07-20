import {del, get, post, put} from "../../utils/request";
// 登录组件状态信息
const state = () => ({
    //用户信息
    budgetIndex: [],
});

// getters 相当于计算属性
const getters = {

};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
    //全体用户账号密码，todo:不安全做法
    SET_BUDGET_INDEX: (state, budgetIndex) => {
        state.budgetIndex=budgetIndex
    },
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {

    /**
     * @description 获取支付申请
     * @param commit
     * @return {Q.Promise<void>}
     */
    getBudgetIndex ({commit}) {
        return get('http://localhost:3000/bm_ba_bgt_info').then(res=>{
            commit('SET_BUDGET_INDEX',res)
        }).catch(err=>console.log(err));
    },
    /**
     * @description 添加用户
     * @param dispatch
     * @param params
     * @return {Q.Promise<void>}
     */
    addPayApply({dispatch}, params) {
        return post("http://localhost:3000/bm_ba_bgt_info", params.newPayApply)
            .then(() => {
                    dispatch('getBudget')
                }
            ).catch(err => console.log(err));
    },
    /**
     * @description 停用数据
     * @param dispatch
     * @param params
     */
    deletePayApply({dispatch}, params){
        const deleteRequest=[];
        for (const user of params.multipleSelection){
            deleteRequest.push(
                del('http://localhost:3000/bm_ba_bgt_info/'+user.BGT_ID)
            )
        }
        Promise.allSettled(deleteRequest).then(res => {
            for (const item of res) {
                if (item.status === 'fulfilled') {
                    console.log(item)
                }else {
                    console.log('删除失败')
                }
            }
            dispatch('getBudget')
        });
    },
    /**
     * @description 启用数据
     * @param dispatch
     * @param params
     */
    enableUser({dispatch},params){
        const enableRequest=[];
        for (const user of params.multipleSelection){
            user.STATUS=user.STATUS===1?0:1;
            enableRequest.push(
                put('http://localhost:3000/USERS/'+user.USER_ID,user)
            )
        }
        Promise.allSettled(enableRequest).then(res => {
            for (const item of res) {
                if (item.status === 'fulfilled') {
                    console.log(item)
                }else {
                    console.log('删除失败')
                }
            }
            dispatch('getUsers')
        });
    },
    /**
     * @description 修改用户
     * @param dispatch
     * @param params
     * @return {Q.Promise<void>}
     */
    changeBudget({dispatch}, params){
        return put("http://localhost:3000/bm_ba_bgt_info/"+params.newPayApply.id,params.newPayApply)
            .then(()=>{
                //刷新
                dispatch('getBudget')
            })
            .catch(err=> console.log(err));
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
