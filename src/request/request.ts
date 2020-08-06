/*
 * @Descripttion:
 * @version:
 * @Author: david
 * @Date: 2020-08-05 10:10:52
 * @LastEditors: david
 * @LastEditTime: 2020-08-05 15:28:59
 */
import { request } from 'remax/wechat'

enum Method {
  get = 'GET',
  post = 'POST',
  del = 'DELETE',
  put = 'PUT'
}
export function get(url: string, params?: any): Promise<any> {
  return requestData(Method.get, url, params)
}
function requestData(method: Method, url: string, params: any) {
  return new Promise((resolve: any, reject: any) => {
    request({
      url,
      data: params,
      method: method,
      success: (data) => {
        console.log(data)
        resolve(data.data)
      },
      fail: (err) => {
        console.log(err)
        reject(err)
      }
    })
  })
}
