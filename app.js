//app.js
App({
  onLaunch:function(){
    wx.login({
      success:res=>{
        console.log(res.code)
        wx.request({
          url: this.globalData.domain +'api/code_to_session.php',
          data:{
            code: res.code
          },
          success:function(e){
            getApp().globalData.openID=e.data.openid;
          },
          fail:function(e){
            console.log("OPENID获取失败");
            console.log(e);
          }
        })
      }
    });
    var temp = wx.getStorageSync('help');
    console.log(temp)
    if (temp==''){
      console.log('hh')
      wx.navigateTo({
        url: 'pages/transportation/help/help',
      })
    }
  },
  /*
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: 'https://www.isunnycampus.xyz/WeCampus/getOpenID.php',
            method: 'POST',
            data: {
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              this.globalData.openID = res.data.openid;
            }
          })
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setUserInfo();
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              this.setUserInfo();
            },
            fail:()=>{
              this.openSetting();
            }
          })
        }
      }
    })
  },
  setUserInfo() {
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  openSetting(){
    wx.showModal({
      title: '用户未授权',
      content: '微校需要获取您的头像和昵称,如需正常使用小程序，请点击确定并在授权管理中开启相应权限，重新进入小程序即可正常使用。',
      showCancel: false,
      success:res=> {
        if (res.confirm) {
          wx.openSetting({
            success:res=> {
              console.log("Open setting successfully!")
            },
            complete:()=>{
              wx.getSetting({
                success:res=>{
                  if (!res.authSetting['scope.userInfo']) {
                    this.openSetting();
                  }else{
                    this.setUserInfo();
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  
  userLogin()函数的传参，数据类型为json：
  userInfoData:{
    school:此处为学校名称 例如：tongji（string型变量）
    openID:通过app.globalData.openID赋值
    nickname:通过userInfo.nickName赋值
    avatar:通过userInfo.avatarUrl赋值
    sex:自定义获取方式
    name:自定义获取方式
    studentID:自定义获取方式
    phone:自定义获取方式
    qualification:待定
  }
  
  userLogin(userInfoData){
    wx.request({
      url: 'https://www.isunnycampus.xyz/WeCampus/userLogin.php',
      method: 'POST',
      data:userInfoData,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        app = getApp();
        app.globalData.privacy.name = userInfoData.name;
        app.globalData.privacy.phone = userInfoData.phone;
        app.globalData.privacy.studentID = userInfoData.studentID;
        console.log("Updated the global variables(privacy)!");
      }
    })
  },
  */
  globalData: {
    domain:'https://wecampus.techevan.wang/WeCampus/',
    userInfo: null,
    openID:null,
    school:null,
    qualification:false,
    transportationHide:false,
    privacy:{
      name:null,
      phone:null,
      studentID:null
    },
    requestHeader:{
      "school_id":1,
      "Content-Type":"application/x-www-form-urlencoded"
    }

  },
  onHide:function(){
    getApp().globalData.transportationHide=true;
  }
})