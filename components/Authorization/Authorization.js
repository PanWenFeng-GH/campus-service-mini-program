// import {
//   getUserInfo
// } from "../../apis/home";
import history from "../../utils/history";
import {
  stringify
} from '../../utils/qs'

// compnents/Authorization/Authorization.js
/**
 * userInfo
 * pageError
 */
Component({
  /**
   * @description 组件的属性列表
   */
  properties: {
    pageError: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageLoading: true,
    errMsg: null
  },
  lifetimes: {
    attached() {
      this.onLoad()
    },
  },

  pageLifetimes: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      getUserInfo().then(res => {
        this.setData({
          userInfo: res.data,
          pageLoading: false,
          errMsg: null
        })
        this.triggerEvent("userInfo", res.data)
      }).catch((error) => {
        console.log('error', error);
        this.setData({
          userInfo: null,
          errMsg: error,
          pageLoading: false,
        })
      })
    },
    onLoginSuccess() {
      // this.onLoad()
      setTimeout(() => {
        const route = getCurrentPages()[getCurrentPages().length - 1]
        const params = route.options
        wx.reLaunch({
          url: `/${route.route}?${stringify(params)}`,
        })
      }, 10)
    },
    // 去上传，携带建盏id
    linkUpload() {
      const {
        pageError
      } = this.data
      history.push('/pages/upload/upload', {
        params: {
          id: pageError.data.id
        }
      })
    }
  }
})