// pages/checkIn/check/check.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderstyle:"",
    infoToShow:"请输入四位签到码",
    infoToShowLine2:"输入后无需点按即完成签到",
    disabled:false, //输入框是否可以输入内容
    cancelShow:false,//是否显示取消签到按钮
    retryShow:false, //是否显示重试按钮
    recheckShow:false,//是否显示再次签到按钮
    authShow:false, //是否显示去认证
    personInfoShow:false, //是否显示补全信息
    checkingIn: 0, //是否有正在进行的签到 0表示加载中，1是假，2是真，3是网络失败
    code:0,//签到码
    taskName:"",
    placeholder:"请输入四位签到码",
    longitude:0,
    latitude:0,
    launchcode:0,//发起签到的签到码
    // 动画测试内容：2018年3月25日
    animationBackgroundData:{},
    animationButtonData:{},
    animationHide:{}
  },

  // 动画测试：2018年3月25日
  animationTest: function animation() {
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease"
    })
    this.animation = animation;
    this.animation.bottom(0).translateY(10).step();
    this.setData({
      animationData: this.animation.export()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户GPS信息
    
    wx.getLocation({
      success: function (res) {
        this.data.latitude = res.latitude;
        this.data.longitude = res.longitude;
      },
    })
    
    /*var scene = decodeURIComponent(options.scene);
    if(scene){
      var jsonTemp={
        detail:{
          value:"7839",
          qrcode:true,
        }
      }
      this.codeInput(jsonTemp);
    }
    */
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
      title: '签到助手',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#576b95',
    })
    wx.showLoading({
      title: '登录中…',
      mask:true
    })
    var that = this;
    var ifOpenID = function () {
      console.log(getApp().globalData.openID)
      if (!getApp().globalData.openID) {
        setTimeout(ifOpenID, 500)
      } else {
        wx.request({
          url: "https://www.isunnycampus.xyz/WeCampus/regStatusCheck.php",//检查该openID是否有正在进行的签到
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            openID: getApp().globalData.openID
          },
          success: res => {
            if (res.data.ifCheckIn == false) {
              that.setData({
                checkingIn: 1,
                launchcode: 0,
                taskName:""
              })
            }
            if (res.data.ifCheckIn == true) {
              that.setData({
                checkingIn: 2,
                taskName: res.data.taskname,
                launchcode:res.data.code
              })
            console.log("第一次")
            console.log(res.data)
            }
          },
          fail: res => {
            that.setData({
              checkingIn: 3,
            })
          },
          complete:function(){
            wx.hideLoading();
          }
        })
        return;
      }
    }
    ifOpenID();
    
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
  /* 签到码输入框
   * 需求：输入为四位数字后，请求服务器检查签到码，并不允许再输入 
   */
  codeInput:function(e){
    if(e.detail.value.length==4)
    {
      wx.vibrateLong({
        //手机振动
      })
      if(e.detail.qrcode==true)
      {
        this.setData({
          placeholder:"通过扫描小程序码签到",
          placeholderstyle:"color:#576b95;font-weight:700"
        })
      }
      // 设置为输入四位后不允许再输入
      this.data.disabled=true;
      this.setData({
        disabled:this.data.disabled
      })
      wx.showLoading({
        title: '加载中',
      })
      // 触发服务器请求
      var authRequeset=wx.request({
        url: 'https://www.isunnycampus.xyz/WeCampus/Register.php',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        data:{
          regcode:e.detail.value,
          openID: getApp().globalData.openID,
          longitude:this.data.longitude,
          latitude:this.data.latitude
        },
        success:res=>{
          console.log(res.data)
          var infoToShow="";
          var infoToShowLine2="";
          if(res.data.ifSuccess==true)
          {
            //成功签到后的操作
            infoToShow="签到成功"
            infoToShowLine2 = res.data.taskName
            //成功签到后的弹出动画
            var animationBackground = wx.createAnimation({
              duration: 1500,
              timingFunction: "ease"
            })
            var animationButton=wx.createAnimation({
              duration: 1500,
              timingFunction: "ease"
            })
            this.animationBackground = animationBackground;
            this.animationBackground.bottom(0).height("50%").translateY(10).step();
            this.animationButton=animationButton;
            this.animationButton.bottom("-150rpx").translateY("-200%").step();
            this.setData({
              infoToShow: infoToShow,
              infoToShowLine2:infoToShowLine2,
              cancelShow: true,
              //成功签到后的弹出动画
              animationBackgroundData: this.animationBackground.export(),
              animationButtonData:this.animationButton.export()
            })  
            wx.hideLoading();
          }
          if(res.data.ifSuccess==false)
          {
            //签到失败后的操作
            if (res.data.failInfo==1001)
            {
              infoToShow="签到不存在或已失效"
              this.setData({
                infoToShow:infoToShow,
                infoToShowLine2:"",
                retryShow:true
              })
            }
            if(res.data.failInfo==1002)
            {
              infoToShow="当前签到要求用户认证"
              this.setData({
                infoToShow: infoToShow,
                infoToShowLine2: "",
                authShow: true
              })
            }
            if(res.data.failInfo==1003)
            {
              infoToShow="您的信息不全"
              this.setData({
                infoToShow: infoToShow,
                infoToShow2: "",
                personInfoShow: true
              })
            }
            if(res.data.failInfo==1004)
            {
              infoToShow="您已进行过签到"
              console.log(res.data)
              this.setData({
                infoToShow:infoToShow,
                infoToShowLine2: res.data.activity,
                cancelShow:true,
              })
              //成功签到后的弹出动画
              var animationBackground = wx.createAnimation({
                duration: 1500,
                timingFunction: "ease"
              })
              var animationButton = wx.createAnimation({
                duration: 1500,
                timingFunction: "ease"
              })
              this.animationBackground = animationBackground;
              this.animationBackground.bottom(0).height("50%").translateY(10).step();
              this.animationButton = animationButton;
              this.animationButton.bottom("-150rpx").translateY("-200%").step();
              this.setData({
                //成功签到后的弹出动画
                animationBackgroundData: this.animationBackground.export(),
                animationButtonData: this.animationButton.export()
              })  
            }
            wx.hideLoading();            
          }
          if(res.data.ifSuccess==true||res.data.failInfo==1004)
          {
            //头像图片获取
            wx.request({
              url: 'https://www.isunnycampus.xyz/WeCampus/getAvatarSample.php',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: "POST",
              data: {
                regcode: e.detail.value.toString(),
                num: 8
              },
              success: res => {
                console.log("测试：" + e.detail.value.toString())
                console.log(res.data)
                var imageArray = new Array();
                for (let i = 0; i < res.data.avatar.length; i++) {
                  imageArray.push(res.data.avatar[i].avatar);
                }
                for (let i = res.data.avatar.length; i < 8; i++) {
                  imageArray.push("");
                }

                this.setData({
                  image0: imageArray[0],
                  image1: imageArray[1],
                  image2: imageArray[2],
                  image3: imageArray[3],
                  image4: imageArray[4],
                  image5: imageArray[5],
                  image6: imageArray[6],
                  image7: imageArray[7],
                })
              }
            })
          }
          this.setData({
            code:e.detail.value.toString()
          })
        }
      })
    }
  },
  /*
   * 取消签到：签到成功后，用户通过取消签到删除签到信息
   */
  cancel:function(){
    wx.showModal({
      title: '取消签到',
      content: '确认要撤销这次签到吗？',
      cancelText:'不取消了',
      confirmColor: '#576b95',
      success:res=>{
        if (res.confirm)
        {
          wx.request({
            url: 'https://www.isunnycampus.xyz/WeCampus/cancelReg.php',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            data:{
              openID:getApp().globalData.openID,
              regcode:this.data.code
            },
            success:res=>
            {
              if(res.data.ifSuccess==false)
              {
                console.log(res.data)
                console.log(this.data.code)
                wx.showToast({
                  title: '取消签到失败\n可能发生了网络错误，或签到已关闭，请重试',
                  icon:'none'
                })
                return;
              }
              //成功取消签到后的弹出动画
              var animationBackgroundCancel = wx.createAnimation({
                duration: 1500,
                timingFunction: "ease"
              })
              var animationButtonCancel = wx.createAnimation({
                duration: 1500,
                timingFunction: "ease"
              })
              this.animationBackgroundCancel = animationBackgroundCancel;
              this.animationBackgroundCancel.translateY("110%").step();
              this.animationButtonCancel = animationButtonCancel;
              this.animationButtonCancel.translateY("200%").step();
              this.setData({
                //成功签到后的弹出动画
                animationBackgroundData: this.animationBackgroundCancel.export(),
                animationButtonData: this.animationButtonCancel.export()
              })  
              console.log("HHH"+res.data)
              // 模态弹窗
              this.setData({
                disabled: false,
                reset: "",
                infoToShow: "签到已取消",
                infoToShowLine2:"请查证后重新输入签到码",
                cancelShow: false,
                code:0
              })
            }
          })
          
        }
        else if(res.cancel)
        {
          //点击不取消
        } 
      }
    })
  },
  /*
   * 重试：签到失败，签到码不存在
   */
  retry: function () {
    this.setData({
      placeholder:"请输入四位签到码",
      placeholderstyle:"",
      disabled: false,
      reset: "",
      infoToShow: "请输入四位签到码",
      infoToShowLine2: "输入后无需点按即完成签到",
      retryShow: false,
      cancelShow: false,
      code:0
    })
  },
  /*
   * 重试：签到失败，签到码不存在
   */
  retryAnimation:function(){
    //成功重试后的弹出动画
    var animationBackgroundCancel = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease"
    })
    var animationButtonCancel = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease"
    })
    this.animationBackgroundCancel = animationBackgroundCancel;
    this.animationBackgroundCancel.translateY("110%").step();
    this.animationButtonCancel = animationButtonCancel;
    this.animationButtonCancel.translateY("200%").step();
    this.setData({
      //成功签到后的弹出动画
      animationBackgroundData: this.animationBackgroundCancel.export(),
      animationButtonData: this.animationButtonCancel.export()
    })  
    this.setData({
      disabled: false,
      reset: "",
      infoToShow:"请输入四位签到码",
      infoToShowLine2:"输入后无需点按即完成签到",
      retryShow:false,
      cancelShow:false,
      code: 0

    })
  },
  /*
   * 发起签到：发起签到按钮
   */
  launchCheck:function(){
    wx.navigateTo({
      url: '../launch/launch?code=0',
    })
  },
  /*
   * 检查是否有正在进行的签到后跳转 
   */
  checkingInPage:function(){
    wx.navigateTo({
      url: '../launch/launch?code='+this.data.launchcode.toString()+'&taskName='+this.data.taskName,
    })
    console.log('../launch/launch?code=' + this.data.launchcode.toString() + '&taskName=' + this.data.taskName)
  },

  history:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },

  
})

