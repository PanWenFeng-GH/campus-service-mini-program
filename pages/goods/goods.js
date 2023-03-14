// pages/goods/goods.js
const config = require('../../config.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ifGood = options.ifGood==null?'':options.ifGood;
    this.getGoods(ifGood);
  },
/**
   * 好物
   */
  getGoods(ifGood){
    var _this = this;
    config.api.post(config.host + "/api/goods/list",{limit:10,ifGood:ifGood,page:1}).then((res) => {
      //console.log(res); //正确返回结果
      if (res.success) {
        var goods = [];
        for(var d of res.data){
          d.img = config.host + d.img;
          goods.push(d);
        }
        _this.setData({ 
          goods:goods
        });
      }
    });
  },
  goodsDetail(e) {
    const { item } = e.currentTarget.dataset;
    console.log(item);
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?id='+item.id,
    })
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