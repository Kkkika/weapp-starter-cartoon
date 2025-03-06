// pages/cartoon/cartoon.js
// 引入
import res from "../../request/request"
Page({
  // 页面的初始数据
  data: {
    // 图片列表
    imgList: [],
    // 标题
    title:"",
    // 显示隐藏
    isShow:false
  },
  // 生命周期函数--监听页面加载
  onLoad(options) {
    // 调用获取漫画图片的方法
    this.getImgList(options.id)
    this.setData({
      title:options.name
    })
  },
  // 1. 获取漫画图片的方法
  getImgList(id) {
    res.request({
      url:"/book/showChapter",
      data:{
        id
      }
    }).then(data=>{
      console.log("漫画",data);
      this.setData({
          imgList:data.piclist
      })
    })
  },
  // 2. 返回
  goBack(){
    wx.navigateBack()
  },
  // 3. 切换
  toggle(){
    this.setData({
      isShow:!this.data.isShow
    })
  }


})