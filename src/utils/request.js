import axios from "axios";
import store from '../store'
import {getToken} from "../utils/auth";
import {Message, MessageBox} from "element-ui";

const service=axios.create({
  baseURL:'http://localhost:3000',//json-server
  timeout:5000
})
/**
 * 请求拦截
 */
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        console.error(error)
        return Promise.reject()
    })
/**
 * 相应拦截
 * 与fetch()相比，不用进行response.json()
 */
service.interceptors.response.use(
    response => {
      const {status}=response
      const {data}=response
      if (status!==200){
        Message({
          message: response.statusText || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (status===50008||status===50012||status===50014){
          MessageBox.confirm(
              'You have been logged out, you can cancel to stay on this page, or log in again',
              'Confirm logout',
              {
                confirmButtonText: 'Re-login',
                cancelButtonText: 'Cancel',
                type: 'warning'
              })
              .then(()=>{
                store.dispatch('user_info/resetToken').then(()=>{
                  location.reload()
                })
              })
        }
        return Promise.reject(new Error(response.statusText || 'Error'))
      }
      else {
        return data
      }
    },
    error=>{
      console.log(error)
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject()
    })
export default service
/**
 *
 * @param method
 * @param url
 * @param body
 */
/*export default function request(method:string, url:string,body?:any) {
  if (method === "GET") {
    body = undefined;
  } else {
    //转化为json
    if(typeof body !== "string"){
      body = body && JSON.stringify(body);
      console.log("要传的数据",body)
    }
  }
  return fetch(url, {
    method,
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json',
      "Origin": '*',
      "Access-Control-Allow-Origin": '*',
    },
    mode:"cors",
    body
  })
      .then(res => res.json()) //使用json()读取并解析数据
}
export const get = (url:string) => request('GET', url);
export const post = (url:string, body:any) => request('POST', url, body);
export const put = (url:string, body:any) => request('PUT', url, body);
export const del = (url:string, body:any) => request('DELETE', url, body);*/
