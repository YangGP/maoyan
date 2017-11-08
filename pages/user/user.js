// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  usercard(){
    if (!getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../log/log',
      })
      return false;
    }
    wx.navigateTo({
      url: '../userCard/userCard'
    })
  },
  discount(){
    if (!getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../log/log',
      })
      return false;
    }
    wx.navigateTo({
      url: '../discount/discount'
    })
  },
  order(){
    if (!getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../log/log',
      })
      return false;
    }
    wx.navigateTo({
      url: '../myorder/order'
    })
  },
  want(){
    if (!getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../log/log',
      })
      return false;
    }
    wx.navigateTo({
      url: '../want/want'
    })
  },
  seen(){
    if (!getApp().globalData.userInfo) {
      wx.navigateTo({
        url: '../log/log',
      })
      return false;
    }
    wx.navigateTo({
      url: '../seen/seen'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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