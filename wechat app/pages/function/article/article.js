// pages/function/shopping/shopping.js
const app = getApp()
Page({
  data: {
    id: undefined,
    owner: '',
    title: '',
    context: '',
    create_time: '',
    imgUrls: [],
    tag: '',
    enContext: '',
    enAbout: '',
    playTime: '',
    operateTime: '',
    indicatorDots: true,
    interval: 5000,
    duration: 1000,
    currentTab: 0,
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.id != undefined) {
      this.setData({
        id: options.id
      });
    } else {
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:8080/demo/superadmin/getarticlebyid',
      data: { ID: options.id },
      method: 'GET',
      success: function (res) {
        var article = res.data.article;
        if (article != undefined) {
          var a = article.url.split(",")
          console.log(a)
          that.setData({
            title: article.title,
            owner: article.owner,
            context: article.context,
            create_time: article.create_time,
            imgUrls: a,
            enContext: article.enContext,
            enAbout: article.enAbout,
            playTime: article.playTime,
            operateTime: article.operateTime
          });
          if (options.id <= 5){
            that.setData({
              tag: '景点'
            })
          } else if (options.id > 5 && options.id<= 8){
            that.setData({
              tag: '购物'
            })
          }else{
            that.setData({
              tag: '餐饮'
            })
          }
        } else {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})