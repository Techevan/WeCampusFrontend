// pages/login/login.js
import { $wuxDialog } from '../../dist/index'
// 判断电话号码用
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
var app = getApp();

var userInfo={};
var savedUserInfo={};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制Step1/2/3动画组
    animation1:false,
    currentStep:0,
    avatarTemp:"../../lib/icon/plus.png",
    avatarSpin:false
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
      animation2_1_5: false,
      avatarUrl:userInfo.avatarUrl,
      nickName:savedUserInfo.nickName,
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
  bindEditNickName:function(){
    var that = this;
    this.setData({
      animation2_1_1: false,
      animation2_1_2: false,
      animation2_1_3: false,
      animation2_1_4: false,
    })
    setTimeout(function () {
      that.setData({
        animation2_1_5: true,
      })
    }, 500)
  },
  /**
   * 绑定编辑昵称
   
  bindEditNickName:function(){
    var that = this;
    const alert = (content) => {
      $wuxDialog('#wux-dialog--alert').alert({
        resetOnClose: true,
        title: '提示',
        content: content,
      })
    }
  
    $wuxDialog().prompt({
      resetOnClose: true,
      title: '设置昵称',
      content: '你希望我怎么称呼你呢？',
      fieldtype: 'text',
      defaultText: '',
      placeholder: '请输入新昵称（不多于8字）',
      maxlength: 8,
      cancelText:'放弃',
      onConfirm(e, response) {        
        if(response.length===0){
          alert('诶？你貌似没有填写昵称诶……');
          return;
        }else{
          savedUserInfo.nickName = response;
          console.log(savedUserInfo)
          that.setData({
            animation2_1_1: false,
            animation2_1_2: false,
            animation2_1_3: false,
            animation2_1_4: false,
            animation2_1_5: false,
            nickName:response,
            avatarUrl: userInfo.avatarUrl
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
        }
      },
    })
    
  },
  */

  /**
   * 绑定保存头像
   */
  bindSaveAvatar:function(){
    savedUserInfo.avatarUrl=userInfo.avatarUrl;
    var that = this;
    wx.getLocation({
      success: function(res) {
        console.log(res)
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
          universityLogo: '/lib/icon/pku.png',
          animation2_2_1: false,
          animation2_2_2: false,
          animation2_2_3: false,
          animation2_2_4: false,
          animation2_2_5: false,
          animation2_2_6: false,
          animation2_2_7: false,
          animation2_2_8: false,
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
        that.setData({
          universityLogo: '/lib/icon/cry.png',
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
    var that=this;
    that.setData({
      animation2_2_1: false,
      animation2_2_2: false,
      animation2_2_3: false,
      animation2_2_4: false,
    })
    setTimeout(function () {
      that.setData({
        animation2_2_5: true,
      })
    }, 500)
    setTimeout(function () {
      that.setData({
        animation2_2_6: true,
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        animation2_2_7: true,
      })
    }, 1500)
    setTimeout(function () {
      that.setData({
        animation2_2_8: true,
      })
    }, 2000)

  },
  /**
   * 绑定保存大学
   */
  bindSaveUniversity:function(){
    var that=this;
    savedUserInfo.universityValue=userInfo.universityValue;
    this.setData({
      animation2_3_1: false,
      animation2_3_2: false,
      animation2_3_3: false,
      animation2_3_4: false,
      animation2_3_5: false,
      animation2_3_6: false,
      animation2_3_7: false,
      animation2_3_8: false,
      animation2_3_9: false,
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
    var universityList = [{ 'title':'北京大学', 'value':1 }, { 'title':'清华大学', 'value':2 }, { 'title':'上海交通大学', 'value':3 }, { 'title':'复旦大学', 'value':4 }]
    /*
    wx.request({
      url: 'http://www.we-campus.cn/WeCampus/api/get_school_list.php',
      header:app.globalData.requestHeader,
      success(res){
        console.log(res)
        var tempData = JSON.parse(res.data)
        for (let i = 0; i < tempData.length;i++){
          universityList.push({ 'title': tempData[i].school_name, 'value': tempData[i].school_id});
        }
      }
    })
    */
    var that=this;
    this.setData({
      animation2_3_1: false,
      animation2_3_2: false,
      animation2_3_3: false,
      animation2_3_4: false,
      animation2_3_5: false,
      animation2_3_6: false,
      animation2_3_7: false,
      animation2_3_8: false,
      universityList:universityList
    })
    setTimeout(function () {
      that.setData({
        animation2_3_9: true,
      })
    }, 500)
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
    var that = this;
    this.setData({
      animation3_1_1: false,
      animation3_1_2: false,
      animation3_1_3: false,
      animation3_1_4: false,
    })
    setTimeout(function () {
      that.setData({
        animation3_2_5: true,
      })
    }, 500)
    setTimeout(function () {
      that.setData({
        animation3_2_6: true,
      })
    }, 1000)
    setTimeout(function () {
      that.setData({
        animation3_2_7: true,
      })
    }, 1500)
    setTimeout(function () {
      that.setData({
        animation3_2_8: true,
      })
    }, 2000)
  },

  /**
   * 绑定完成
   */
  bindFinish:function(){
    console.log(savedUserInfo)
    wx.navigateBack({
      
    })
  },

  /**
   * 绑定前往个人中心
   */
  bindPersonalCenter:function(){
    this.setData({
      animation3_2_1: false,
      animation3_2_2: false,
      animation3_2_3: false,
      animation3_2_4: false,
      animation3_2_5: false,
      animation3_2_6: false,
      animation3_2_7: false,
      animation3_2_8: false,
      stepHidden:true,
    })
    wx.redirectTo({
      url: '../personalCenter/personalCenter',
    })
  },

  /**
   * 绑定头像上传
   */
  uploadAvatar:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        that.setData({
          avatarSpin:true
        })
        wx.uploadFile({
          url: app.globalData.domain + 'api/upload_user_avatar.php',
          filePath: tempFilePaths[0],
          name: 'avatar',
          formData: {
            'open_id':app.globalData.openID
          },
          header: app.globalData.requestHeader,
          success: function (res) {
            var tempData = JSON.parse(res.data)
            var imgURL = 'https://www.we-campus.cn/WeCampus/data/cache/'+tempData.temp_url;
            console.log(imgURL)
            that.setData({
              avatarSpin:false,
              avatarTemp:imgURL
            })
            userInfo.avatarUrl = imgURL;//这边还要加入一些逻辑进去
            console.error(userInfo)
          }
        })
      }
    })

  },

  /**
   * 绑定学校选择列表
   */
  bindUniversitySelector:function(e){
    console.error(e.detail);
    userInfo.universityValue = e.detail.value;
    this.setData({
      universitySelectorValue: e.detail.value
    })
  },

  /**
   * 绑定输入自定义昵称
   */
  bindNickNameInput:function(e){
    userInfo.nickName=e.detail.value
  }

})