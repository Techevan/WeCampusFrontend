// pages/personalCenter/personalCenter.js
var app = getApp();
var userInfo={};
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this;
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    wx.setNavigationBarTitle({
      title: '我的微校',
    })
    wx.request({
      url: app.globalData.domain+'api/get_user_info.php',
      data:{
        open_id:app.globalData.openID
      },
      success:function(res){
        console.log(res)
        userInfo=res.data;
        userInfo.avatar ='https://www.we-campus.cn/WeCampus/data/avatar/'+userInfo.avatar
        that.setData({
          userInfo:userInfo
        })
      }
    })
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