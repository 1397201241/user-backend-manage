import {
    getToken,
    setToken,
} from '../../utils/auth'
import {
    getInfo,
    getPermission,
    getPermissionID,
    getUserRole,
    login
} from '../../api/user'
import request from "../../utils/request";

// 登录组件状态信息
const state = () => ({
    token: getToken(),
    username: '',
    //账户信息
    role: '',
    users: [],
    info: [], //用户信息
    //权限信息
    permissions: []

});
const getters = {

}
// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    //全体用户账号密码，todo:不安全做法
    SET_USER: (state, users) => {
        state.users = users
    },
    //设置用户信息
    SET_INFO: (state, info) => {
        /*const npc = /^\d+0{6}$/;
        const mof = /^\d+0{4}$/;
        const dep = /^\d+0{2}$/;
        if(npc.test(info.agencyCode)){
            state.role="人大代表"
        }else if (mof.test(info.agencyCode)){
            state.role="财政人员"
        }else if (dep.test(info.agencyCode)){
            state.role="部门人员"
        }else{
            state.role="单位人员"
        }*/
        state.info = info;
    },
    //设置用户信息
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions;
    }
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {
    login({commit},params) {
        const {loginForm} = params
        return new Promise((resolve => {
            login(loginForm).then(res =>{
                if (res.status === 200){
                    commit('SET_TOKEN',res.headers.authorization)
                    setToken(res.headers.authorization)
                    resolve()
                }
            })
        }))
    },
    /**
     * @description 设置用户基本信息
     * @param commit
     * @param params
     * @return {Promise<unknown>}
     */
    setInfo: ({commit}, params) => {
        commit('SET_INFO', params.data)
    },
    //获取用户账号密码
    getUser: ({commit}) => {
        request({
            url: '/user',
            method: 'get'
        }).then(res => {
            commit('SET_USER', res)
        }).catch(err => console.log(err));
    },
    /**
     * @description 用户匹配验证
     * @todo 后端集成
     * @param commit
     * @param state
     * @param params
     */
    authenticationUser({commit, state}, params) {
        return new Promise((resolve) => {
            for (const user of state.users) {
                //用户匹配判断
                if (params.username === user.username && params.decryptPassword === user.password) {
                    //服务端
                    commit('SET_TOKEN', params.username);
                    //客户端
                    setToken(params.username);
                    resolve()
                }
            }
        });
    },
    /**
     * @description 获取用户基本信息
     * @param commit
     * @param state
     * @return {Promise<unknown>}
     */
    getInfo({
        commit,
        state
    }) {
        return new Promise(() => {
            //获取username(即token)对应的用户信息
            getInfo(state.token)
                .then(response => {
                    //基本信息
                    const info = response;
                    const permissions = [];
                    const permissionRequest = [];
                    //获取用户ID对应的角色ID
                    getUserRole(info.id).then(res => {
                            const user_role = res;
                            //获取角色ID对应的权限ID
                            getPermissionID(user_role.rid)
                                .then(permission_id => {
                                    info.rid = user_role.rid;
                                    info.permission_id = permission_id;
                                    commit('SET_INFO', info);
                                    for (const id of permission_id) {
                                        permissionRequest.push(
                                            //获取权限ID对应的权限
                                            getPermission(id).then(permission => {
                                                const {
                                                    title
                                                } = permission;
                                                return title;
                                            })
                                            .catch(err => new Error("获取权限信息失败" + err))
                                        )
                                    }
                                    Promise.allSettled(permissionRequest).then(result => {
                                        for (const item of result) {
                                            if (item.status === 'fulfilled') {
                                                permissions.push(item.value)
                                            }
                                        }
                                        commit('SET_PERMISSIONS', permissions);
                                    }); // TODO: 要不要捕获错误？
                                })
                                .catch(err => new Error("获取角色权限失败" + err))
                        })
                        .catch(err => new Error("获取用户角色信息失败" + err));
                })
                .catch(err => new Error("获取用户信息失败" + err))
        });
    },
    /**
     * @description 获取公钥
     */
    getPublicKey() {
        return request({
                url: '/JSEncrypt',
                method: 'get'
            })
            .then(myJson => {
                const res = myJson;
                const jsEncrypt = res[0];
                return jsEncrypt.publicKey
            })
            .catch(err => console.log(err));
    },
    /**
     * @description 获取私钥
     */
    getPrivateKey() {
        return request({
                url: '/JSEncrypt',
                method: 'get'
            })
            .then(myJson => {
                const res = myJson;
                const jsEncrypt = res[0];
                return jsEncrypt.privateKey
            })
            .catch(err => console.log(err));
    },

};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}