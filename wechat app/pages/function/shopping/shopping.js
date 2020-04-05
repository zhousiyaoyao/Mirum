// pages/function/spot/spot.js
const app = getApp()
var spot_list = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    boolean: true,
    imgUrls: [],
    spot_ID: '',
    spot_list: spot_list,
    shopping_imgUrls: [],
    shopping_ID: '',
    shopping_list: [],
    indicatorDots: true,
    interval: 5000,
    duration: 1000,
    currentTab: 0,
    latitude: '',
    longitude: '',
    scale: '20',
    markers: [],
    index: '',
    title: ''
  },


  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  bindchange: function (e) {
    var that = this;
    var page = e.detail.current;
    var title = that.getSchoolMarkers()[page].content
      var Latitude = that.getSchoolMarkers()[page].latitude;
      var Longitude = that.getSchoolMarkers()[page].longitude;
      that.setData({
        latitude: Latitude,
        longitude: Longitude,
        title: title
      })
  },

  markertap(id) {
    var that = this;
    var ID = id.markerId - 6
    that.setData({
      index: ID
    })
    if (ID == 0) {
      var Latitude = that.getSchoolMarkers()[ID].latitude;
      var Longitude = that.getSchoolMarkers()[ID].longitude;
      that.setData({
        latitude: Latitude,
        longitude: Longitude,
      })
    } else {
      var Latitude = that.getSchoolMarkers()[ID - 1].latitude;
      var Longitude = that.getSchoolMarkers()[ID - 1].longitude;
      that.setData({
        latitude: Latitude,
        longitude: Longitude,
      })
    }
    this.mapCtx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        that.setData({
          markers: that.getSchoolMarkers(),
          scale: 12,
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          view: {
            Height: res.windowHeight
          },
        })
      }
    })

    wx.request({
      url: "http://127.0.0.1:8080/demo/superadmin/listspot",
      method: 'GET',
      data: {},
      success: function (res) {
        console.log(res.data.spotList)
        var list = res.data.spotList;
        var imgUrls = [];
        list.forEach(function (v) {
          imgUrls.push(v.pictureUrl);
        });
        var ID = [];
        list.forEach(function (v) {
          ID.push(v.id);
        });
        if (list == null) {
          var toastText = "获取数据失败" + res.data.errMsg;
          wx.showTOast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            spot_list: list.slice(5, 8),
            imgUrls: imgUrls.slice(5, 8),
            spot_ID: ID.slice(5, 8),
            title: list[5].spotName
          });
        }
      }
    })

  },

  getSchoolMarkers() {

    var market = [];

    for (let item of this.data.spot_list) {

      let marker1 = this.createMarker(item);

      market.push(marker1)
    }
    return market;
  },

  createMarker(point) {

    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../../image/location.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      content: point.spotName,
      label: {
        x: -24,
        y: -26,
      },
      width: 30,
      height: 30
    };
    return marker;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext("map")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
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

  hide: function () {
    var that = this;
    that.setData({
      boolean: !that.data.boolean
    })
  },
  daohang: function(e){
    var that = this;
    console.log(e)
    var id = e.currentTarget.id
    console.log(that.getSchoolMarkers())
    wx.openLocation({
      latitude: that.getSchoolMarkers()[id-6].latitude,
      longitude: that.getSchoolMarkers()[id-6].latitude,
    })
  },
})