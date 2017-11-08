// pages/chioce/chioceCinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinema: [],
    mid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    });
    this.getOwnCinema(options.id);
    this.setData({
      mid: options.id
    })
    wx.setNavigationBarTitle({
      title: options.name,
    })
  },
  getOwnCinema(id){
    let that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/cinemas/find',
      data: {
        Movie: id
      },
      success(msg) {
        console.log(msg.data);
        that.setData({
          cinema: msg.data
        });
        wx.hideLoading();
      }
    })
  },
  buypage(e){
    let cid = e.currentTarget.dataset.cid;
    let str = `cid=${cid}&mid=${this.data.mid}`;
    wx.navigateTo({
      url: '../mix/mixed?' + str,
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