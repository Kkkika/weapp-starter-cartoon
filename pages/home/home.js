// pages/home/home.js
// 引入
import res from "../../request/request"
Page({
  //页面的初始数据
  data: {
    // 控制弹窗显示
    isFirstEntry: true, // 用于标记是否是第一次进入页面
    // 默认搜索提示
    defaultSearchHint: "",
    // 轮播图数据
    bannerList: [],
    // 列表数据
    tabList: [],
  },

  //生命周期函数--监听页面加载
  onLoad(options) {
    // 调用首页列表的方法
    this.getHomeList();
    // 获取默认搜索提示
    this.getDefaultSearchHint();
    // 如果是第一次进入页面，则显示弹窗
    if (this.data.isFirstEntry) {
      this.showWelcome();
    }
  },

  // 1.显示弹窗的方法
  showWelcome() {
    // 调用API获取弹窗内容
    res.request({
      url: "/index/tan",
    }).then(data => {
      // console.log("弹窗内容 =>", data);
      // 使用wx.showModal显示弹窗
      wx.showModal({
        title: data.title, // 弹窗标题
        content: data.text, // 弹窗内容
        showCancel: false, // 不显示取消按钮
        // confirmText: '确定', // 确定按钮的文字,默认是确定
      });
    }).catch(error => {
      console.error("获取弹窗数据失败", error);
    });
  },

  // 2.获取默认搜索提示的方法
  getDefaultSearchHint() {
    res.request({
      url: "/so/navtips"
    }).then(data => {
      // 赋值
      this.setData({
        defaultSearchHint: data.title
      });
    }).catch(error => {
      console.error("获取 默认搜索提示 失败", error);
    });
  },

  // 3.搜索函数，点击搜索框时触发
  onClickInput: function () {
    // 加载提示
    wx.showLoading({
      title: '努力加载中...',
    });
    // 直接跳转到搜索页面
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 4.获取首页列表的方法
  getHomeList() {
    res.request({
      url: "/index/index"
    }).then(data => {
      // 赋值
      this.setData({
        bannerList: data.recommend,
        tabList: data.tab
      })
    })
  },

  // 5.去详情的方法
  goDetail(event) {
    // console.log("id=>", event.currentTarget.dataset.id);
    // 获取点击元素的数据id
    let id = event.currentTarget.dataset.id;
    // 跳转到详情页
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + id
    });
  },

  // 6.换一换事件处理函数
  onChange(event) {
    const id = event.currentTarget.dataset.id;
    // console.log("event=>", event);
    res.request({
      url: "/index/exchange",
      data: { id }
    }).then(data => {
      // console.log("换一换数据", data);
      // 更新列表数据
      // 查找tabList数组中id匹配的项的索引
      const tabIndex = this.data.tabList.findIndex(tab => tab.id === id);
      // 如果找到了对应的项（tabIndex !== -1表示找到了）
      console.log("tabIndex", tabIndex);
      if (tabIndex !== -1) {
        this.setData({
          // 动态设置数据路径
          [`tabList[${tabIndex}].list`]: data.list
        });
      }
    });
  },

  // 7.查看更多事件处理函数
  onMore(event) {
    const id = event.currentTarget.dataset.id;
    res.request({
      url: "/index/more",
      data: { id }
    }).then(data => {
      // console.log("更多数据", data);
      // 更新列表数据
      const tabIndex = this.data.tabList.findIndex(tab => tab.id === id);
      if (tabIndex !== -1) {
        this.setData({
          [`tabList[${tabIndex}].list`]: data
        });
      }
    });
  },

});