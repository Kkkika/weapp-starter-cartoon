**基础功能**：

首页-搜索-轮播图-列表；去详情页

回到顶部==>home首页；rank榜单；cate分类；detail详情；cartoon漫画；

榜单

分类-分类导航-跳转详情

详情-目录



**新增：**

1. 首页：

   第一次进入弹窗；

   首页列表的换一换和查看更多，可进行列表更新；

   搜索框跳转；

2. 搜索框：

   历史搜索，限制显示最大记录数，可单独删除，可一次清空全部（需再次确认，防止误触），只有一条记录直接清空，可点击直接查询；

   热门搜索，可直接点击搜索；

   搜索结果，可跳转到详情页；

3. 详情页：

   热门评论，头像昵称评论，点赞（变粉红）和回复，可查看全部评论（到底提示暂无更多）；

   收起评论；

   相关推荐，跳转到详情页；

4. 我的页面

   登陆注册，跳转页面；

   菜单导航栏，视图容器，跳转页面；

   其它功能，van-cell，跳转页面；



**新增功能展示：**

**1.首页弹窗**

接口：https://apis.netstart.cn/haokan/index/tan

官方文档：https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html

【首页加一个弹窗，进入首页的第一次显示】

【`wx.showToast`只能显示一个`title`。`wx.showModal`允许分别设置标题和内容】

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226095141434.png" alt="image-20241226095141434" style="zoom: 25%;" />

**2.首页搜索框提示词**

接口：https://apis.netstart.cn/haokan/so/navtips

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226095222712.png" alt="image-20241226095222712" style="zoom:25%;" />

**3.首页换一换**

在首页tab列表里加换一换按钮

接口：https://apis.netstart.cn/haokan/index/exchange

接口地址：`index/exchange`

参数：id 首页列表的tab字段内id

请求示例：`https://apis.netstart.cn/haokan/index/exchange?id=13`

**3.首页更多**

在首页tab列表里加查看更多按钮

接口：https://apis.netstart.cn/haokan/index/more

接口地址：`index/more`

参数：id 首页列表的tab字段内id

参数：p 页码,默认为1

参数：n 分页大小，默认为21

请求示例：`hhttps://apis.netstart.cn/haokan/index/more?id=13`

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226214003544.png" alt="image-20241226214003544" style="zoom:25%;" /><img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226214008199.png" alt="image-20241226214008199" style="zoom:25%;" />

**4.搜索**

4.1.点击首页的搜索框 跳转到搜索页面

4.2.热门搜索

接口：https://apis.netstart.cn/haokan/so/hot

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226101157362.png" alt="image-20241226101157362" style="zoom:25%;" /><img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226101202260.png" alt="image-20241226101202260" style="zoom:25%;" />

4.2.搜索结果列表

wx:if  热门搜索和搜索结果进行切换 显示隐藏

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226140728899.png" alt="image-20241226140728899" style="zoom:25%;" /><img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226140733352.png" alt="image-20241226140733352" style="zoom:25%;" /><img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226140803348.png" alt="image-20241226140803348" style="zoom:25%;" />

**5.个人页面**

5.1.个人信息

5.2. cell单元格  点击可以进行跳转到其他页面

去书架页面  去每日更新页面 阅读历史页面 收藏页面   意见反馈页面  产品文化页面  。。。

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226173731453.png" alt="image-20241226173731453" style="zoom:25%;" /><img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226173735574.png" alt="image-20241226173735574" style="zoom:25%;" />



**6.评论**

在每个漫画的详情页面都有评论

接口：https://apis.netstart.cn/haokan/comment/list

接口地址：`comment/list`

参数：did 漫画id

参数：pn 页码数，默认为1

参数：ps 页码大小，默认为20

请求示例：`https://apis.netstart.cn/haokan/comment/list?did=128&pn=1&ps=20`

【显示用户头像uhead 用户昵称uname 用户评论content 该评论点赞数like_count 该评论回复数reply_count 是否点赞has_like 。当头像图片获取失败则使用/image/user.png。点赞和回复靠右显示，图标使用icon 属性like-o和comment-o。按钮显示全部精彩评论，点击显示全部精彩评论，就把所有页码的评论都显示出来。设置一个悬浮按钮在展开所有评论之后显示，用来收起所有评论】
<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226213832816.png" alt="image-20241226213832816" style="zoom:25%;" /><img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226213838210.png" alt="image-20241226213838210" style="zoom:25%;" /><img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241227005135483.png" alt="image-20241227005135483" style="zoom:25%;" />



**7.相关漫画推荐**

在每个漫画的详情页面都有一个个性化推荐模块

接口：https://apis.netstart.cn/haokan/book/recommend

接口地址：`book/recommend`

参数：id  漫画id

请求示例：`https://apis.netstart.cn/haokan/book/recommend?id=128`

<img src="C:\Users\A\AppData\Roaming\Typora\typora-user-images\image-20241226215731508.png" alt="image-20241226215731508" style="zoom:25%;" />
