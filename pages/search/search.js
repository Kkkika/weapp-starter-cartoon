// pages/search/search.js
import res from "../../request/request"
Page({
  // 页面的初始数据
  data: {
    // 搜索关键词，初始化为空字符串
    keyword: "",
    // 搜索历史列表，初始化为空数组
    historyList: [],
    // 热门搜索关键词列表
    hotSearchList: [],
    // 搜索结果列表
    searchResults: [],
    // 是否显示清空全部按钮
    showClearAllButton: false,
    // 搜索提示, 结果显示时就设置为false
    showSearchTips: true,
    //  没有搜索结果时为true
    noResults: false
  },

  // 生命周期函数--监听页面加载
  onLoad(options) {
    // 尝试从本地存储中获取搜索历史数组，如果不存在则默认为空数组
    let searchKeyArr = wx.getStorageSync('searchKeyArr') || null;
    // 更新历史数组
    this.setData({ historyList: searchKeyArr });
    // 获取热门搜索关键词
    this.getHotSearch();
    // 关闭加载提示
    wx.hideLoading();
  },

  // 1.输入框内容改变时触发
  onChange(e) {
    // console.log(e);
    // 更新页面数据中的 keyword 为输入框的当前值
    this.setData({
      keyword: e.detail
    })
  },

  // 2.确认搜索
  onSearch() {
    // 执行搜索并获取结果
    this.getSearchResults();
    // 获取输入的关键词并去除两端空格
    let currentKeyword = this.data.keyword.trim();
    // 在控制台输出当前的搜索关键词
    console.log(currentKeyword);
    // 获取当前的搜索历史列表，如果未定义则初始化为空数组
    let hisArr = this.data.historyList || [];
    // 将当前关键词添加到历史列表的开头
    if (currentKeyword && currentKeyword !== '' && !hisArr.includes(currentKeyword)) {
      hisArr.unshift(currentKeyword);
    }
    // 使用 Set 去除重复的关键词，然后展开到数组中
    hisArr = [...new Set(hisArr)];
    // 截取数组的前10项，限制历史列表的长度
    hisArr = hisArr.slice(0, 10);
    // 更新页面数据中的搜索历史列表
    this.setData({
      historyList: hisArr,
      keyword: '' // 清空关键词输入
    });
    // 同步搜索历史列表到本地存储
    wx.setStorageSync('searchKeyArr', hisArr);
  },

  // 3.点击 历史关键词和热搜词 时触发的函数
  onKeywordTap(e) {
    // 检查是否显示清空全部按钮
    if (this.data.showClearAllButton) {
      // true则return，不执行下面赋值的代码
      return;
    }
    // 赋值为 被点击的关键词
    this.setData({
      keyword: e.currentTarget.dataset.keyword
    });
    // 直接触发搜索
    this.onSearch();
  },

  // 4.清空所有历史-->当只有一个历史记录，直接删除
  clearAllHistoryOneKeyword() {
    // 检查历史列表是否只有一个元素
    if (this.data.historyList.length === 1) {
      // 直接清空历史列表
      this.setData({
        historyList: [],
        // 切换清空全部按钮为隐藏
        showClearAllButton: false
      });
      // 同步清空历史列表到本地存储
      wx.removeStorageSync('searchKeyArr');
    }
  },

  // 5.清空所有历史
  clearAllHistory() {
    this.setData({
      // 清空历史列表
      historyList: [],
      // 切换清空全部按钮为隐藏
      showClearAllButton: false
    });
    // 同步清空历史列表到本地存储
    wx.removeStorageSync('searchKeyArr');
  },

  // 6.显示清空全部按钮
  showClearAll() {
    this.setData({
      showClearAllButton: true
    });
    this.clearAllHistoryOneKeyword();
  },

  // 7.隐藏清空全部按钮
  hideClearAll() {
    this.setData({
      showClearAllButton: false
    });
  },

  // 8.删除单个搜索记录
  deleteKeyword(e) {
    // 获取被点击的记录的索引
    const index = e.currentTarget.dataset.index;
    // 获取当前的搜索历史列表
    let historyList = this.data.historyList;
    // 从列表中移除该项
    historyList.splice(index, 1);
    // 更新页面数据
    this.setData({ historyList: historyList });
    // 同步更新本地存储
    wx.setStorageSync('searchKeyArr', historyList);
  },

  // 9.获取热门搜索关键词
  getHotSearch() {
    res.request({
      url: "/so/hot"
    }).then(data => {
      // console.log("数据有吗", data);
      if (data) {
        this.setData({
          hotSearchList: data.list
        });
      } else {
        console.error("获取热门搜索失败：数据格式不正确");
      }
    }).catch(error => {
      console.error("获取热门搜索失败", error);
    });
  },

  // 10.获取搜索结果
  getSearchResults() {
    res.request({
      url: "/so/comic",
      data: {
        // keyword: "总裁",
        // keyword: '',
        keyword: this.data.keyword.trim(),
        p: 1
      }
    }).then(data => {
      // console.log("数据有吗", data.list);
      if (data && data.list && data.list.length) {
        // 有数据时，设置搜索结果，并隐藏搜索历史和热门搜索视图
        this.setData({
          searchResults: data.list,
          // 隐藏搜索历史和热门搜索视图
          showSearchTips: false
        });
      } else {
        // 没有数据时，显示“搜索不到”的信息，并显示搜索历史和热门搜索视图
        this.setData({
          searchResults: [],
          showSearchTips: false,
          noResults: true // 控制“搜索不到”视图的显示
        });
      }
    }).catch(error => {
      console.error("获取搜索结果失败", error);
    });
  },

  // 11.去详情的方法
  goDetail(event) {
    // console.log("id=>", event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + id
    });
  },

  //  返回
  goBack() {
    wx.navigateBack()
  },
});