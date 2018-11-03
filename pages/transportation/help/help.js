// pages/transportation/help/help.js
var swiperText=new Array();
swiperText.push('点击站点名切换出发站点');
swiperText.push('点击这里切换出发时间');
swiperText.push('点击这里切换出发日期');
swiperText.push('点击这里反馈意见和乘车体验')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'img/1.png',
      'img/2.png',
      'img/3.png',
      'img/4.png'
    ],
    swiperText:'点击站点名切换出发站点'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('help', true);
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    wx.setNavigationBarTitle({
      title: '出行助手使用帮助',
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

  },

  buttonClick:function(){
    wx.navigateBack({})
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3399ff',
    })
  },

  swiper:function(e){
    console.log(e.detail.current)
    this.setData({
      swiperText:swiperText[e.detail.current]
    })
  }
})