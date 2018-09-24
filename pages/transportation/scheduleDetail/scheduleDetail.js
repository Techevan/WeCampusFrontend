// pages/transportation/scheduleDetail/scheduleDetail.js
/**
 * 初始变量：
 */
var scheduleTime='';
var routeName='';
var deptDate='';
var deptStop='';
var boundFor='';
var positionInfo='';
var GPSx='';
var GPSy='';
var routeStop=['安亭地铁站','曹安公路安谐路','同济大学嘉定校区','曹杨路中山北二路','同济大学四平路校区'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "img/location.png",
      id: 0,
      latitude: 31.286720,
      longitude: 121.212030,
      width: 30,
      height: 30,
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    scheduleTime = options.scheduleTime;
    routeName = options.routeName;
    deptDate = options.deptDate;
    deptStop = options.deptStop;
    boundFor = options.boundFor;
    positionInfo = options.positionInfo;
    GPSx = options.GPSx;
    GPSy = options.GPSy;
    wx.setNavigationBarTitle({
      title: routeName,
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f0f0f0',
    })
    this.setData({
      scheduleTime:scheduleTime,
      routeName:routeName,
      deptDate:deptDate,
      deptStop:deptStop,
      boundFor:boundFor,
      
    })
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

  }
})