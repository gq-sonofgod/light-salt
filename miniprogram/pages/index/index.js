var skipPage = 0
Page({
  data: {
    light:[],
    PageCur: 'home',
    me:[],
    column:[],
    loadingHidden: true
  },
  onShareAppMessage() {
    return {
      imageUrl: 'https://mmbiz.qpic.cn/mmbiz_png/6X5kep7ic2fHqfCjWzwICaGrnHcE7Fjck40grnUZo5wvnhkWHazSv7xRSLdQial82ImSCovZSPDpP9L0QyGfo7RQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
      path: '/pages/index/index'
    }
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    var that = this
    db.collection('light').where({column:"witness"}).count({
      success: function(res) {
        that.setData({
          datalength:res.total//获取数据总条数
        })
      }
    })  
},

 /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.light.length==0){
      skipPage=0
      this.getData()
    } 
  },
  /**
* 获取列表数据
*/
getData: function() {
  const db = wx.cloud.database();
  var that = this
  db.collection('light').where({column:"witness"}).orderBy('articleid', 'desc').skip(skipPage).get({
      success: function(res) {
        that.setData({
          light: that.data.light.concat(res.data)         
        })
        console.log(that.data.light)
        wx.stopPullDownRefresh();
      },
      fail: function(event) {
        wx.hideNavigationBarLoading(); //隐藏加载
        wx.stopPullDownRefresh();
      }
    })

},
 /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.light.length==this.data.datalength){
      console.log("daodi")
      this.setData({
        isLoad: true
      })
    }else{
      this.setData({
        loadingHidden: false
      });
    skipPage+=20
    this.getData()
    }
  },
//跳转到详情页
bindViewTap: function(e) {
var website =encodeURIComponent(JSON.stringify(e.currentTarget.dataset.website));
console.log(website)

wx.navigateTo({
  url: "./detail?website=" + website//传递参数
 })
},
})