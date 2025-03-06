// pages/rank/rank.js
// 引入
import res from "../../request/request"
Page({
  // 页面的初始数据
  data: {
    // 所有榜单
    allRank: [],
    // 所有榜单选中的下标
    active: 0,
    // 榜单列表
    rankList: []
  },
  //  生命周期函数--监听页面加载
  onLoad(options) {
    // 调用获取所有榜单的方法
    this.getAllRank()
  },
  // 1. 获取所有榜单的方法
  getAllRank() {
    res.request({
      url: "/top/index"
    }).then(data => {
      console.log("所有榜单", data);
      // 赋值操作
      this.setData({
        allRank: data
      })
      // 调用点击切换的方法
      this.onChange()
    })
  },
  // 2. 点击切换
  onChange(event) {
    // 回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    let index = event ? event.detail.name : 0
    let id = this.data.allRank[index].id
    console.log("id==>", id);
    res.request({
      url: "/top/list",
      // 如果有参数 写在data里面
      data: {
        id
      }
    }).then(data => {
      console.log("列表", data);
      this.setData({
        rankList: data
      })
    })
  },

  // 3.去详情的方法
  goDetail(event) {
    // console.log("id=>", event.currentTarget.dataset.id);
    // 获取点击元素的数据id
    let id = event.currentTarget.dataset.id;
    // 跳转到详情页
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + id
    });
  },
})