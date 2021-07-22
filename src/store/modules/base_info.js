import {setToken,} from '../../utils/auth'
import {getInfo, getPermission, getUserRole, getPermissionID} from '../../api/user'
import {del, get, put} from "../../utils/request";
// 登录组件状态信息
const state = () => ({
    //用户信息
    users: [],

});

// getters 相当于计算属性
const getters = {
    info:state=>{
        return state.info
    }
};

// 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
const mutations = {
    //全体用户账号密码，todo:不安全做法
    SET_USERS: (state, users) => {
        state.users=users
    },
    //设置用户信息
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions=permissions;
    }
};

// actions 内部可以执行异步操作，context.commit()提交mutations来修改状态
const actions = {
    //获取用户账号密码
    getUsers ({commit}) {
        return fetch('http://192.168.110.85:8001/bm-fasp-tcauser/list/',{
            method:'GET',
            mode:'cors'
        })
            .then(res=>res.json())
            .then(res=>{
                const data=res.data;
                commit('SET_USERS',data)
                /*console.log(data)
                for (const user of data){
                    let newUser=user;
                    fetch('http://192.168.110.85:8001/bm-bas-agency-info/id/'+user.agencyId,{
                        method:'GET',
                        mode:'cors'
                    })
                        .then(res=>res.json())
                        .then(res=>{
                            newUser.agencyName=res.data.agencyName;
                            newUser.agencyLeaderPerName=res.data.agencyLeaderPerName;
                            newUser.agencyAdd=res.data.agencyAdd;
                            users.push(newUser)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                }
                console.log(users)
                commit('SET_USERS',users)*/
            });
    },
    /**
     * @description 添加用户
     * @param dispatch
     * @param params
     * @return {Q.Promise<void>}
     */
    addUser({dispatch}, params) {
        return fetch('http://192.168.110.79:8002/bm-fasp-tcauser/add',{
            method:'POST',
            headers:{
                "Content-Type": 'application/json',
            },
            body:JSON.stringify(params.newUser),
            mode:'cors'
        })
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                dispatch('getUsers')
            })

       /* return post("http://localhost:3000/USERS", params.newUser)
            .then(() => {

                }
            ).catch(err => console.log(err));*/
    },
    /**
     * @description 停用数据
     * @param dispatch
     * @param params
     */
    deleteUser({dispatch},params){
        const deleteRequest=[];
        for (const user of params.multipleSelection){
            deleteRequest.push(
                del('http://localhost:3000/USERS/'+user.USER_ID)
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
            dispatch('getUsers')
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
    changeUser({dispatch},params){
        return fetch('http://192.168.110.79:8002/bm-fasp-tcauser/update',{
            method:'PUT',
            headers:{
                "Content-Type": 'application/json',
            },
            body:JSON.stringify(params.newUser),
            mode:'cors'
        })
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                dispatch('getUsers')
            })
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
