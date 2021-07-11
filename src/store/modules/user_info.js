import {getToken, setToken,} from '../../utils/auth'
import {getInfo, getPermission, getUserRole,getPermissionID} from '../../api/user'
import {get} from "../../utils/request";
// 登录组件状态信息
const state = () => ({
    token:getToken(),
    //账户信息
    user: [],
    //用户信息
    info:[],
    //权限信息
    permissions:[]

});

// getters 相当于计算属性
const getters = {
    info:state=>{
        return state.info
    }
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    //全体用户账号密码，todo:不安全做法
    SET_USER: (state, user) => {
        state.user=user
    },
    //设置用户信息
    SET_INFO: (state, info) => {
        state.info=info;
    },
    //设置用户信息
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions=permissions;
    }
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {
    //获取用户账号密码
    getUser: ({commit}) => {
        get('http://localhost:3000/user').then(res=>{
            commit('SET_USER',res)
        }).catch(err=>console.log(err));
    },
    //用户验证
    authenticationUser({commit,state}, params) {
        return new Promise((resolve) => {
            //todo:下面需要封装为一个登录的API
            for (let user of state.user){
                //用户匹配判断
                if (params.username===user['username']&&params.decryptPassword===user['password']){
                    //服务端
                    commit('SET_TOKEN',params.username);
                    //客户端
                    setToken(params.username);
                    resolve()
                }
            }
        });
    },
    getInfo({commit,state}) {
        return new Promise(() => {
            //获取username(即token)对应的用户信息
            getInfo(state.token)
                .then(response=>{
                    //基本信息
                    const info=response;
                    let permissions=[];
                    let permissionRequest=[];
                    //获取用户ID对应的角色ID
                    getUserRole(info.id).then(res=>{
                        const user_role=res;
                        //获取角色ID对应的权限ID
                        getPermissionID(user_role.rid)
                            .then(permission_id=>{
                                info.rid=user_role.rid;
                                info.permission_id=permission_id;
                                for (const id of permission_id){
                                    permissionRequest.push(
                                        //获取权限ID对应的权限
                                        getPermission(id).then(permission=>permission.title)
                                            .catch(err=>{
                                                console.log(err)
                                            })
                                    )
                                }
                                Promise.allSettled(permissionRequest).then(res=>{
                                    for (const item of res){
                                        if(item.status==='fulfilled'){
                                            permissions.push(item.value)
                                        }
                                    }
                                }).then(()=>{
                                    commit('SET_PERMISSIONS',permissions);
                                });
                                commit('SET_INFO',info);
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                    })
                        .catch(err=>{
                            console.log(err)
                        });
                })
                .catch(err=> {
                    console.log(err)
                })
        });
    },
    //获取公钥
    getPublicKey(){
        return get('http://localhost:3000/JSEncrypt')
            .then(myJson=>myJson[0].publicKey)
            .catch(err=> console.log(err));
    },
    //获取私钥
    getPrivateKey(){
        return get('http://localhost:3000/JSEncrypt')
            .then(myJson=>myJson[0].privateKey)
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
