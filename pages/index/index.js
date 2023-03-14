// index.js
const config = require('../../config.js')
const app = getApp()

Page({
  data: {
    pageLoading:false,
    demoImg:' ',
    demoImg2:'http://150.158.25.51/img/demo/demo1.png',
    icon1:'http://150.158.25.51/img/demo/1.png',
    icon2:'/images/tiyuguan.png',
    // 轮播图
    banner: [],
    // 公告数据
    notice: null,
    goods:[],
    indexInfo: {
      // 列表
      dataList:[
        {title:'日常兼职',url:"/images/demo/1.png",type:0},
        {title:'毕业生服务',url:"/images/demo/2.png",type:1},
        {title:'专升本服务',url:"/images/demo/3.png",type:2},
        {title:'驾校服务',url:"/images/demo/4.png",type:3},
        {title:'社团服务',url:"/images/demo/5.png",type:4},
        {title:'考试公告',url:"/images/demo/6.png",type:5},
        {title:'团建',url:"/images/demo/7.png",type:6},
        {title:'吃喝玩乐',url:"/images/demo/8.png",type:7},
      ],
    },
    schoolNotice:[],
  },
  // 展示通告
  onShowNotice(e) {
    const {
      item
    } = e.target.dataset
    wx.showModal({
      title: item.desc,
      content: item.content,
      showCancel: false
    })
  },
  routeDetail(e) {
    const { item } = e.currentTarget.dataset;
    console.log(item);
    var url  = '/pages/job/job';
    if(item.type == 0){
      url  = '/pages/job/job';
    }else if(item.type == 7){ 
      //吃喝玩乐
      url  = '/pages/goods/goods';
    }else{
      url  = '/pages/data/data?type='+item.type+'&title='+item.title;
    }
    wx.navigateTo({
      url:url 
    })
  },
  schoolDetail(e) {
    wx.navigateTo({
      url:'/pages/data/data?type=8&title=学校公告' 
    })
  },
  goodsDetail(e) {
    const { item } = e.currentTarget.dataset;
    console.log(item);
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail?id='+item.id,
    })
  },
  goods(e){
    wx.navigateTo({
      url: '/pages/goods/goods?ifGood=1',
    })
  },
  routeMsg() {
    wx.switchTab({
      url: '/pages/msg/msg',
    })
  },
  routeMsgDetail(e) {
    const {
      item
    } = e.target.dataset
    wx.navigateTo({
      url: '/pages/msg-detail/msg-detail?article_id=' + item.article_id,
    })
  },
  onDetail(e) {
    console.log(e);
    const id  = e.currentTarget.dataset.id
    console.log(id);
    wx.navigateTo({
      url: '/pages/dataDetail/dataDetail?id=' + id,
    })
  },
  onLoad() {
    var _this = this;
    this.getBanner();
    this.getNotice();
    this.getGoods();
    this.getSchoolNotice();
  },
  /**
   * 广告图
   */
  getBanner(){
    var _this = this;
    config.api.post(config.host + "/api/banner/list",{}).then((res) => {
      //console.log(res); //正确返回结果
      if (res.success) {
        var banner = [];
        for(var d of res.data){
          d.img = config.host + d.img;
          //console.log(d);
          banner.push(d);
        }
        _this.setData({ 
          banner:banner
        });
      }
    });
  },
  /**
   * 消息通知
   */
  getNotice(){
    var _this = this;
    config.api.post(config.host + "/api/code/list",{type:7,page:1,limit:5}).then((res) => {
      //console.log(res); //正确返回结果
      if (res.success) {
        _this.setData({ 
          notice:res.data
        });
      }
    });
  },
  getSchoolNotice(){
    var _this = this;
    config.api.post(config.host + "/api/code/list",{type:8}).then((res) => {
      //console.log(res); //正确返回结果
      if (res.success) {
        _this.setData({ 
          schoolNotice:res.data
        });
      }
    });
  },
  /**
   * 好物
   */
  getGoods(){
    var _this = this;
    config.api.post(config.host + "/api/goods/list",{limit:10,ifGood:1,page:1}).then((res) => {
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
  onShareAppMessage() {}

})