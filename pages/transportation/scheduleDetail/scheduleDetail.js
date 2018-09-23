// pages/transportation/scheduleDetail/scheduleDetail.js
/**
 * 初始变量：
 */

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
    wx.setNavigationBarTitle({
      title: '北安跨线',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f0f0f0',
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