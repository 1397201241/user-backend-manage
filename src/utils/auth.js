/*
* token的setter,getter以及remove
* */
//cookie的轻量化API
// @ts-ignore
import Cookies from 'js-cookie'

const TokenKey='token';
const username='username';

export function getToken() {
    return Cookies.get(TokenKey)
}
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}
export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUsernameToken() {
    return Cookies.get(username)
}

export function setUsernameToken(token) {
    return Cookies.set(username, token)
}

export function removeUsernameToken() {
    return Cookies.remove(username)
}
