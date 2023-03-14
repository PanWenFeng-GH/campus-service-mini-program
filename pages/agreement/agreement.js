const config = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{content:'1.商务合作'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    console.log(options);
    var _this = this;
    config.api.post(config.host + "/api/set/getLaster",{}).then((res) => {
      console.log(res); //正确返回结果
      if (res.success) {
        if(type == "1"){
          var detail  = {content:res.data.data1};
          _this.setData({
            detail:detail
          });
        }else if(type == "2"){
          var detail  = {content:res.data.data2};
          _this.setData({
            detail:detail
          });
        }else if(type == "3"){
          var detail  = {content:res.data.data3};
          _this.setData({
            detail:detail
          });
        }
      }
    });
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