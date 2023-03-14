// pages/goodsDetail/goodsDetail.js
const config = require('../../config.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id  = options.id;
    console.log(id);
    this.getDetail(options.id);
  },
  getDetail(id){
    var _this = this;
    config.api.post(config.host + "/api/goods/detail",{id:id}).then((res) => {
      console.log(res); //正确返回结果
      if (res.success) {
        var detail = res.data;
        var imgs = [];
        if(detail.imgs){
          var linImgs = detail.imgs.split(',');
          for(var d of linImgs){
            imgs.push(config.host+d);
          }
        }
        detail.imgs = imgs;
        _this.setData({ 
          detail:detail
        });
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