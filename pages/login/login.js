// pages/login/login.js

// 判断电话号码用
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)


var userInfo={};
var savedUserInfo={};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制Step1/2/3动画组
    animation1:false,
    currentStep:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录微校',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f0f0f0',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.currentStep==0){
      var that = this;
      setTimeout(function () {
        that.setData({ animation1_1: true })
      }, 500)
      setTimeout(function () {
        that.setData({ animation1_2: true })
      }, 1000)
      setTimeout(function () {
        that.setData({ animation1_3: true })
      }, 1500)
      setTimeout(function () {
        that.setData({ animation1_4: true })
      }, 2000)
    }
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
   * 监听获取用户信息按钮
   */
  bindGetUserInfo:function(e){
    var that=this;
    if (e.detail.errMsg !="getUserInfo:ok"){
      // 用户没有授权获取信息
    }else{
      // 用户授权了信息，下一步
      userInfo = JSON.parse(e.detail.rawData);
      this.setData({
        animation1_1:false,
        animation1_2:false,
        animation1_3:false,
        animation1_4: false,
        currentStep:1,
        nickName: userInfo.nickName,
        userInfo:userInfo
      })
      setTimeout(function(){
        that.setData({
          animation2_1_1:true,
        })
      },500)
      setTimeout(function () {
        that.setData({
          animation2_1_2: true,
        })
      }, 1000)
      setTimeout(function () {
        that.setData({
          animation2_1_3: true,
        })
      }, 1500)
      setTimeout(function () {
        that.setData({
          animation2_1_4: true,
        })
      }, 2000)

    }
  },

  /**
   * 绑定保存昵称
   */
  bindSaveNickName:function(){
    savedUserInfo.nickName=userInfo.nickName
    console.log(userInfo)
    var that=this;
    this.setData({
      animation2_1_1: false,
      animation2_1_2: false,
      animation2_1_3: false,
      animation2_1_4: false,
      avatarUrl:userInfo.avatarUrl
    })
    setTimeout(function () {
      that.setData({
        animation2_2_1: true,
      })
    }, 500)
    setTimeout(function () {
      that.setData({
        animation2_2_2: true,
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        animation2_2_3: true,
      })
    }, 1500)
    setTimeout(function () {
      that.setData({
        animation2_2_4: true,
      })
    }, 2000)
  },
  
  /**
   * 绑定编辑昵称
   */
  bindEditNickName:function(){

  },

  /**
   * 绑定保存头像
   */
  bindSaveAvatar:function(){
    savedUserInfo.avatarUrl=userInfo.avatarUrl;
    var that = this;
    this.setData({
      animation2_2_1: false,
      animation2_2_2: false,
      animation2_2_3: false,
      animation2_2_4: false,
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      success: function(res) {
        console.log(res)
        wx.hideLoading();
        /*
        wx.request({
          url: '',
          data:{
            latitude:res.latitude,
            longitude:res.longitude,
          },
          success:function(res){
            userInfo.universityLabel=res.label;
            userInfo.universityValue=res.value;
            that.setData({
              universityLabel:res.label
              universityLogo:res.logo
            })
            setTimeout(function () {
              that.setData({
                animation2_3_1: true,
              })
            }, 500)
            setTimeout(function () {
              that.setData({
                animation2_3_2: true,
              })
            }, 1000)
            setTimeout(function () {
              that.setData({
                animation2_3_3: true,
              })
            }, 1500)
            setTimeout(function () {
              that.setData({
                animation2_3_4: true,
              })
            }, 2000)
          },
          fail:function(res){
            // 网络请求失败应该作何反应呢？
          }
        })
        */
        // 等待补充接口后修改
        that.setData({
          universityLabel:'北京大学',
          universityLogo: '/lib/icon/pku.png'
        })
        setTimeout(function () {
          that.setData({
            animation2_3_1: true,
          })
        }, 500)
        setTimeout(function () {
          that.setData({
            animation2_3_2: true,
          })
        }, 1000)
        setTimeout(function () {
          that.setData({
            animation2_3_3: true,
          })
        }, 1500)
        setTimeout(function () {
          that.setData({
            animation2_3_4: true,
          })
        }, 2000)
      },
      fail:function(){
        wx.hideLoading();
        that.setData({
          universityLogo: '/lib/icon/cry.png'
        })
        setTimeout(function () {
          that.setData({
            animation2_3_5: true,
          })
        }, 500)
        setTimeout(function () {
          that.setData({
            animation2_3_6: true,
          })
        }, 1000)
        setTimeout(function () {
          that.setData({
            animation2_3_7: true,
          })
        }, 1500)
        setTimeout(function () {
          that.setData({
            animation2_3_8: true,
          })
        }, 2000)

      }
    })

    
  },

  /**
   * 绑定编辑头像
   */
  bindEditAvatar:function(){

  },
  /**
   * 绑定保存大学
   */
  bindSaveUniversity:function(){
    var that=this;
    savedUserInfo.universityLabel=userInfo.universityLabel;
    savedUserInfo.universityValue=userInfo.universityValue;
    this.setData({
      animation2_3_1: false,
      animation2_3_2: false,
      animation2_3_3: false,
      animation2_3_4: false,
      currentStep: 2,
    })
    setTimeout(function () {
      that.setData({
        animation3_1_1: true,
      })
    }, 500)
    setTimeout(function () {
      that.setData({
        animation3_1_2: true,
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        animation3_1_3: true,
      })
    }, 1500)
    setTimeout(function () {
      that.setData({
        animation3_1_4: true,
      })
    }, 2000)
  },
  
  /**
   * 绑定编辑大学
   */
  bindEditUniversity:function(){

  },
  
  /**
   * 绑定保存名字
   */
  bindSkipName:function(){
    var that=this;
    savedUserInfo.name='NULL';
    this.setData({
      animation2_4_1: false,
      animation2_4_2: false,
      animation2_4_3: false,
      animation2_4_4: false,
    })
    setTimeout(function () {
      that.setData({
        animation2_5_1: true,
      })
    }, 500)
    setTimeout(function () {
      that.setData({
        animation2_5_2: true,
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        animation2_5_3: true,
      })
    }, 1500)
    setTimeout(function () {
      that.setData({
        animation2_5_4: true,
      })
    }, 2000)
  },

  /**
   * 绑定编辑名字
   */
  bindEditName:function(){

  },

  /**
   * 绑定完成注册
   */
  bindNoThanks:function(){
    var that = this;
    savedUserInfo.universityLabel = userInfo.universityLabel;
    savedUserInfo.universityValue = userInfo.universityValue;
    this.setData({
      animation3_1_1: false,
      animation3_1_2: false,
      animation3_1_3: false,
      animation3_1_4: false,
    })
    setTimeout(function () {
      that.setData({
        animation3_2_1: true,
      })
    }, 500)
    setTimeout(function () {
      that.setData({
        animation3_2_2: true,
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        animation3_2_3: true,
      })
    }, 1500)
    setTimeout(function () {
      that.setData({
        animation3_2_4: true,
      })
    }, 2000)
  },
  
  /**
   * 绑定更多信息
   */
  bindYesPlease:function(){
    
  },

  /**
   * 绑定完成
   */
  bindFinish:function(){
    wx.navigateBack({
      
    })
  }
})