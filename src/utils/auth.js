/*
* token的setter,getter以及remove
* */
//cookie的轻量化API
import Cookies from 'js-cookie'

const TokenKey='token';
const username='username';

export function getToken() {
    return Cookies.get(TokenKey)
}
export function getUsernameToken() {
    return Cookies.get(username)
}
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function setUsernameToken(token) {
    console.log("sadasda")
    return Cookies.set(username, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function removeUsernameToken() {
    return Cookies.remove(username)
}
