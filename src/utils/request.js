//默认导出
export default function request(method, url, body) {
  if (method === "GET") {
    body = undefined;
  } else {
    //转化为json
    body = body && JSON.stringify(body);
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body
  })
      //使用json()读取并解析数据
      .then(res => res.json())
}
export const get = (url) => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);
