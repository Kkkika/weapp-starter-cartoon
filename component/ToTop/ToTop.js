// component/ToTop/ToTop.js
Component({
  // 组件的方法列表
  methods: {
    // 回到顶部
    toTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }
  }
})