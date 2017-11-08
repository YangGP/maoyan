// pages/getSeat/getseat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    ciname: '双楠电影城',
    time: '16:00',
    projName: '1好听',
    movie: '雷神',
    seats: [
        [0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0], 
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0], 
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 
        [10, 10, 10, 10, 10, 10, 11, 10, 10, 10, 10, 10], 
        [10, 10, 10, 10, 11, 11, 11, 10, 10, 10, 10, 10], 
        [10, 11, 10, 10, 10, 11, 11, 10, 10, 10, 10, 10], 
        [10, 11, 10, 10, 10, 11, 10, 10, 10, 10, 10, 10], 
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 
        [10, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10], 
        [10, 10, 11, 10, 11, 11, 10, 10, 10, 10, 10, 10], 
        [0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0], 
        [0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0]
      ],
    price: 38,
    seatState: {
      "0": '',
      "10": '../../icon/movie_ic_can_select_small.png',
      "11": '../../icon/movie_ic_saled_big.png',
      "110": '../../icon/movie_ic_selected_big.png'
    },
    selected: false,
    selectedSeat: [],
    total: 0
  },

  //座位图选择
  getSeat(e){
    console.log(this.data.selectedSeat);
    if (!e.target.dataset.id){
      return false;
    }
    let event = e.target.dataset.id.split(',');
    let obj = {
      x: event[0],
      y: event[1],
      v: event[2]
    }
    if (obj.v == 110){
      let seats = this.data.seats;
      let selectedSeat = this.data.selectedSeat;
      let index = 0;
      for(let i in selectedSeat){
        let { x, y } = selectedSeat[i];
        if (x == obj.x && y == obj.y){
          index = i;
        }
      };
      selectedSeat.splice(index, 1);
      seats[obj.x - 1][obj.y - 1] = 10;
      let total = selectedSeat.length * this.data.price
      if (selectedSeat.length == 0){
        this.setData({
          selected: false
        })
      }
      this.setData({
        selectedSeat,
        seats,
        total
      })
    }else if(obj.v == 10){
      if (this.data.selectedSeat.length == 4){
        wx.showToast({
          title: '最多可选择4个座位'
        })
        return false;
      }
      let selectedSeat = this.data.selectedSeat;
      let seats = this.data.seats;
      selectedSeat.push(obj);
      seats[obj.x - 1][obj.y - 1] = 110;
      let total = selectedSeat.length * this.data.price
      console.log(this.data)
      this.setData({
        selectedSeat,
        seats,
        total,
        selected: true
      })
    }else{
      return false;
    }
  },

  //点击删除座位
  delseat(e){
    if(!e.target.dataset.id){
      return false;
    }
    let a = e.target.dataset.id.split(',');
    let obj = {};
    
    obj.x = a[0]-1;
    obj.y = a[1]-1;
    console.log(obj)

    let seats = this.data.seats;
    let selectedSeat = this.data.selectedSeat;
    let index = 0;
    for (let i in selectedSeat) {
      let { x, y } = selectedSeat[i];
      if (x == obj.x && y == obj.y) {
        index = i;
      }
    };
    selectedSeat.splice(index, 1);
    seats[obj.x][obj.y] = 10;
    let total = selectedSeat.length * this.data.price
    if (selectedSeat.length == 0) {
      this.setData({
        selected: false,
        selectedSeat,
        seats,
        total
      })
    }else{
      this.setData({
        selectedSeat,
        seats,
        total
      })
    }
  },

  //买票
  buyticket(){
    console.log(this.data.seats)
    let seat = JSON.stringify(this.data.seats);
    let selectedSeat = JSON.stringify(this.data.selectedSeat);
    wx.redirectTo({
      url: `../ensure/ensure?sid=${this.data.id}&seat=${seat}&cinema=${this.data.cinema}&time=${this.data.time}&price=${this.data.price}&selectedSeat=${selectedSeat}&projName=${this.data.projName}&movie=${this.data.movie}`,
    })
  },

  autoSeat(e){
    let num = e.currentTarget.dataset.i;
    let seat = this.data.seats;
    let y = seat.length;
    let x = seat[4].length;
    let xpot = x/2;
    let ypot = y/2;
    console.log(xpot,ypot)
    switch(num){
      case 1:
        this.getEmptySeat(xpot, ypot, num = 1);
        break;
      case 2:
        console.log(2); break;
      case 3:
        console.log(3); break;
      case 4:
        console.log(4); break;
    }
  },

  getEmptySeat(x,y,n,yf){
    let seat = this.data.seats;
    console.log(x,y,n)
    console.log(seat[x][y])
    if(seat[x-1][y-1] == 10){
      this.getSeat({
        target: {
          dataset:{
            id: `${x},${y},${seat[x][y]}`
          }
        }
      })
      console.log(1)
    }else{
      console.log(1)
      console.log(yf)
      if(!yf){
        if(y==seat[x-1].length){
          yf = true;
        }
        this.getEmptySeat(x, y + 1, n,yf);
      }else{
        this.getEmptySeat(x, y - 1, n,yf);
      }
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      // cinema: options.cinema,
      // time: options.time,
      // id: options.id,
      // seats: JSON.parse(options.seat),
      // price: options.price,
      // projName: options.projName,
      // movie: options.movie,
      x: -750 * 2.5 * .5 + 187,
      y: -770 * 2.5 * .5 + 192
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