import {
  loginApi
} from "./user.api.js";
/**
 * 登录
 * @param {Function} cb 
 * @returns {Promise<any>}
 */
export async function login(cb) {

  wx.getUserProfile({
    desc: '用于完善会员资料',
    success(res) {
      const {
        userInfo
      } = res
      wx.login({
        success(code) {
          wx.showLoading({
            title: "登录中...",
            mask: true
          })
          loginApi({
            code: code.code,
            user_info: JSON.stringify(userInfo)
          }).then(res => {
            wx.hideLoading()
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('userId', res.data.user_id)
            cb()
          }).catch((error) => {
            wx.hideLoading()
            console.log(error);
          })
        }
      })
    },
    fail(err) {
      wx.showToast({
        title: '取消登录',
        icon: "none"
      })
    }
  })
}