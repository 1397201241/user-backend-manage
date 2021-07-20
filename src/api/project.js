import request from "../utils/request";

export const findProjectList= (url,method,body)=> {
  if(method === 'get'){body = ''}
  return request({
    url:url,
    method:method,
    body:body
  })
}
