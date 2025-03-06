// 次数
let num = 0
// 公共地址
let baseUrl = "https://apis.netstart.cn/haokan"
const request = (obj, showLoading = true) => {
  return new Promise(reslove => {
    // 次数加1
    num++
    // 加载提示
    if (showLoading) {
      wx.showLoading({
        title: '努力加载中...',
      });
    }
    // 发送网络请求
    wx.request({
      // url 接口地址
      url: baseUrl + obj.url,
      // 参数
      data: obj.data,
      // 成功
      success: res => {
        reslove(res.data.data)
        // 次数减一
        num--
        // 判断全部网络请求都成功了
        if (num == 0) {
          // 关闭加载提示
          wx.hideLoading()
        }
      }
    })
  })
}

export default {
  request
}