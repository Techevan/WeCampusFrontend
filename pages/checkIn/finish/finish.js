// pages/checkIn/finish/finish.js
var historyArray=new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifFinish:false,
    numberOfPeople:0,
    regcode:0,
    password:0,
    taskName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      regcode:options.code,
      taskName:options.taskName,
      password:options.password,
      numberOfPeople:options.numberOfPeople,
    })
    console.log(options.finish)
    if(options.finish=='true')
    {
      var tempDate = new Date();
      var tempCurrent = tempDate.getFullYear() + "年" + tempDate.getMonth() + "月" + tempDate.getDate() + "日";
      var tempString = '../finish/finish?code=' + options.code + '&taskName=' + options.taskName + '&password=' + options.password + '&numberOfPeople' + options.numberOfPeople;
      var tempJson = { "taskName": options.taskName, "url": tempString, 'time': tempCurrent };
      var value = wx.getStorageSync('checkInHistory');
      if (value) {
        historyArray.splice(0, historyArray.length);
        historyArray = value.slice(0);
      } else {
        historyArray.splice(0, historyArray.length);
        wx.setStorageSync('checkInHistory', historyArray);
      }
      historyArray.push(tempJson);
      wx.setStorageSync('checkInHistory', historyArray);
      console.log(historyArray);
    }

    
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
    wx.setNavigationBarTitle({
      title: '导出签到结果',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#576b95',
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
  
  },

  scanQRcode:function(){
    var that=this;
    wx.scanCode({
      onlyFromCamera:true,
      success: (res) => {
        console.log(res.result)
        wx.request({
          url: 'https://www.isunnycampus.xyz/WeCampus/goeasy.php',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            uid: res.result,
            password:that.data.password,
            code:that.data.regcode
          },
          success:res=>{
            console.log(res.data);
          }
        })
      },
      fail:function(){
        wx.showToast({
          icon:'none',
          title: '相机调用失败，请使用密码方式下载表格 :(',
        })
      }
    })
  }
})