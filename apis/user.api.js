import {
  request
} from "../utils/api"

const base = 'api/user'

/**
 * 小程序授权登录
 * @param params {{code: string;  user_info: object;}}
 * @returns {Promise<{user_id: string;token:string}>}
 */
export async function loginApi(params) {
  return request(`${base}/login`, {
    method: "post",
    data: params
  })
}
/** 
 * 用户详细信息授权接口
 * 
 */
export async function detailApi() {
  return request(`${base}/detail`, {
    method: "get",
  })
}