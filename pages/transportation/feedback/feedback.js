// pages/transportation/feedback/feedback.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaClass:'inputBlock-blur',
    inputClass:'emailBlock-blur'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f0f0f0',
    })
    wx.setNavigationBarTitle({
      title: '意见反馈',
    })
    this.setData({
      info:{
        time:options.time,
        date:options.date,
        name:options.name,
        boundFor:options.boundFor,
        stop:options.stop
      }
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

  /**
   * 输入框聚焦
   */
  textareaFocus:function(){
    this.setData({
      textareaClass: 'inputBlock-active'
    })
  },

  /**
   * 输入框失焦
   */
  textareaBlur:function(){
    this.setData({
      textareaClass:'inputBlock-blur'
    })
  },

    /**
   * 输入框聚焦
   */
  inputFocus: function () {
    this.setData({
      inputClass: 'emailBlock-active'
    })
  },

  /**
   * 输入框失焦
   */
  inputBlur: function () {
    this.setData({
      inputClass: 'emailBlock-blur'
    })
  },

  /**
   * 提交表单绑定事件
   */
  formSubmit:function(res){
    console.log(res.detail.value);
    console.log(res.detail.formId);
    console.log(app.globalData.openID);
    wx.request({
      url: app.globalData.domain +'transportation/api/post_feedback_info.php',
      method:'POST',
      data:{
        route_name:this.data.name,
        time:this.data.time+':00',
        cur_date:this.data.date,
        end_station_name:this.data.boundFor,
        stop_name:this.data.stop,
        open_id:app.globalData.openID,
        form_id: res.detail.formId,
        feedback: res.detail.value.feedback,
        email: res.detail.value.email
      },
      success:function(res){
        console.log(res)
        if (res.data.success=true){
          wx.showToast({
            icon: 'none',
            title: '您已成功提交,谢谢反馈',
          })
          setTimeout(function () {
            wx.navigateBack({});
          }, 1000)
        }
      }
    })
  },

  /**
   * 监听返回按钮
   */
  navigateBack:function(){
    wx.navigateBack({});
  }
})