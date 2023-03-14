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
    fileList:[],
    show:false
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
    const { fileList = [] } = this.data;
    var images = [];
    for(var d of fileList){
      images.push(d.thumb);
    }
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
      content: '确认发布内容吗?',
      success(res) {
        if (res.confirm) {
          config.api.post(config.host + "/api/partTime/save", {
            name: _this.data.name,
            content: _this.data.content,
            images:images.toString()
          }).then((res) => {
            console.log(res); //正确返回结果
            _this.setData({
              show:true,
            });
            if (res.success) {

              setTimeout(function () {
                wx.navigateTo({
                  url: `/pages/job/job`,
                })
              }, 2000);
            }else{
              wx.showToast({
                title: res.message,
                icon: 'none'
              });
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deleteImg(event){
    var index = event.detail.index;
    console.log(index);
    const { fileList = [] } = this.data;
    fileList.splice(index,1);
    console.log(event);
    this.setData({ fileList });
  },
  onClick(){
    console.log("==22===");
  },
  afterRead(event) {
    var _this = this;
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: config.host +'/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { file: file },
      success(res) {
        // 上传完成需要更新 fileList
        console.log(res);
        const { fileList = [] } = _this.data;
        let result = JSON.parse( res.data);
        fileList.push({ ...file, thumb: config.host +"getFile/"+result.data});
        _this.setData({ fileList });
      },
    });
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