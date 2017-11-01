//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    curpage: 1,
    onshow: [],
    upcoming: [],
    userInfo: {},
    curLab: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
  },
  movieDetail(e){
    let mid = e.currentTarget.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: '../movieDetail/movie?id=' + mid
    })
  },
  switchLab(e){
    switch(e.target.id){
      case 'onshow': 
        this.setData({
          curLab: true
        });
        this.getMovieData();
        break;
      case 'upcoming': 
        this.setData({
          curLab: false
        });
        this.getMovieData();
        break;
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getMovieData();
  },
  getMovieData(){
    let that = this;
    if (this.data.curLab){
      wx.request({
        url: 'http://127.0.0.1:3000/onshow/find',
        data: {
          page: 1,
          rows: 5
        },
        success(msg) {
          console.log(msg.data.rows[0])
          for (let one of msg.data.rows) {
            one.bigImg[0] = one.bigImg[0].replace(/\\/, '/');
          }
          that.setData({
            curpage: msg.data.curpage,
            onshow: msg.data.rows
          })
        }
      })
    }else{
      wx.request({
        url: 'http://127.0.0.1:3000/upcoming/find',
        data: {
          page: 1,
          rows: 5
        },
        success(msg) {
          for (let one of msg.data.rows) {
            one.bigImg = JSON.parse(one.bigImg);
            one.bigImg[0] = one.bigImg[0].replace(/\\/, '/');
          }
          that.setData({
            curpage: msg.data.curpage,
            upcoming: msg.data.rows
          })
        }
      })
    }
    
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
