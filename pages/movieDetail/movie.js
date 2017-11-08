// pages/movieDetail/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid: '',
    movie: {},
    isLong: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mid: options.id
    })
    console.log(options.id)
    this.getMovieDetail(options.id)
  },

  getMovieDetail(id){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/Movie/find',
      data: {
        _id: id
      },
      success(msg) {
        msg.data.actorImg = that.transAry(msg.data.actorImg);
        msg.data.pictures = that.transAry(msg.data.pictures);
        msg.data.bigImg = that.transAry(msg.data.bigImg);
        msg.data.actors = msg.data.actors.split('，');
        that.setData({
          movie: msg.data
        })
      }
    })
  },
  transAry(obj){
    return obj.map((ele)=>{
      return ele = ele.replace(/\\/, '/');
    })
  },


  setscore(){
    if (!getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../log/log',
      })
      return false;
    };
    wx.navigateTo({
      url: '../score/score?mid=' + this.data.movie._id,
    })
  },

  godown(){
    this.setData({
      isLong: !this.data.isLong
    })
  },

  gopreview(){
    wx.navigateTo({
      url: '../preView/preview'
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