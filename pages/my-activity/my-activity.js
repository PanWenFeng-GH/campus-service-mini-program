import {
  userActivityOrderLists
} from "../../apis/index";

// pages/my-activity/my-activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    page: 1,
    loading: false,
    finished: false,
    list: [],
  },
  onChange(e) {
    this.setData({
      page: 1,
      list: [],
      finished: false
    }, () => {
      this.onGetPageList(1, e.detail.index)
    })
  },
  onGetPageList(page, status) {
    const {
      list
    } = this.data
    this.setData({
      loading: true
    })
    userActivityOrderLists(page, status).then(res => {
      console.log(res);
      this.setData({
        loading: false,
        list: [...list, ...res.data.lists.data],
      })
      if (res.data.lists.current_page >= res.data.lists.last_page) {
        this.setData({
          finished: true,
        })
        return
      } else {
        this.setData({
          page: ++page,
        })
      }
    }).catch((err) => {
      console.log(err);
      this.setData({
        loading: false
      })
    })
  },
  routeActivityDetail(e) {

    const {
      item
    } = e.currentTarget.dataset
    console.log(item.activity_id);
    wx.navigateTo({
      url: '/pages/activity-detail/activity-detail?activity_id=' + item.activity_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetPageList(1)
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