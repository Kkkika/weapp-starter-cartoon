// pages/cate/cate.js
// 引入
import res from "../../request/request"
Page({
  // 页面的初始数据
  data: {
    // 所有分类
    allCate: {},
    // 第一个分类被选择的下标
    cateIndex: 0,
    // 第二个分类被选择的下标
    endIndex: 0,
    // 第三个分类被选择的下标
    sortIndex: 0,
    // 分类列表
    cateList: []
  },
  // 生命周期函数--监听页面加载
  onLoad(options) {
    // 调用获取所有分类的方法
    this.getAllCate()
  },
  // 1. 获取所有分类的方法
  getAllCate() {
    res.request({
      url: "/category/list"
    }).then(data => {
      console.log("所有方法", data);
      this.setData({
        allCate: data
      })
      // 调用点击切换的方法
      this.clickTag()
    })
  },

  // 2. 点击切换
  clickTag(event) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    console.log("event", event);
    if (event) {
      let index = event.detail.index
      let tag = event.detail.tag
      this.setData({
        [tag]: index
      })
    }
    let allCate = this.data.allCate
    // 获取id
    let cateid = allCate.category[this.data.cateIndex].id
    let end = allCate.end[this.data.endIndex].id
    let sort = allCate.sort[this.data.sortIndex].id
    console.log(cateid, end, sort);
    res.request({
      url: "/book/list",
      data: {
        cateid,
        end,
        sort
      }
    }).then(data => {
      console.log("分类列表", data);
      this.setData({
        cateList: data
      })
    })
  },

  // 3. 去详情的方法
  goDetail(event) {
    console.log("id=>", event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?id='+id
    });
  }
})