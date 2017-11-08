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
    console.log(e)
    let mid = e.currentTarget.dataset.id;
    if(e.target.dataset.mix){
      console.log(e.target.dataset);
      if (!getApp().globalData.userInfo) {
        wx.navigateTo({
          url: '../log/log',
        })
        return false;
      }
      wx.navigateTo({
        url: `../chioce/chioceCinema?id=${mid}&name=${e.target.dataset.name}`
      })
      return false
    } else if (e.target.dataset.video){
      wx.navigateTo({
        url: '../preView/preview'
      })
    } else {
      wx.navigateTo({
        url: '../movieDetail/movie?id=' + mid
      })
    }
    
  },
  gosearch(){
    wx.navigateTo({
      url: '../search/search'
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
  getLocal(){
    wx.navigateTo({
      url: '../locate/locate'
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中'
    });
    this.getMovieData();
  },
  getMovieData(){
    let that = this;
    if (this.data.curLab){
      wx.request({
        url: 'http://127.0.0.1:3000/onshow/find',
        data: {
          page: this.data.curpage,
          rows: 5
        },
        success(msg) {
          console.log(msg.data.rows[0])
          for (let one of msg.data.rows) {
            one.bigImg[0] = one.bigImg[0].replace(/\\/, '/');
          };
          that.setData({
            curpage: msg.data.curpage,
            onshow: msg.data.rows
          });
          wx.hideLoading(); 
          wx.stopPullDownRefresh();
        }
      })
    }else{
      wx.request({
        url: 'http://127.0.0.1:3000/upcoming/find',
        data: {
          page: this.data.curpage,
          rows: 5
        },
        success(msg) {
          for (let one of msg.data.rows) {
            one.bigImg[0] = one.bigImg[0].replace(/\\/, '/');
          };
          console.log(msg.data.rows)
          that.setData({
            curpage: msg.data.curpage,
            upcoming: msg.data.rows
          });
          wx.hideLoading();
          wx.stopPullDownRefresh()
        }
      })
    }
    
    
  },
  onPullDownRefresh(){
    wx.showLoading({
      title: '加载中'
    });
    this.getMovieData();
  },
  onReachBottom(){
    console.log(1)
    wx.showLoading({
      title: '加载中'
    });
    let that = this;
    if (this.data.curLab) {
      wx.request({
        url: 'http://127.0.0.1:3000/onshow/find',
        data: {
          page: ++this.data.curpage,
          rows: 5
        },
        success(msg) {
          console.log(msg.data.rows)
          for (let one of msg.data.rows) {
            one.bigImg[0] = one.bigImg[0].replace(/\\/, '/');
          };
          let onshow = that.data.onshow;
          onshow = onshow.concat(msg.data.rows);
          that.setData({
            curpage: msg.data.curpage,
            onshow
          });
          wx.hideLoading();
        }
      })
    }
  }
})
