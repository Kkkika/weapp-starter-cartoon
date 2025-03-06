// pages/mine/mine.js
Page({
  // 1. 跳转到普通页面
  goIndex() {
    wx.navigateTo({
      url: '../../pages/index/index',
    });
  },

  // 2. 跳转到tabBar页面
  goHome() {
    wx.switchTab({
      url: '../home/home',
    });
  },

  // 3. 跳转页面 带参数
  goAA(event) {
    // 获取自定义属性a的值
    let a = event.currentTarget.dataset.a;
    console.log("event", a);
    wx.navigateTo({
      // 带参数的url怎么写？
      // 路径？参数名=值
      url: '../AA/AA?aa=' + a,
    });
  }
});