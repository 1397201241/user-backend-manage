/*
* token的setter,getter以及remove
* */
//cookie的轻量化API
import Cookies from 'js-cookie'

const TokenKey='admin-Token';

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
