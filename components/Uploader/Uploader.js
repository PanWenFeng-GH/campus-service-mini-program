import {
  baseOrigin
} from "../../config/index";

// compnents/Uploader/Uploader.js
const loadUrl = baseOrigin + "/api/misc/upload_img";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    disabled: {
      type: Boolean,
    },
    maxCount: {
      type: Number
    },
    images: {
      type: Array
    },
    accept: {
      type: String,
      value: 'image',
    }
  },
  observers: {
    "images": function (val) {
      // console.log('val', val);
      this.setData({
        fileList: val
      })
    }
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.setData({
        fileList: this.data.images
      })
    },
    // moved: function () {
    //   console.log('moved');
    // },
    // detached: function () {
    //   console.log('detached');
    // },
  },
  /**
   * 组件的初始数据
   */
  data: {
    fileList: [

    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    afterRead(e) {

      const _this = this;
      const {
        file
      } = e.detail;
      const {
        fileList = []
      } = _this.data;

      // 如果存在正在上传或者上传失败的图片需要先处理
      const hasLoading = fileList.some(item => item.status === 'uploading')
      const hasFailed = fileList.some(item => item.status === 'failed')
      if (hasLoading) {
        wx.showToast({
          title: '请等待上传',
          icon: "none"
        })
        return
      }
      if (hasFailed) {
        wx.showToast({
          title: '请删除上传失败的文件',
          icon: "none"
        })
        return
      }
      file.status = "uploading";
      file.message = "上传中...";
      fileList.push({
        ...file
      });
      _this.setData({
        fileList
      });
      wx.uploadFile({
        url: loadUrl,
        header: {
          token: wx.getStorageSync('token'),
          source: 1
        },
        filePath: file.url,
        name: 'file',
        success(res) {
          // console.log('上传res', res);
          const {
            data
          } = res
          const json = JSON.parse(data)

          const lastIdx = fileList.length - 1
          // console.log(fileList, lastIdx);
          if (json.code !== 200) {
            wx.showToast({
              title: json.msg,
              icon: "error"
            })
            fileList[lastIdx].status = 'failed';
            fileList[lastIdx].message = '上传失败';
            _this.setData({
              fileList
            }, () => {
              _this.triggerEvent('onChange', _this.data.fileList)
            })
            return
          }
          // console.log('上传', json);
          wx.showToast({
            title: '上传成功',
          })
          fileList[lastIdx].status = 'done';
          fileList[lastIdx].url = `${baseOrigin}${json.data.url}`
          _this.setData({
            fileList
          }, () => {
            _this.triggerEvent('onChange', _this.data.fileList)
          })
        },
        fail() {
          const lastIdx = fileList.length - 1
          fileList[lastIdx].status = 'failed';
          fileList[lastIdx].message = '上传失败';
        }
      });
    },
    onDel(e) {
      const {
        index
      } = e.detail;
      const {
        fileList = []
      } = this.data;
      fileList.splice(index, 1)
      this.setData({
        fileList
      }, () => {
        this.triggerEvent('onChange', this.data.fileList)
      })

    }
  }
})