// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touchDot: 0,
    time: 0,
    done: 0,
    interval: 0,
    allStar: [
      'normal.png',
      'normal.png',
      'normal.png',
      'normal.png',
      'normal.png'
    ],
    xpot: [96,141,186,231,276],
    text: '',
    score: 0,
    mid: ''
  },

  movestar(e){
    let x = e.detail.x;
    switch(e.target.dataset.id){
      case 0: this.setStar(0, x > this.data.xpot[0]); break;
      case 1: this.setStar(1, x > this.data.xpot[1]); break;
      case 2: this.setStar(2, x > this.data.xpot[2]); break;
      case 3: this.setStar(3, x > this.data.xpot[3]); break;
      case 4: this.setStar(4, x > this.data.xpot[4]); break;
    }
  },

  setStar(index, x){
    let allStar = [];
    let score = 0;
    for(let i = 0; i < 5; i++){
      if(i < index){
        allStar.push('selected.png');
        score += 2;
      }else if(i == index){
        if(!x){
          allStar.push('half.png');
          score += 1;
        }else{
          allStar.push('selected.png');
          score += 2;
        }
      }else{
        allStar.push('normal.png');
        score += 0;
      }
    }
    this.setData({
      score,
      allStar
    })
  },

  gettext(e){
    this.setData({
      text: e.detail.value
    });
    console.log(e.detail.value)
  },

  submit(){
    if(this.data.text.length < 6){
      this.setData({
        text: '请输入合适的评论'
      })
      return false;
    }
    let obj = {
      name: getApp().globalData.userInfo,
      say: this.data.text,
      sayScore: this.data.score
    }
    wx.request({
      url: 'http://127.0.0.1:3000/Movie/update',
      data: {
        _id: this.data.mid,
        userSay: JSON.stringify(obj),
        isPush: true
      },
      success(msg){
        wx.navigateBack();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mid: options.mid
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