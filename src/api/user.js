import request from '../utils/request'
import querystring from "querystring";

/**
 * @description 获取用户基本信息
 * @param token {string} 存储在浏览器cookie的token(这里是用户名)
 * @return {Promise<any | void>} 用户基本信息
 */
/*export function getInfo(token) {
    return fetch('http://localhost:3000/user?username='+token)
        .then(res=>res.json())
        .then(myJson=>myJson[0])
        .catch(err=>new Error("获取用户基本信息失败"+err));
}*/
export function getVerificationCode() {
    return request({
        url: '/captcha',
        method: 'get'
    })
}
export function login(loginForm){
    return request({
        url: '/login?' + querystring.stringify(loginForm),
        method: 'post'
    })
}
/**
 * @description 获取用户基本信息
 * @param username {string} 存储在浏览器cookie的token(这里是用户名)
 * @return {Promise<any | void>} 用户基本信息
 */
export function getInfo(username) {
    return request({
        url: '/user?username=' + username,
        method: 'get'
    }).then((res)=>res[0])
        .catch(err => new Error("获取用户基本信息失败" + err));
}
/**
 * @description 获取用户的角色信息
 * @param uid {number} 用户ID
 * @return {Promise<any | void>} 用户角色信息
 */
export function getUserRole(uid) {
    return request.get('/user_role?uid='+uid)
        .then((myJson)=>myJson[0])
        .catch(err=> console.log(err));
}

/**
 * @description 获取角色的权限ID信息
 * @param rid {number} 角色ID
 * @return {Promise<[] | void>} permission_id 权限ID
 */
export function getPermissionID(rid) {
    return request.get('/role_permission?rid='+rid)
        .then((myJson)=>myJson[0].permission_id)
        .catch(err=> console.log(err));
}
/**
 * @description 获取权限信息
 * @param permission_id {number} 权限id
 * @return {Promise<any | void>} 权限信息
 */
export function getPermission(permission_id) {
    return request.get('/permission/'+permission_id).catch(err=> console.log(err));
}

/**
 * @description 获取包含用户基本信息的列表
 * @return {Promise<*>} 用户列表
 */
export function getUsers() {
    return request.get('/user')
        .catch(err=>{
            console.log(err)
        })
}

/**
 * @description 修改用户角色信息
 * @param id {number} 用户角色的ID
 * @param newUserRole {string} 用户角色信息
 * @return {Promise<* | void>}
 */
export function changeUserRole(id, newUserRole) {
    return request.put('/user_role/'+id, newUserRole)
        .catch(err=> console.log(err))
}

/**
 * @description 获取角色信息
 * @return {Promise<* | void>} 角色信息 {id, name, description}
 */
export function getRole() {
    return request.get('http://localhost:3000/role').catch(err=>console.log(err))
}

/**
 * @description 获取角色的权限信息
 * @param rid {number} 角色ID
 * @return {Promise<* | void>}
 */
export function getRolePermission(rid) {
    return request.get('http://localhost:3000/role_permission?rid='+rid)
        .then((myJson)=>myJson[0])
        .catch(err=>console.log(err))
}
/**
 * @description 修改角色权限信息
 * @param id {number} 角色权限信息的ID
 * @param newRolePermission {string} 新的角色权限信息
 * @return {Promise<* | void>}
 */
export function changeRolePermission(id, newRolePermission) {
    return request.put('http://localhost:3000/role_permission/'+id, newRolePermission)
        .catch(err=> console.log(err))
}

