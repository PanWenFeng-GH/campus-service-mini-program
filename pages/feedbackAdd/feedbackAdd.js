// pages/jobAdd/jobAdd.js
const config = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    content: '',
  },
  onChange(e) {
    // event.detail 为当前输入的值
    //console.log(e.detail);
    this.setData({
      name:e.detail
    });
  },
  onBlur(e){
    //console.log(e.detail);
    this.setData({
      content:e.detail.value
    });
  },
  save() {
    var _this = this;
    var name = this.data.name;
    var content = this.data.content;
    if (name == "") {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return;
    }
    if (content == "") {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: '',
      content: '确认提交内容吗?',
      success(res) {
        if (res.confirm) {
          config.api.post(config.host + "/api/feedback/save", {
            name: _this.data.name,
            content: _this.data.content
          }).then((res) => {
            console.log(res); //正确返回结果
            wx.showToast({
              title: res.message,
              icon: 'none'
            });
            if (res.success) {
              setTimeout(function () {
                wx.switchTab({
                  url: `/pages/me/me`,
                })
              }, 2000);
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})