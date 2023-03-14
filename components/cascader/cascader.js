// components/cascader/cascader.js
const computedBehavior = require('miniprogram-computed').behavior

Component({
  behaviors: [computedBehavior],
  observers: {
    origin() {
      this.init()
    },
    value() {
      this.init()
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    origin: {
      type: Array,
      value: []
    },
    value: {
      type: Array,
      value: [0, 0]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // picker range
    list: []
  },
  lifetimes: {
    attached() {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      let listTemp = []
      // 如果没有
      if (!Array.isArray(this.data.origin) || !this.data.origin.length) {
        return
      }
      // 创建符合微信picker的数组
      for (let index = 0; index < this.data.origin.length; index++) {
        const element = this.data.origin[index];
        listTemp.push(element)
      }

      this.setData({
        list: [
          listTemp,
          this.data.origin[this.data.value[0]].children
        ]
      })
    },
    // 场地
    onConfirmChangguan(e) {
      this.triggerEvent("onChange", e.detail)
    },
    // 场地列变化
    bindcolumnchange(e) {
      const {
        column,
        value
      } = e.detail
      // 如果不是第一行
      if (column) {
        return
      }

      const {
        list,
        origin
      } = this.data
      this.setData({
        list: [
          list[0],
          origin[value].children
        ]
      })

    },
  }
})