import {
  baseOrigin
} from "../config/index"

export const baseUrl = baseOrigin

function getUrl(url) {
  // 可以传入完整的地址
  if (url.indexOf('https://') !== -1) {
    return url
  }
  return baseUrl + url
}

function errHandle(errorMsg) {
  console.log(errorMsg);
  // 登录失效
  switch (errorMsg.code) {
    // 登录失效
    case -1:
     wx.navigateTo({
       url: '/pages/login/login',
     })
      break;
    case 0:
      wx.showToast({
        title: errorMsg.msg || "未知错误",
        icon: "none"
      })
      return errorMsg

    case 2:
      wx.showModal({
        title: "提示",
        content: errorMsg.msg || "未知错误",
        showCancel: false,

      })
      return errorMsg

    default:
      return errorMsg

  }


}
/**
 * @param {String} url
 * @param {{
 *  data: AnyObject
 *  method: "POST" | "GET"
 * }}option
 */
export function request(url, {
  data: paramsData,
  method,
  ...rest
} = {
  data: {}
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      method: method || "GET",
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        const {
          data,
          statusCode
        } = res
        if (statusCode === 200) {
          if (+data.code === 1) {
            resolve(res.data)
            return
          }

          reject(errHandle(data))
          return
        }
        wx.showToast({
          title: '网络错误',
          icon: "error"
        })
      },
      fail(err) {
        console.error(err)

        reject(err)
      },
      complete() {},
      data: {
        token: wx.getStorageSync('token'),
        ...paramsData,
      },
      ...rest
    })
  })
}