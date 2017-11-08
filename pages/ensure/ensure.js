// pages/ensure/ensure.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    seat: [],
    time: '16:00',
    selectedSeat: [],
    price: '38',
    projName: '',
    cinema: '',
    movie: '',
    restTime: '15:00',
    second: 900,
    interval: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.interval = setInterval(this.getTime, 1000);
    let seat = JSON.parse(options.seat);
    let selectedSeat = JSON.parse(options.selectedSeat);
    for (let i = 0; i < selectedSeat.length; i++){
      selectedSeat[i].x = parseInt(selectedSeat[i].x);
      selectedSeat[i].y = parseInt(selectedSeat[i].y);
    }
    
    seat = seat.map((ele)=>{
      return ele.map((val)=>{
        if(val == 110){
          return 11
        }else{
          return val
        }
      })
    })

    this.setData({
      id: options.sid,
      seat,
      selectedSeat,
      price: options.price,
      projName: options.projName,
      time: options.time,
      cinema: options.cinema,
      movie: options.movie
    })
  },

  //倒计时
  getTime(){
    let second = this.data.second;
    let min = parseInt(second/60);
    let sec = second%60;
    if(sec < 10){
      sec = '0'+sec;
    }
    let restTime = min + ':' + sec;
    if(second == 0){
      wx.reLaunch({
        url: '../index/index',
      })
    }
    this.setData({
      second: --second,
      restTime
    })
  },

  //确认支付
  ensurePay(){
    console.log(this.data.id,this.data.seat)
    wx.request({
      url: 'http://127.0.0.1:3000/scheule/update',
      data: {
        _id: this.data.id,
        seats: this.data.seat
      },
      success(msg){
        wx.showToast({
          title: '购买成功',
          icon: 'success',
          duration: 1500
        })
        wx.reLaunch({
          url: '../index/index',
        })
      }
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
    console.log('隐藏');
    clearInterval(this.data.interval)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('卸载');
    clearInterval(this.data.interval)
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