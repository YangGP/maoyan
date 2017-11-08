// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas: [],
    curpage: 1
  },

  getCinemaData(){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/cinemas/find',
      data: {
        page: 1,
        rows: 5
      },
      success(msg) {

        console.log(msg.data)
        that.setData({
          curpage: msg.data.curpage,
          cinemas: msg.data.rows
        });
        wx.hideLoading();
      }
    })
  },
  gosearch(){
    wx.navigateTo({
      url: '../search/search?isCinema=' + true
    })
  },

  getmix(e){
    if (!getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../log/log',
      })
      return false;
    }
    wx.navigateTo({
      url: '../mix/mixed?cid=' + e.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    });
    this.getCinemaData();
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