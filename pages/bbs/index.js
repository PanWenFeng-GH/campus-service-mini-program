const config = require('../../config.js')
const app = getApp()

// pages/msg/msg.js
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
    banner: null,
    type: 0,
  },
  editor(e) {
    wx.navigateTo({
      url: '/pages/editor/editor',
    })
  },
  onClickTab(e ){
    console.log(e.detail.index);
    this.setData({
      type:e.detail.index,
      list:[],
      page:1,
    });
    this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.onGetPageList(1)
    /*this.setData({
      pageLoading: false,
      finished:true,
      list: [
        {title:'你好我是新闻，都没啥内容',view_time:'2022/01/19 22:30'}
      ],
    });*/
    //
    this.getList();
  },
  getList() {
    var _this = this;
    config.api.post(config.host + "/api/bbs/list", {
      page: this.data.page,
      limit: this.data.limit,
      type: this.data.type
    }).then((res) => {
      console.log(res); //正确返回结果
      if (res.success) {
        var finished  = _this.data.finished;
        var page = _this.data.page;
        var list = _this.data.list;
        if(res.data!=null&&res.data.length<10){
          finished = true;
        }else{
          page = page+1;
        }
        for(var d of res.data){
          list.push(d);
        }
        _this.setData({ 
          list:list,
          pageLoading: false,
          finished: finished,
          page:page,
        });  
      }
    });
  },
  onReachBottom: function () {
    if (this.data.loading || this.data.finished) {
      return
    }
    console.log("===拉触底====");
    this.getList()
  },
  goDetail(e){
    const id  = e.currentTarget.dataset.id
    console.log(id);
    wx.navigateTo({
      url: '/pages/bbsDetail/bbsDetail?id=' + id,
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