const config = require('../../config.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageLoading: true,
    page: 1,
    limit: 10,
    loading: false,
    finished: false,
    list: [],
    type:'',
  },
  onDetail(e) {
    console.log(e);
    const id = e.currentTarget.dataset.id
    console.log(id);
    wx.navigateTo({
      url: '/pages/dataDetail/dataDetail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    var title = options.title;
    wx.setNavigationBarTitle({
      title: title
    });
    this.setData({
      type: type
    });
    this.getList();
  },
  /**
   * 
   */
  getList() {
    var _this = this;
    config.api.post(config.host + "/api/code/list", {
      page: this.data.page,
      limit: this.data.limit,
      type: this.data.type
    }).then((res) => {
      console.log(res); //正确返回结果
      if (res.success) {
        var finished = _this.data.finished;
        var page = _this.data.page;
        var list = _this.data.list;
        if (res.data != null && res.data.length < 10) {
          finished = true;
        } else {
          page = page + 1;
        }
        for (var d of res.data) {
          list.push(d);
        }
        _this.setData({
          list: list,
          pageLoading: false,
          finished: finished,
          page: page,
        });
      }
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading || this.data.finished) {
      return
    }
    console.log("===拉触底====");
    this.getList()
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})