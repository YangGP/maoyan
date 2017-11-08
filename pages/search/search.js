// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onlyCinema: false,
    resultMovie: [],
    resultCinema: [],
    searched: false
  },

  goback(){
    wx.navigateBack();
  },
  searchRes(e){
    let val = e.detail.value;
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/cinemas/find',
      data: {
        cinemaName: val
      },
      success(msg) {
        that.setData({
          resultCinema: msg.data,
          searched: true
        });
      }
    })
    if (!this.data.onlyCinema){
      wx.request({
        url: 'http://127.0.0.1:3000/Movie/find',
        data: {
          CName: val
        },
        success(msg) {
          for (let one of msg.data) {
            one.bigImg[0] = one.bigImg[0].replace(/\\/, '/');
          };
          that.setData({
            resultMovie: msg.data
          });
          console.log(msg.data)
        }
      })
    }
  },
  movieDetail(e) {
    let mid = e.currentTarget.dataset.id;
    console.log(e)
    wx.navigateTo({
      url: '../movieDetail/movie?id=' + mid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isCinema){
      this.setData({
        onlyCinema: true
      })
    }
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