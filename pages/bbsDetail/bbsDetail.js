// pages/jobDetail/jobDetail.js
const config = require('../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    messageList:[],
    contentValue:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
    this.getDetailList(options.id);
  },
  getDetail(id){
    var _this = this;
    config.api.post(config.host + "/api/bbs/detail",{id:id}).then((res) => {
      console.log(res); //正确返回结果
      if (res.success) {
        _this.setData({ 
          detail:res.data
        });
      }
    });
  },
  getDetailList(id){
    var _this = this;
    config.api.post(config.host + "/api/bbs/comment/list",{bbsId:id}).then((res) => {
      console.log(res); //正确返回结果
      if (res.success) {
        _this.setData({ 
          messageList:res.data
        });
      }
    });
  },
  /**
   * 评论
   */
  contentValue(e){
    //console.log(e.detail);
    this.setData({ 
      contentValue:e.detail
    });
  },
  /**
   * 
   */
  pushComment(){
    var contentValue = this.data.contentValue;
    if (contentValue == null || contentValue == "") {
      wx.showToast({  title: '请输入内容',  icon: 'none' })
      return;
    }
    var _this = this;
    var detail  = this.data.detail;
    config.api.post(config.host + "/api/bbs/comment/save",{bbsId:detail.id,content:contentValue}).then((res) => {
      console.log(res); //正确返回结果
      wx.showToast({  title: res.message,  icon: 'none' });
      if (res.success) {
        _this.setData({
          contentValue:''
        });
        setTimeout(function(){
          _this.getDetailList(detail.id);
        },2000);
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