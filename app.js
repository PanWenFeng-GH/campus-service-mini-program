// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  setToken(token){
    wx.setStorageSync("token",token);
  },
  getToken(){
    let token = wx.getStorageSync("token");
    return token;
  },
  setUserInfo(userInfo){
    wx.setStorageSync("userInfo",userInfo);
  },
  getUserInfo(){
    let userInfo = wx.getStorageSync("userInfo");
    return userInfo;
  },
  globalData: {
    userInfo: null,
    hasLogin:false,
  }
})
