//获取应用实例
var app = getApp()
const config = require('../../config.js')
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '请输入内容...',
    editorHeight: 500,
    keyboardHeight: 0,
    isIOS: false,
    inputContent: null,
    active: 'push',
    messageCount: '',
    show: false,
    columns: ['吐槽爆料', '海底捞人', '脱单交友', '表白示爱', '失物招领', '二手交易'],
    columnsType: ['1', '2', '3', '4', '5', '6'],
    index: '',
    value: '请选择类型',
    name: '',
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onConfirm: function (event) {
    this.setData({
      show: false
    });
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(index + "====" + value);
    this.setData({
      value: value,
      index:index
    });
  },
  readOnlyChange() {
    // console.log("触发readOnlyChange()方法")
    this.setData({
      readOnly: !this.data.readOnly
    })
  },

  onLoad() {
    //  console.log("触发onLoad()方法")
    console.log(app)
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({
      isIOS
    })
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height;
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.EditorContext.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    // console.log("触发updatePosition方法")
    const toolbarHeight = 50
    const {
      windowHeight,
      platform
    } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({
      editorHeight,
      keyboardHeight
    })
  },
  calNavigationBarAndStatusBar() {
    // console.log("触发calNavigationBarAndStatusBar()方法")
    const systemInfo = wx.getSystemInfoSync()
    const {
      statusBarHeight,
      platform
    } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    // console.log("触发onEditorReady()方法")
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.EditorContext = res.context
    }).exec()
  },

  blur() {
    // console.log("触发blur()方法")
    this.EditorContext.blur()
  },
  format(e) {
    // console.log("触发format(e)方法")
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // // console.log('format', name, value)
    this.EditorContext.format(name, value)

  },
  onStatusChange(e) {
    // console.log("触发onLoad()方法")
    const formats = e.detail

    this.setData({
      formats
    })
  },
  insertDivider() {
    // console.log("触发insertDivider()方法")
    this.EditorContext.insertDivider({
      success: function () {
        // console.log('insert divider success')
      }
    })
  },
  clear() {
    //// console.log("触发clear()方法")
    this.EditorContext.clear({
      success: function (res) {
        //   // console.log("clear success")
      }
    })
  },
  removeFormat() {
    // console.log("触发removeFormat()方法")
    this.EditorContext.removeFormat()
  },
  insertDate() {
    // console.log("触发insertDate()方法")
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.EditorContext.insertText({
      text: formatDate
    })
  },
  insertImage() {
    console.log("触发insertImage()方法")
    const that = this;
    const t = this;
    let tempImageFilePaths = [];
    let imageUrl = '';
    wx.chooseImage({
      count: 1,
      // 可以指定来源是相册还是相机，默认二者都有
      //  sourceType: ['album', 'camera'],
      success: function (res) {
        tempImageFilePaths = res.tempFilePaths;
        that.EditorContext.insertImage({
          src: imageUrl,
          data: {},
          width: '100%',
          success: function () {
            console.log("富文本上传图片")
            wx.uploadFile({
              url: config.host + '/upload',
              filePath: tempImageFilePaths[0],
              name: 'file',
              formData: {},
              success(ressucess) {
                console.log(ressucess)
                let data = ressucess.data
                let result = JSON.parse(data);
                if (result.success) {
                  imageUrl = result.data;
                  //console.log(data)
                  // // console.log(JSON.stringify(data))
                  console.log("图片路径等于：" + imageUrl)
                  t.myInsertImage(config.host + "getFile/" + imageUrl);
                } else {
                  t.setData({
                    inputContent: null
                  })
                }
              }
            })

          }
        })

      }
    })
  },


  onClickLeft() {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },

  //获取标题
  onChange(e) {
    // console.log(e)
    let value = e.detail;
    this.setData({
      title: value
    })
    // // console.log("标题等于："+this.data.title)

  },
  undo() {
    this.EditorContext.undo()
  },
  redo() {
    this.EditorContext.redo()
  },
  //获取富文本内容
  getContent() {
    const t = this;
    //获取富文本内容
    t.EditorContext.getContents({
      success: (resEditor) => {
        console.log("富文本内容");
        console.log(resEditor.html);
        let content = resEditor.html;
        t.setData({
          inputContent: content
        })
      },
      fail: (resfail) => {
        // console.log("fail：" + resfail);
      }
    })
  },
  //再次插入图片
  myInsertImage(imageUrl) {
    const that = this;
    const t = this;
    that.EditorContext.insertImage({
      src: imageUrl,
      data: {},
      width: '100%',
      success: function () {
        //获取富文本内容
        t.EditorContext.getContents({
          success: (resEditor) => {
            // console.log("富文本内容");
            // console.log(resEditor.html);
            let temp = resEditor.html;
            let index = temp.lastIndexOf('<p');
            // console.log("index等于："+index);
            let content = temp.slice(0, index);
            console.log("截取的富文本内容：" + content);
            t.setData({
              inputContent: content
            })
          },
          fail: (resfail) => {
            // console.log("fail：" + resfail);
          }
        })
      }
    })
  },
  onChange(e){
    //console.log(e.detail);
    this.setData({
      name: e.detail
    })
  },
  //发布帖子
  onClickRight() {
    console.log("发布帖子app");
    var name = this.data.name;
    var index = this.data.index;
    var type = this.data.columnsType[index];
    if (type == null || type == "") {
      wx.showToast({  title: '请选择类型',  icon: 'none' })
      return;
    }
    if (name == "") {
      wx.showToast({  title: '请输入标题',  icon: 'none' })
      return;
    }
    const t = this;
    // this.checkLogin();
    if (t.data.inputContent == null) {
      console.log("富文本内容为空")
      t.getContent();
    } else {
      t.getContent();
    }
    wx.showModal({
      title: '',
      content: '确认发布内容吗?',
      success(res) {
        if (res.confirm) {
          const postComment = {
            name: name,
            type:type,
            content: t.data.inputContent
          };
          config.api.post(config.host + "/api/bbs/save",postComment).then((res) => {
            //console.log(res); //正确返回结果
            wx.showToast({  title: res.message,  icon: 'none' });
            if (res.success) {
              setTimeout(function(){
                wx.switchTab({
                  url: `/pages/bbs/index`,
                })
              },2000);
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
})