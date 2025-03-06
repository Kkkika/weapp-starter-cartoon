// pages/detail/detail.js
// 引入
import res from "../../request/request"
Page({
  // 页面的初始数据
  data: {
    // 详情
    detail: {},
    // 目录
    listChapter: [],
    // 目录选择的下标
    active: 0,
    // 存储评论数据
    comments: {},
    // 默认头像图片路径
    defaultAvatar: '/image/user.png',
    // 存储推荐模块数据
    recommendations: {},


  },
  // 生命周期函数--监听页面加载
  onLoad(options) {
    // 调用获取详情的方法
    this.getDetail(options.id)
    // 调用获取目录的方法
    this.getListChapter(options.id)
    // 获取评论
    this.getComments(options.id)
    // 获取相关漫画推荐
    this.getRecommendations(options.id)
  },

  // 1.获取详情
  getDetail(id) {
    res.request({
      url: "/book/show",
      data: {
        id
      }
    }).then(data => {
      // console.log("data", data);
      this.setData({
        detail: data
      })
    })
  },

  // 2. 获取目录
  getListChapter(id) {
    res.request({
      url: "/book/listChapter",
      data: {
        id
      }
    }).then(data => {
      // console.log("目录", data);
      this.setData({
        listChapter: data
      })
    })
  },

  // 3. 返回
  goBack() {
    wx.navigateBack({
      delta: 2
    })
  },

  // 4. 去漫画的方法
  goCartoon(event) {
    console.log("id==>", event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id
    let name = event.currentTarget.dataset.name
    let index = event.currentTarget.dataset.index
    this.setData({
      active: index
    });
    wx.navigateTo({
      url: '../../pages/cartoon/cartoon?id=' + id + '&name=' + name
    });
  },

  // 5. 获取评论
  getComments(id) {
    res.request({
      url: "/comment/list",
      data: {
        did: id,
        // did: 128,
        pn: 1,
        ps: 3
      }
    }).then(data => {
      this.setData({
        comments: data,
        // 保存默认评论数据
        defaultComments: data
      });
    })
  },

  // 6.图片加载失败处理函数
  onAvatarError: function (event) {
    // 当图片加载失败时，设置图片 src 为默认头像
    const id = event.currentTarget.dataset.id;
    const newAvatar = this.data.defaultAvatar;
    const comments = this.data.comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, uhead: newAvatar };
      }
      return comment;
    });
    this.setData({ comments });
  },

  // 7. 点赞评论
  likeComment(event) {
    const commentId = event.currentTarget.dataset.id;
    const commentIndex = this.data.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
      // 模拟点赞操作，实际应用中需要请求后端接口
      const newComments = [...this.data.comments];
      // 切换点赞状态
      newComments[commentIndex].has_like = !newComments[commentIndex].has_like;
      // 更新点赞计数
      newComments[commentIndex].like_count += newComments[commentIndex].has_like ? 1 : -1;
      // 更新数据
      this.setData({
        comments: newComments
      });
    }
  },

  // 8. 显示所有评论
  showAllComments() {
    if (!this.data.allCommentsLoaded) {
      this.setData({ allCommentsLoaded: true }); // 标记为加载所有评论
      let nextPage = 2; // 从第二页开始加载
      this.loadAllComments(this.data.detail.id, nextPage);      
    }
  },

  // 9.加载所有评论
  loadAllComments(id, page) {
    let that = this;
    res.request({
      url: "/comment/list",
      data: {
        did: id,
        pn: page,
        ps: 5
      }
    },
      false).then(data => {
        // 如果当前页有数据，继续加载下一页
        if (data.length > 0) {
          let newComments = [...that.data.comments, ...data];
          that.setData({
            comments: newComments
          });
          // 递归调用，加载下一页
          that.loadAllComments(id, page + 1);
        } else {
          // 如果当前页没有数据，表示所有评论已加载完毕
          that.setData({ allCommentsLoaded: true });
        }
      });
  },

  // 10.收起所有评论
  toggleComments() {
    this.setData({
      // 收起所有评论，那么重置为默认评论
      comments: [...this.data.defaultComments],
      allCommentsLoaded: false
    });
  },

  // 11.获取相关漫画推荐
  getRecommendations(id) {
    res.request({
      url: "/book/recommend",
      data: {
        id
        // id: 128
      }
    }).then(data => {
      console.log("漫画推荐", data)
      if (data.length > 0) {
        this.setData({
          recommendations: data
        });
      }
    }).catch(error => {
      console.error("获取推荐漫画失败", error);
    });
  },

  // 12.去详情的方法
  goDetail(event) {
    // console.log("id=>", event.currentTarget.dataset.id);
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/detail/detail?id=' + id
    });
  },
})