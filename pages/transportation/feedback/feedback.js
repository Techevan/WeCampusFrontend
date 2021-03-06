// pages/transportation/feedback/feedback.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaClass:'inputBlock-blur',
    inputClass:'emailBlock-blur',
    infoHidden:true
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
    console.log(options.time)
    if(options.index=='true'){
      return;
    }
    this.setData({
      infoHidden:false,
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
    var thatT=this;

    // 判断字段是否为空
    if (res.detail.value.feedback == '' || res.detail.value.email==''){
      wx.showToast({
        icon: 'none',
        title: '反馈意见和邮箱均必填，请重试',
      })
      return;
    }

    // 根据入口判断显示内容
    if(this.data.infoHidden==true){
      console.log('Aaaaaaaaaa')
      wx.request({
        url: app.globalData.domain + 'transportation/api/post_feedback_info.php',
        method: 'POST',
        header: app.globalData.requestHeader,
        data: {
          route_name: '',
          time: '00:00:00',
          cur_date: '',
          end_station_name: '',
          stop_name: '',
          open_id: app.globalData.openID,
          form_id: res.detail.formId,
          feedback: res.detail.value.feedback,
          email: res.detail.value.email
        },
        success: function (res) {
          if (res.data.success = true) {
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
      return;
    }
    wx.request({
      url: app.globalData.domain +'transportation/api/post_feedback_info.php',
      method:'POST',
      header: app.globalData.requestHeader,
      data:{
        route_name:thatT.data.info.name,
        time:thatT.data.info.time+':00',
        cur_date:thatT.data.info.date,
        end_station_name:thatT.data.info.boundFor,
        stop_name:thatT.data.info.stop,
        open_id:app.globalData.openID,
        form_id: res.detail.formId,
        feedback: res.detail.value.feedback,
        email: res.detail.value.email
      },
      success:function(res){
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