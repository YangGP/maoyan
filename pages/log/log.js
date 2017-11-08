// pages/log/log.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    psw: ''
  },

  getName(e){
    this.setData({
      name: e.detail.value
    })
  },

  getPsw(e) {
    this.setData({
      psw: e.detail.value
    })
  },

  login(){
    wx.request({
      url: 'http://127.0.0.1:3000/users/find',
      data: {
        phone: this.data.name,
        psw: this.data.psw
      },
      success(msg){
        if(msg.data.length==1){
          getApp().globalData.userInfo = msg.data[0].name;
          wx.navigateBack();
        }else{
          wx.showModal({
            title: '密码或账号错误',
            content: '是否重新登陆',
            success: function (res) {
              if (res.confirm) {
                console.log(1)
              } else if (res.cancel) {
                wx.navigateBack();
              }
            }
          })
        }
      }
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