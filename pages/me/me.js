const config = require('../../config.js')
const app = getApp()

// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo:false
  },
  onLogout() {
    const _this = this
    wx.clearStorage({
      success: (res) => {
        _this.setData({
          userInfo: null
        })
        wx.showToast({
          title: '退出成功',
        })
      },
    })
  },
  getPhoneNumber(e) {
    console.log(e);
  },
  onLogin() {
    /*wx.navigateTo({
      url: '/pages/login/login',
    })*/
  },
  /**
   * 生命周期函数--监听页面加载
   * detailApi().then(res => {
      this.setData({
        userInfo: res.data.userInfo
      })

    }).catch((err) => {
      console.log(err);
    })
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /*isFromLogin(() => {
      this.onLoad()
    })*/
    let token = wx.getStorageSync('token');
    //console.log(token);
    if(token){
      //app.globalData.hasLogin = true;
      config.api.post(config.host + "/api/getUserInfo",{}).then((res) => {
        //console.log(res); //正确返回结果
        if (res.success) {
          //app.setToken(res.data.token);
          var userInfo = res.data;
          this.setData({
            userInfo: userInfo
          })
          app.globalData.userInfo = userInfo;
          app.setUserInfo(userInfo);
        }
      });
    }
  },
  userLoginEvent: function (encryptedData, iv, code, nickName, avatarUrl) {
    config.api.post(config.host + "/api/getOpenId", {
      encryptedData: encryptedData,
      iv: iv,
      code: code,
      avatarUrl: avatarUrl,
      nickName: nickName,
    }).then((res) => {
      console.log(res); //正确返回结果
      if (res.success) {
        app.setToken(res.data.token);
      }
    });
  },
  getUserProfile(e) {
    let _this = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log(111);
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        wx.login({
          success(obj) {
            let code = obj.code;
            _this.userLoginEvent(res.encryptedData, res.iv, code, res.userInfo.nickName, res.userInfo.avatarUrl);
          }
        });
        var userInfo  = {
          wxHeadimgurl: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName,
        }
        this.setData({
          userInfo: userInfo
        })
        app.globalData.userInfo = userInfo;
        app.setUserInfo(userInfo);
      }
    })
  },
})