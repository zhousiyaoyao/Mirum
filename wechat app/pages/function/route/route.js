// pages/function/route/route.js
const app = getApp()
var markers = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showdata:[],
    select_list: [],
    ID: [],
    bool: true,
    article_Id: '',
    boolean: false,
    imgUrls: [],
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
    markers: markers,
    index: 0,
    new_list:[],
    polyline: [],
    title: ''
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  bindchange: function (e) {
    var that = this;
    markers = that.getSchoolMarkers()
    var page = e.detail.current;
    var ID = markers[page].id
    var title = that.getSchoolMarkers()[page].content
    var Latitude = that.getSchoolMarkers()[page].latitude;
    var Longitude = that.getSchoolMarkers()[page].longitude;
    that.setData({
      latitude: Latitude,
      longitude: Longitude,
      article_Id: ID,
      title: title
    })
  },

  markertap(id) {
    var that = this;
    var ID = id.markerId
    that.setData({
      index: (that.data.ID).indexOf(ID),
      article_Id: ID,
    })
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
      },
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
        var list = res.data.spotList;
        if (list == null) {
          var toastText = "获取数据失败" + res.data.errMsg;
          wx.showTOast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            showdata: list,
          });
        }
      }
    })
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
  
  formSubmit: function (e) {
    var that = this;
    that.setData({
      bool:  that.data.bool
    })

    wx.showModal({
      title: '提示',
      content: '确定要选择这条路线吗',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://127.0.0.1:8080/demo/superadmin/getareabyname',
            data: {"name" : e.detail.value.checkbox},
            method: 'GET',
            success:function(res){
              var list = res.data.spot;
              var imgUrls = [];
              list.forEach(function (v) {
                imgUrls.push(v.pictureUrl);
              });
              var ID = [];
              list.forEach(function (v) {
                ID.push(v.id);
              });
              that.setData({
                new_list: list,
                imgUrls: imgUrls,
                ID: ID,
              });
              that.setData({
                markers: that.getSchoolMarkers(),
                bool: !that.data.bool,
                boolean: !that.data.boolean,
                article_Id: that.getSchoolMarkers()[0].id,
                title: list[0].spotName
              })
              var points = []
              for (let item of that.getSchoolMarkers()){
              delete item.iconPath
              delete item.id
              delete item.label
              delete item.width
              delete item.height
              points.push(item)
              }
              that.setData({
                polyline: [{
                  points: points,
                  color: "#0091ff",
                  width: 1,
                  arrowLine: true
                }]
              })
            }
          })
        }
      }
    })
  },

  formReset: function () {
  },

  listenCheckboxChange: function (e) {
  },
  
  hide: function () {
    var that = this;
    that.setData({
      boolean: !that.data.boolean
    })
  },

  createMarker(point) {

    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "../../../image/location.png",
      id: point.id || 0,
      latitude: latitude,
      longitude: longitude,
      label: {
        x: -24,
        y: -26,
      },
      width: 30,
      height: 30,
      content: point.spotName
    };
    return marker;
  },

  getSchoolMarkers() {
    var market = [];

    for (let item of this.data.new_list) {

      let marker1 = this.createMarker(item);

      market.push(marker1)
    }
    return market;
  },
  
  daohang: function (e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.id
    wx.request({
      url: 'http://127.0.0.1:8080/demo/superadmin/getareabyid',
      data: { ID: id },
      method: 'GET',
      success: function (res) {
        var spot = res.data.spot;
        if (spot != undefined) {
          wx.openLocation({
            latitude: spot.latitude,
            longitude: spot.longitude,
          })
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
})