// miniprogram/pages/seatSelect/index.js
const db = wx.cloud.database()
const utils = require('../../utils/activity_util')//获取当前日期时间
const maxSelectseatNumber = 3
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scalevalue:'1',
    openid:"",
    TabCur:0,
    selectSeatNumber:0,
    location:["大堂","三楼","恩会相遇"],
    seats:[
      [
        {
          "able": false,
          "color": "grey",
          "column": 1,
          "openid": "",
          "row": 1
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 1
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 1
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 1
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 1
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 1
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 1
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 2
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 2
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 2
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 2
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 2
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 2
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 2
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 3
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 3
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 3
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 3
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 3
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 3
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 3
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 4
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 4
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 4
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 4
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 4
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 4
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 4
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 5
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 5
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 5
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 5
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 5
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 5
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 5
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 6
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 6
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 6
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 6
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 6
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 6
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 6
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 7
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 7
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 7
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 7
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 7
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 7
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 7
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 8
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 8
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 8
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 8
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 8
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 8
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 8
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 9
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 9
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 9
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 9
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 9
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 9
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 9
        }
      ],
      [
        {
          "able": true,
          "color": "grey",
          "column": 1,
          "row": 10
        },
        {
          "able": false,
          "color": "grey",
          "column": 2,
          "row": 10
        },
        {
          "able": true,
          "color": "grey",
          "column": 3,
          "row": 10
        },
        {
          "able": false,
          "color": "grey",
          "column": 4,
          "row": 10
        },
        {
          "able": true,
          "color": "grey",
          "column": 5,
          "row": 10
        },
        {
          "able": false,
          "color": "grey",
          "column": 6,
          "row": 10
        },
        {
          "able": true,
          "color": "grey",
          "column": 7,
          "row": 10
        }
      ]
    ]
  },

  //   位置选择（"大堂","三楼","恩会相遇"）
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    db.collection('seatSelect').doc(this.data.TabCur+"").get().then(res => {  
      this.setData({
        seats: res.data.seats,
        systemRow:res.data.systemRow,
        systemColumn:res.data.systemColumn
      })
      console.log(this.data.reset)
      if(this.data.reset){this.resetSeats()}
      else{this.judgeSelectSeatNumber()}
      
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
                column:column,
                selectSeatNumber:that.data.selectSeatNumber-1
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
          icon:'none'
        })
      }
    }else{
      if(this.data.selectSeatNumber<maxSelectseatNumber){
    // 选择座位后弹窗提示    
    wx.showModal({
        title: '请确认',
        content: '您选择了第'+row+"排"+"第"+column+"列",
        cancelColor: "#ff0000",
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            // 再次获取数据库座位状态并判断选择的座位是否同时被他人选择
            db.collection('seatSelect').doc(that.data.TabCur+"").get().then(res => {  
              that.setData({
                seats: res.data.seats
              })
              if(that.data.seats[x][y].able==true){
                that.setData({                                // 选择后本地视图变化
                  [able]:!that.data.seats[x][y].able,
                  [openid]:that.data.openid,
                  note:"选择",
                  row:row,
                  column:column,
                  selectSeatNumber:that.data.selectSeatNumber+1,
                  scalevalue:'1'
                })
                that.refresh()                                // 选择后更新数据库
              } else{                                         // 提示座位已被选
                wx.showToast({
                  title: '该座位已被选',
                  icon:'none'
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
        else{
          wx.showToast({
            title: '最多选择3个座位',
            icon:'none'
          })
        }
  }
  },
  
  /**
   * 启动页面
   */
  onLoad() {
    //获取用户openID
    wx.cloud.callFunction({               
      name:'login',
      complete:res=>{
        this.setData({
          openid:res.result.openid,
        }) 
        this.judgeSelectSeatNumber()
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
    //获取数据库座位
    db.collection('seatSelect').doc(this.data.TabCur+"").get().then(res => {  
      this.setData({
        seats: res.data.seats,
        systemRow:res.data.systemRow,
        systemColumn:res.data.systemColumn,
        reset:res.data.reset
      })
      if(res.data.reset){this.resetSeats()}
    })
  },
  //判断当前用户选择了几个座位
  judgeSelectSeatNumber(){
    this.data.selectSeatNumber = 0
    for (var a = 0; a < this.data.systemRow; a++) {
      for (var b = 0; b < this.data.systemColumn; b++) {
          if(this.data.seats[a][b].openid==this.data.openid){
            this.data.selectSeatNumber=this.data.selectSeatNumber+1}
          }
        }
  },
  //更新数据库
  refresh(){
    const _ = db.command
  db.collection('seatSelect').doc(this.data.TabCur+"").update({
    data: {
      seats: this.data.seats,                              //座位状态
      user: _.push({"openid":this.data.openid,'time':utils.getobjDate(),'note':this.data.note,'row':this.data.row,'column':this.data.column})            //用户记录
    },
    success: function(res) {
      console.log("数据库更新成功")
    }
  })
  },
  //重置座位
  resetSeats(){
    var seats = []
    var seatColumn = []
    var seat = []
    var color = 'green'
    var able = true
    for (var a = 1; a <= this.data.systemRow; a++) {
      seatColumn = []
      for (var b = 1; b <= this.data.systemColumn; b++) {
        if(b%2){                                   //疫情隔开一个座位坐人
          color = 'grey'
          able = true
        }else{
          color = 'grey'
          able = false
        }
        var seat = {'row':a,'column':b,'color':color,'able':able,'openid':''}
        seatColumn.push(seat)
        }
      seats.push(seatColumn)
      }
      this.setData({
        seats:seats,
        selectSeatNumber:0,
        row:0,
        column:0,
        note:'复位'
      })
      this.refresh()
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