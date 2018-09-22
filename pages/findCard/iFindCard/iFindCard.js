// pages/findCard/iFindCard/iFindCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toUpload:'',//要上传的图片文件路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ee9a00',
    });
    wx.setNavigationBarTitle({
      title: '捡到卡了',
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
   * 用户上传校园卡正面照按钮
   */
  uploadButton:function(){
    let that=this;
    wx.chooseImage({
      count:1,
      sizeType:'compressed',
      success: function(res) {
        that.setData({
          toUpload:res.tempFilePaths[0]
        })
        //路径：res.tempFilePaths[0]
        /*wx.uploadFile({
          url: '',
          filePath: res.tempFilePaths[0],
          name: '',
        })
        */
      },
    })
  },

  /**
   * 预览
   */
  previewPhoto:function(){
    let that=this;
    if(that.data.toUpload){
      wx.previewImage({
        urls: [that.data.toUpload],
      })
    }else{
      wx.showModal({
        title: '上传校园卡',
        content: '点击左侧按钮上传校园卡有信息的一面吧！上传之后可以点击小图片放大预览喏！',
        showCancel: false,
        confirmText: '知道啦',
        confirmColor: '#ee9a00',
      })
    }
  },

  /**
   * 提交找到卡信息
   */
  submit:function(e){
    var uploadImageStatus='Wait';
    var uploadInfoStatus='Wait';
    wx.showModal({
      title: '确认提交吗？',
      content: '如果找到校园卡主人，我们会将你的手机号提供给TA，方便与你联系哦！',
      confirmColor:'#ee9a00',
      cancelColor:'#000000',
      success:function(e){
        wx.uploadFile({
          url: '',
          filePath: this.data.toUpload,
          name: 'cardImg',
          success:function(){
            uploadImageStatus='Success'
          },
          fail:function(){
            uploadImageStatus='Fail'
          }
        })
        wx.request({
          url: '',
          header:'',
          data:{
            ID:e.detail.value.ID,
            name:e.detail.value.name,
            openid:getApp().globalData.openID,
            formid:e.detail.formid
          },
          success:function(res){
            uploadInfoStatus='Success';
            var status=res.data.status;//服务器返回  的找卡状态：有信息/没信息
          },
          fail:function(){
            uploadInfoStatus='Fail'
          }
        })
      }
    })
  }


})