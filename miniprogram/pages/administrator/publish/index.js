// miniprogram/pages/advance/advance.js
var that
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    title: "",
    contact: '',
    introduction: '',
    articleid: '',
    website: '',
    pickernum:"",
    tag:[],
    user: {},
    images: [],
    picker: ['婚姻家庭', '工作事业', '医治释放', '物质层面', '财富加添', '灵性生命', '重生改变', '祷告成就', '关系修复', '生命成长', '其他'],
    imgList: [],
    column:"witness",
    columnList:["family","group","bible","movie","music","church","foods","meet","disciple"],
    type:"article",
    typeList:["video","audio",],
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      pickernum: e.detail.value
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
/**
   * 选择图片
   */
  ChooseImage: function(event) {
    wx.chooseImage({
      count: 2,
      sizeType:["compressed","original"],
      // sourceType:["album","camera"],
      success: function(res) {
        // 设置图片
        that.setData({
          imgList: res.tempFilePaths,
        })
        that.data.imgList = []
        console.log(res.tempFilePaths)
        for (var i in res.tempFilePaths) {
          // 将图片上传至云存储空间
          wx.cloud.uploadFile({
            // 指定要上传的文件的小程序临时文件路径
            cloudPath: 'test/' + that.timetostr(new Date()),
           
            filePath: res.tempFilePaths[i],
            // 成功回调
            success: res => {
              that.data.imgList.push(res.fileID)
              console.log(res.fileID)
            },
          })
        }
      },
    })
  },
  /**
   * 图片路径格式化
   */
  timetostr(time){
    var randnum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    var str = randnum +"_"+ time.getMilliseconds() + ".png";
    return str;
  },
  //弹出提示
  alert:function(t){
    wx.showModal({
        title:"系统提示",
        content:t,
        showCancel: false,
        confirmColor: '#000'
    });
  },
getcolumn(e){
  this.data.column = e.currentTarget.dataset.column
  // console.log(this.data.column)
},
gettype(e){
  this.data.type = e.currentTarget.dataset.type
  // console.log(this.data.column)
},
  /**
   * 提交
   */
  formSubmit: function (e) {
    this.data.tag=[]
    if(e.detail.value.tag){this.data.tag.push(e.detail.value.tag)}
    if(this.data.pickernum){this.data.tag.push(this.data.picker[this.data.pickernum])}
    
    this.data.imgList.push(e.detail.value.image)
    this.data.articleid = e.detail.value.articleid;
    this.data.title = e.detail.value.title;
    this.data.introduction = e.detail.value.introduction;
    this.data.website = e.detail.value.website;//获取填写数据   

    if (this.data.canIUse) {
      if (this.data.title == null|| this.data.title.length <= 0) {
        this.alert('请输入标题')
      } 
      else if (this.data.website == null|| this.data.website.length <= 0) {
        this.alert('请输入网址')
      } 
      else {
        this.saveDataToServer()
        wx.showToast({title: '提交成功~',})
      }

    } else {
      this.jugdeUserLogin();
    }
  },
  


  /**
   * 保存到user集合中
   */
  saveDataToServer: function (event) {
    db.collection('light').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        type:this.data.type,
        column:this.data.column,
        articleid:this.data.articleid,
        images: this.data.imgList,
        title:this.data.title,
        introduction:this.data.introduction,
        website:this.data.website,
        tag:this.data.tag
      },
      success: function(res) {
        console.log("保存成功")
        that.setData({
          pickernum: "",
          imgList:[]
        })
      },
      fail: function(res) {
        console.log("保存失败")
      }
    })
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    this.jugdeUserLogin();
    
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 数据库添加音频
  addAudio(){
    for(var i=1;i<3;i++){
      console.log(i)
    db.collection('course').add({
      data: {
        column:"qishilu",
        articleid:31,
        title:"启示录第三十一讲  2020-07-13",
        type:"audio",
        website:"",
        tag:["王约翰","启示录"],
      },
      success: function(res) {
        console.log("保存成功")
      },
      fail: function(res) {
        console.log("保存失败")
      }
    })}
  },
  /**
   * 判断用户是否登录
   */
  jugdeUserLogin: function (event) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {

              that.data.user = res.userInfo;
              console.log(that.data.user)
            }
          })
        }
      }
    })
  },
})
