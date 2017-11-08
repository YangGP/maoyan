// pages/mix/mixed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid: '',
    mid: '',
    cinema: {},
    movies: [],
    movieIds: [],
    curView: '',
    curIndex: '',
    position: [],
    curPosi: '',
    scheule: [],
    backUrl: '',
    touchDot: 0,
    time: 0,
    done: false, 
    interval: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    });
    console.log(options);
    this.setData({
      cid: options.cid,
      mid: options.mid
    })
    this.getCinemaData(options.cid)
  },
  getCinemaData(id){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/cinemas/find',
      data: {
        _id: id
      },
      success(msg) {
        console.log(msg.data);
        that.setData({
          cinema: msg.data
        });
        that.getCheckedMovies(id);
      }
    })
  },
  getCheckedMovies(id){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/cinemas/find',
      data: {
        _id: id,
        submitType: "findJoin",
        ref: JSON.stringify(["Movie"])
      },
      success(msg) {
        console.log(msg.data.Movie);
        let movieIds = [];
        for (let one of msg.data.Movie){
          one.bigImg = that.transAry(one.bigImg);
          one.actors = one.actors.split('，');
          one.type = one.type.split('，');
          movieIds.push(one._id);
        };
        let index = 0;
        for (let id in movieIds){
          if (movieIds[id] == that.data.mid){
            index = id;
          }
        }
        let num = movieIds.length;
        let init = 77;
        let p = [];
        for (let i = 0; i < num; i++) {
          p.push("left:calc(50% - " + init + "rpx);")
          init += 200;
        }
        console.log(p);
        that.setData({
          movies: msg.data.Movie,
          movieIds,
          backUrl: 'http://127.0.0.1:3000/' + msg.data.Movie[index].bigImg[0],
          curPosi: p[index],
          curView: msg.data.Movie[index]._id,
          curIndex: index,
          position: p
        });
        that.getScheule(msg.data.Movie[index]._id);
      }
    })
  },
  getScheule(id) {
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/Movie/find',
      data: {
        _id: id,
        submitType: "findJoin",
        ref: JSON.stringify(["scheule"])
      },
      success(msg) {
        console.log(msg.data.scheule);
        if (msg.data.scheule){
          for (let one of msg.data.scheule) {
            one.seats = JSON.stringify(one.seats);
          }
          that.setData({
            scheule: msg.data.scheule
          });
        }else{
          that.setData({
            scheule: []
          });
        }
        
        wx.hideLoading();
      }
    })
  },
  transAry(obj) {
    return obj.map((ele) => {
      return ele = ele.replace(/\\/, '/');
    })
  },
  //开始触摸
  touchstart: function (e) {
    console.log(e.touches[0].pageX);
    this.data.touchDot = e.touches[0].pageX;
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time += 1;
    }, 100);
  },
  //触摸移动事件
  touchmove: function (e) {
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;
    // console.log("touchMove: " + touchMove + ", touchDot: " + touchDot + ", diff: " + (touchMove - touchDot));
    //向左滑动
    if (touchMove - touchDot <= -40 && time < 10 && !this.data.done) {
      this.data.done = true;
      this.scrollLeft();
    }
    //向右滑动
    if (touchMove - touchDot >= 40 && time < 10 && !this.data.done) {
      this.data.done = true;
      this.scrollRight();
    }
  },
  //触摸结束事件
  touchend: function (e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
  },
  //点击图片
  touchView(e){
    let id = e.currentTarget.id;
    let i = this.data.movieIds.indexOf(id);
    console.log(this.data.movies[i]._id)
    this.setData({
      curIndex: i,
      curPosi: this.data.position[i],
      curView: this.data.movies[i]._id,
      backUrl: 'http://127.0.0.1:3000/' + this.data.movies[i].bigImg[0],
      scheule: []
    });
    console.log(this.data.curView)
    this.getScheule(this.data.curView);
  },
  scrollLeft(){
    let i = this.data.curIndex;
    let len = this.data.position.length;
    if (i < len) {
      this.setData({
        curIndex: ++i,
        curPosi: this.data.position[i],
        curView: this.data.movies[i]._id,
        backUrl: 'http://127.0.0.1:3000/' + this.data.movies[i].bigImg[0],
        scheule: []
      })
    }
    this.getScheule(this.data.curView);
  },
  scrollRight() {
    let i = this.data.curIndex;
    if (i > 0){
      this.setData({
        curIndex: --i,
        curPosi: this.data.position[i],
        curView: this.data.movies[i]._id,
        backUrl: 'http://127.0.0.1:3000/' + this.data.movies[i].bigImg[0],
        scheule: []
      })
    }
    this.getScheule(this.data.curView);
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