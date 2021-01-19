// miniprogram/pages/seatSelect/index.js
const db = wx.cloud.database()
const utils = require('../../utils/activity_util')
const maxSelectseatNumber = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    TabCur:0,
    location:["大堂","三楼","恩会相遇"],
    seats:[[{row:1,column:1,color:"green",able:true},{row:1,column:2,color:"grey",able:false},{row:1,column:1,color:"green",able:true},{row:1,column:2,color:"grey",able:false},{row:1,column:1,color:"green",able:true},{row:1,column:2,color:"grey",able:false},{row:1,column:1,color:"green",able:true}],[{row:1,column:1,color:"green",able:true},{row:1,column:2,color:"grey",able:false},{row:1,column:1,color:"green",able:true},{row:1,column:2,color:"grey",able:false},{row:1,column:1,color:"green",able:true},{row:1,column:2,color:"grey",able:false},{row:1,column:1,color:"green",able:true}]]
     
  },

  //   位置选择（"大堂","三楼","恩会相遇"）
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
  selectSeat(e) {
    let x = e.currentTarget.dataset.idx
    let y = e.currentTarget.dataset.idy
    var row = x + 1;
    var column = y + 1;
    console.log("第"+row+"排"+"第"+column+"列")
    var able='seats['+x+']['+y+'].able'
    var openid='seats['+x+']['+y+'].openid'
    var that =this
    if(this.data.seats[x][y].able==false){                 //判断座位是否已经被选择 → 是
      if(this.data.seats[x][y].openid==this.data.openid){  //判断座位是否被自己选择 → 是
        // 取消选择座位弹窗提示
        wx.showModal({
          title: '请确认',
          content: '取消选择第'+row+"排"+"第"+column+"列",
          cancelColor: "#ff0000",
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({                               // 取消选择后本地视图变化
                [able]:!that.data.seats[x][y].able,
                [openid]:"",
                note:"取消选择",
                row:row,
                column:column
              })
              that.refresh()                                // 取消选择后更新数据库
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
      })
      }else{
        // 座位已经被其他人选择弹窗提示
        wx.showToast({
          title: '该座位不可选',
        })
      }
    }else{
    // 选择座位后弹窗提示    
    wx.showModal({
        title: '请确认',
        content: '您选择了第'+row+"排"+"第"+column+"列",
        cancelColor: "#ff0000",
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // 再次获取数据库座位状态并判断选择的座位是否同时被他人选择
            db.collection('seatSelect').doc('28ee4e3e60063faf000de51a705adf22').get().then(res => {  
              that.setData({
                seats: res.data.seats
              })
              if(res.data.seats[x][y].able==true){
                that.setData({                                // 选择后本地视图变化
                  [able]:!that.data.seats[x][y].able,
                  [openid]:that.data.openid,
                  note:"选择",
                  row:row,
                  column:column
                })
                that.refresh()                                // 选择后更新数据库
              } else{                                         // 提示座位已被选
                wx.showToast({
                  title: '该座位已被选',
                })
              }
            })
            // 用户取消
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
    })
  }
  },
  // 更新数据库
  refresh(){
    const _ = db.command
  db.collection('seatSelect').doc('28ee4e3e60063faf000de51a705adf22').update({
    data: {
      seats: this.data.seats,                              //座位状态
      user: _.push({"openid":this.data.openid,'time':utils.getobjDate(),'note':this.data.note,'row':this.data.row,'column':this.data.column})            //用户记录
    },
    success: function(res) {
      console.log("数据库更新成功")
    }
  })
  },
  /**
   * 启动页面
   */
  onLoad() {
    wx.cloud.callFunction({               //获取用户openID
      name:'login',
      complete:res=>{
        var openid = res.result.openid
        console.log(openid)
        this.setData({
          openid:openid,
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
    //获取数据库座位状态
    var that = this
    db.collection('seatSelect').doc('28ee4e3e60063faf000de51a705adf22').get().then(res => {  
      that.setData({
        seats: res.data.seats,
      })
    })
    this.resetSeats()
  },
  //重置座位
  resetSeats(){
    var seats = []
    var seatColumn = []
    var seat = []
    var color = 'green'
    var able = true
    for (var a = 1; a < 11; a++) {
      seatColumn = []
      for (var b = 1; b < 8; b++) {
        if(b%2){                                   //疫情隔开一个座位坐人
          color = 'green'
          able = true
        }else{
          color = 'grey'
          able = false
        }
        var seat = {'row':a,'column':b,'color':color,'able':able}
        seatColumn.push(seat)
        }
      seats.push(seatColumn)
      }
      console.log(seats)
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