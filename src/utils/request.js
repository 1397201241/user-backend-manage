import axios from "axios";
import store from '../store'
import {Message, MessageBox} from "element-ui";

let baseURL = ''
// 根据node的环境变量，切换项目环境
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:8082';
} else if (process.env.NODE_ENV === 'debug') {
    baseURL = 'http://localhost:8081';
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://localhost:8080';
}
const service = axios.create({
    //baseURL:'http://localhost:3000',//json-server
    baseURL: baseURL,//本地后台
    timeout: 5000
})
/**
 * 请求拦截
 */
service.interceptors.request.use(
    config => {
        let token = store.state.userInfo.token
        token && (config.headers['authorization'] = token)
        return config
    },
    error => {
        console.log(error)
        return Promise.reject()
    })
/**
 * 相应拦截
 * 与fetch()相比，不用进行response.json()
 */
service.interceptors.response.use(
    //响应配置
    response => {
        const {data} = response
        if (data.code !== "200") {
            Message({
                message: response.statusText || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (data.code === "50008" || data.code === "50012" || data.code === "50014") {
                MessageBox.confirm(
                    'You have been logged out, you can cancel to stay on this page, or log in again',
                    'Confirm logout',
                    {
                        confirmButtonText: 'Re-login',
                        cancelButtonText: 'Cancel',
                        type: 'warning'
                    })
                    .then(() => {
                        store.dispatch('user_info/resetToken').then(() => {
                            location.reload()
                        })
                    })
            }
            return Promise.reject(new Error(response.statusText || 'Error'))
        } else {
            // 登录请求时返回 response 以获取认证头
            return response.config.url.search('/login') === -1 ? data : response
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
