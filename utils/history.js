import {
  stringify
} from './qs'
import {
  verify
} from '../apis/index'
import PAGE from '../constants/pages'

class History {
  /**
   * @param {String} url
   * @param {{
   *  auth: Boolean
   *  params: Object
   * }} config
   */
  async push(url, config = {}) {
    if (config.auth) {
      try {
        const hasAuth = await verify()
        if (hasAuth) {
          wx.navigateTo({
            url: `${url}?${stringify(config.params)}`,
          })
        } else {
          wx.navigateTo({
            url: `${PAGE.LOGIN}?redirect=${url}`
          })
        }
      } catch (error) {
        console.log(error);
      }

    } else {
      wx.navigateTo({
        url: `${url}?${stringify(config.params)}`,
      })
    }


  }
  back(delta = 0) {
    wx.navigateBack({
      delta,
    })
  }
  replace(url, config = {}) {
    wx.redirectTo({
      url,
    })
  }
}

export default new History()