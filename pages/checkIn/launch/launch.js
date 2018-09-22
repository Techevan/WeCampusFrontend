// pages/checkIn/launch/launch.js
var taskName="";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifLaunch:0,//ifLaunch:为0正在加载，为1未发布，为2已发布
    taskName:"",
    checkInCode:0, // 接口完成后需要删除
    numberOfPeople:0 // 当前已经签到的人数
  },

  


  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#576b95',
    })
    console.log(options)
    if (options.code!=0) {
      wx.setNavigationBarTitle({
        title: '正在签到',
      })
      this.setData({
        ifLaunch: 2,
        checkInCode: options.code,
        taskName:options.taskName
      })
    }else{
      this.setData({
        ifLaunch: 1,
      })
      wx.setNavigationBarTitle({
        title: '发起签到',
      })
    }
    wx.hideNavigationBarLoading();
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
    //这里需要通过接口判断该openID是否正在发起签到
    //检查当前多少人已经签到
    var that=this;
    var checkNumber = function checkNumber() {
      wx.request({
        url: 'https://www.isunnycampus.xyz/WeCampus/getRegNum.php',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          regcode: that.data.checkInCode,
        },
        success: res => {
          that.setData({
            numberOfPeople: res.data.num
          })
          console.log(res.data.num)
        }
      })
      setTimeout(checkNumber,5000)
    } 





    
    checkNumber();
    
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

  /*
   * 发起签到按钮操作
   */
  launchButton:function(){
    if(taskName=="")
    {
      wx.showModal({
        title: '发起签到失败',
        content: '签到标题不能为空！',
        showCancel:false
      })
      return;
    }
    wx.request({
      url: "https://www.isunnycampus.xyz/WeCampus/launchReg.php",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        openID:getApp().globalData.openID,
        activity:taskName,
        school:"HELLO",
        qualification:true,
        phone:true,
        latitude:123.1230,
        longitude:456.4560 //之后应在此处保证保留小数点后四位
      },
      success:res=>{
        console.log(res.data);
        if (res.data.ifSuccess==true)
        {
          this.setData({
            checkInCode:res.data.regcode
          })
        }
      },
      fail:function(){
        this.setData({
          checkInCode:"ERROR"
        })
      }
    })
    this.setData({
      ifLaunch:2,
      taskName:taskName
    })
  },
  /*
   * 输入框内容拷贝
   */
  taskInput:function(res){
    taskName=res.detail.value;
  },
  /*
   * 返回上一页
   */
  navigateToLastPage:function(){
    wx.navigateBack({
      
    })
  },
  finishLaunch:function(){
    if(this.data.checkInCode=='ERROR'||this.data.checkInCode==0)
    {
      wx.showModal({
        title: '签到完成失败',
        content: '请检查您的网络连接后重试！',
      })
    }else{
      wx.showLoading({
        title: '处理中',
      })//记得对模态弹窗进行处理
      var numberOfPeople=0;
      var password='';
      wx.request({
        url: 'https://www.isunnycampus.xyz/WeCampus/generCSVFile.php',
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          regcode: this.data.checkInCode
        },
        success: res => {
          wx.hideLoading();
          console.log(res.data)
          if(res.data.ifSuccess==false)
          {
            wx.showToast({
              title: '完成签到失败，请检查您的网络连接后再试一次',
              icon:'none'
            })
          }
          if (res.data.ifSuccess == true) {
            password=res.data.password;
            numberOfPeople=res.data.regNum;
            wx.redirectTo({
              url: '../finish/finish?code=' + this.data.checkInCode + '&taskName=' + this.data.taskName+'&password='+password+'&numberOfPeople'+numberOfPeople+'&finish=true'
            })
          }
        },
        fail:function(){
          wx.showToast({
            title: '完成签到失败，请检查您的网络连接后再试一次',
            icon: 'none'
          })
        }
      })
    }
    
  }

  
})

