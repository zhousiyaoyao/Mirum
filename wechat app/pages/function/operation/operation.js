// pages/function/shopping/shopping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: undefined,
    spotName: '',
    longitude: '',
    latitude: '',
    addUrl: "http://127.0.0.1:8080/demo/superadmin/addspot",
    modifyUrl: "http://127.0.0.1:8080/demo/superadmin/modifyspot"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options.id);
    if(options.id != undefined){
    this.setData({
      id: options.id
    });
    }else{
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:8080/demo/superadmin/getareabyid',
      data: { ID : options.id},
      method: 'GET',
      success: function(res){
        var spot = res.data.spot;
        if(spot != undefined){
          that.setData({
            spotName: spot.spotName,
            longitude: spot.longitude,
            latitude: spot.latitude
          });
        }else{
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

  formSubmit: function(e){
    var that = this;
    var formData = e.detail.value;
    console.log(formData);
    console.log(that.data.id);
    var url = that.data.addUrl;
    if (that.data.id != undefined){
      formData.id = that.data.id;
      url = that.data.modifyUrl;
    }
    wx.request({
      url: url,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res){
        console.log(res);
        var result = res.data.ssuccess;
        var toastText = "操作成功";
        if(result != true){
          toastText = "操作失败" + res.data.errMsg;
        }
        wx.showToast({
          title: 'toastText',
          icon: '',
          duration: 2000
        });
        wx.redirectTo({
          url: '../spot/spotOption',
        })
      }
    })
  }
})