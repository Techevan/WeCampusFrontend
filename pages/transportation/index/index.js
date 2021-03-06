// pages/transportation/index.js
import { $wuxBackdrop } from '../../../dist/index'

var info=new Array();
var message=[];
var stationList = [];
var stationListPointer=new Array();// StationList的指针，索引为JSON数组的索引，数值为Value值


var app=getApp();

const date=new Date();
var deptStationID=0;
var deptStationName='';
var year=date.getFullYear();
var month=date.getMonth()+1;
var day=date.getDate();
var hour=date.getHours();
var minute=date.getMinutes();

// 用于标记该页面是否已完成onLoad
var loadSuccessfully=false;


/**
 * 处理info这个JSON数组的函数
 */
function infoUpdate(that,infoTemp){
  for (let i = 0; i < message.length; i++) {
    if(message[i].position<infoTemp.length){
      infoTemp.splice(message[i].position, 0, message[i]);
      continue;
    }else{
      infoTemp.push(message[i])
    }
  }

  for(let i=0;i<infoTemp.length;i++){
    infoTemp[i].list_id = i;
    if(infoTemp[i].card!=1){
      continue;
    }
    var temp=stationListPointer.indexOf(infoTemp[i].boundForID)
    infoTemp[i].bound_for=stationList[temp].label;
  }
  info=infoTemp;
  var noInfo='';
  if(info.length==0){
    noInfo='当天没有车了，换个时间试试看吧'
  }
  that.setData({ info: infoTemp, noInfo:noInfo});
  wx.hideLoading();
}

/**请求特殊卡片列表 */
function requestMessage(thatT){
  wx.request({
    url: app.globalData.domain +'transportation/api/get_card_info.php',
    method:"GET",
    header:app.globalData.requestHeader,
    success:function(res){
      message=res.data;
    }
  })
}

/**
 * 请求stationList
 */
function requestStationList(that,GPSx,GPSy,callback){
  var thatT=that;
  wx.request({
    url: app.globalData.domain +'transportation/api/get_station_info.php',
    method:'GET',
    header:app.globalData.requestHeader,
    data:{
      latitude:GPSx,
      longitude:GPSy
    },
    success:function(res){
      stationList=res.data;
      deptStationID=stationList[0].value;
      deptStationName=stationList[0].label;
      // 为站点JSON数组创建索引指针
      for (let i = 0; i < stationList.length; i++) {
        stationListPointer.push(stationList[i].value);
      }
      thatT.setData({
        stationList:stationList,
        stationDisplay:stationList[0].label
      })
      callback(thatT,deptStationID,date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes());
    },
    fail:function(res)
    {
      console.log(res)
    }
  })
}
/**
 * 请求卡片列表
 */
function requestInfo(that,deptLocation,year,month,day,hour,minute){
  var thatT=that;
  year=year.toString();
  month=month.toString();
  day=day.toString();
  if(month.length!=2){
    month='0'+month;
  }
  if(day.length!=2){
    day='0'+day;
  }
  hour=hour.toString();
  minute=minute.toString();
  if(minute.length!=2){
    minute='0'+minute;
  }
  if(hour.length!=2){
    hour='0'+hour;
  }
  var cur_date=year+'-'+month+'-'+day;
  var cur_time=hour+':'+minute+':00';
  wx.request({
    url: app.globalData.domain + 'transportation/api/get_route_by_id.php',
    method:"GET",
    header: app.globalData.requestHeader,
    data:{
      station_id:deptLocation,
      cur_time:cur_time,
      cur_date:cur_date
    },
    success:function(res){
      info=res.data;
      infoUpdate(thatT, info);
    }
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    deptTime:"现在",
    year:date.getFullYear(),
    month:date.getMonth()+1,
    date:date.getDate(),
    hour:date.getHours(),
    minute:date.getMinutes(),
    stationDisplay:'加载中……',
    noInfo:'',
    buttons:[{
      label:'意见反馈',
      icon:'/lib/icon/feedback.png'
    },
    {
      label:'使用帮助',
      icon: '/lib/icon/help.png'
    },
    {
      label:'分享小程序',
      openType: 'share',
      icon: '/lib/icon/share.png',
    },
    {
      label:'我的微校',
      icon:'/lib/icon/my.png'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 浮动按钮蒙版
    this.$wuxBackdrop = $wuxBackdrop()

    wx.showLoading({
      title: '加载中',
    })
    var thatT=this;
    if (app.globalData.requestHeader.school_id && app.globalData.requestHeader.school_id != 0) {
      requestMessage(this);
      wx.getLocation({
        success: function (res) {
          // 请求站点列表，同时回调请求卡片列表
          requestStationList(thatT, res.latitude, res.longitude, requestInfo);
        }, fail: function (res) {
          // 请求站点列表，同时回调请求卡片列表
          requestStationList(thatT, 0, 0, requestInfo);
        }
      })
    } else {
      getApp().userInfoCallback = openID => {
        if (app.globalData.requestHeader.school_id != 0) {
          requestMessage(this);   
          wx.getLocation({
            success: function (res) {
              // 请求站点列表，同时回调请求卡片列表
              requestStationList(thatT, res.latitude, res.longitude, requestInfo);
            }, fail: function (res) {
              // 请求站点列表，同时回调请求卡片列表
              requestStationList(thatT, 0, 0, requestInfo);
            }
          }) 
        }
        loadSuccessfully=true;
      }
    }
    //requestMessage(this);

    
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3399ff',
    })
    wx.setNavigationBarTitle({
      title: ' ',
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
    if(loadSuccessfully==true&&getApp().globalData.requestHeader.school_id==0){
      wx.hideLoading()
      wx.showModal({
        title: '即将跳转登录页面……',
        content: '第一次使用微校需登录，点击下方跳转喏~',
        confirmText:'跳转登录',
        showCancel:false,
        confirmColor:'#3399ff',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../login/login',
            })
          }
        }

      })
    } else if (message.length==0 && getApp().globalData.requestHeader.school_id != 0){
      // 当用户未注册时，注册后首先进入该段，完成onLoad没做的操作
      console.log("THIS IS THE FIRST SHOW FUNCTION AFTER REGISTER")
      var thatT=this;
      requestMessage(this);
      wx.getLocation({
        success: function (res) {
          // 请求站点列表，同时回调请求卡片列表
          requestStationList(thatT, res.latitude, res.longitude, requestInfo);
        }, fail: function (res) {
          // 请求站点列表，同时回调请求卡片列表
          requestStationList(thatT, 0, 0, requestInfo);
        }
      })
    }



    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3399ff',
    })
    wx.setNavigationBarTitle({
      title: ' ',
    })
    var app=getApp()
    var dateT=new Date();
    if(app.globalData.transportationHide==true){
      app.globalData.transportationHide=false;
    }else if (year == this.data.year && month == this.data.month && day == this.data.date && hour == this.data.hour && minute == this.data.minute){
      // 和上一次相比什么都没有改变
      return;
    }
    console.log("刷新时间了")
    year = this.data.year;
    month = this.data.month;
    day = this.data.date;
    hour = this.data.hour;
    minute = this.data.minute;
    var tempDeptTime ='';
    if(year==dateT.getFullYear()&&month==dateT.getMonth()+1&&day==dateT.getDate()&&hour==dateT.getHours()&&minute==dateT.getMinutes()){
      tempDeptTime='现在';
    } else if (year == dateT.getFullYear() && month == dateT.getMonth() + 1 && day == dateT.getDate()) {
      tempDeptTime = '今天' + hour + '时' + minute + '分';
    } else {
      tempDeptTime = year + '年' + month + '月' + day + '日 ' + hour + '时' + minute + '分';
    }
    this.setData({
      deptTime: tempDeptTime
    })
    wx.showLoading({
      title: '加载中',
    })
    
    // 计数器用于控制第一次不请求onShow中获取卡片的函数
    requestInfo(this, deptStationID, year, month, day, hour, minute);
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
   * 跳转到选择时间页面
   */
  deptTime:function(){
    wx.navigateTo({
      url: '../timeSelector/timeSelector?year='+year+'&month='+month+'&day='+day+'&hour='+hour+'&minute='+minute,
    })
  },

  /**
   * 点击卡片所绑定的事件
   */
  scheduleDetail:function(e){
    var URLinfo = info[e.currentTarget.dataset.list];
    if (URLinfo.card==1)
    {
      var tempStr = '../scheduleDetail/scheduleDetail?';
      tempStr += ('scheduleTime=' + URLinfo.dept_time);
      tempStr += ('&routeName=' + URLinfo.name);//==
      tempStr += ('&deptDate=' + year + '年' + month + '月' + day + '日');
      tempStr += ('&routeID=' + URLinfo.routeID);//==
      tempStr += ('&boundFor=' + URLinfo.bound_for);
      tempStr += ('&deptStop=' + deptStationName);
      tempStr += ('&deptStopID=' + deptStationID);//==
      tempStr += ('&patternID=' + URLinfo.pattern_id);//==


      wx.navigateTo({
        url: tempStr
      })
    } else if (URLinfo.card == 2){
      // 这里插入点击消息卡片要进行的操作

    } else if (URLinfo.card == 3){
      wx.setClipboardData({
        data: URLinfo.copyboard,
      })
    }
    
  },

  /**
   * 绑定选择站点菜单时间
   */
  stationList:function(e){
    deptStationID = stationList[e.detail.value].value;
    deptStationName = stationList[e.detail.value].label;
    this.setData({
      stationDisplay: stationList[e.detail.value].label
    })
    requestInfo(this, deptStationID, year, month, day, hour, minute);

  },

  /**
   * 监听浮动按钮
   */
  onClick(e) {
    if (e.detail.index === 1) {
      wx.navigateTo({
        url: '../help/help',
      })
    }else if(e.detail.index===0){
      wx.navigateTo({
        url: '../feedback/feedback?index=true',
      })
    }else if(e.detail.index==3){
      wx.navigateTo({
        url: '../../personalCenter/personalCenter',
      })
    }
  },
  onChange(e){
    if (this.$wuxBackdrop.backdropHolds == 0 || typeof (this.$wuxBackdrop.backdropHolds)=='undefined'){
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#1E5A96',
      })
      this.$wuxBackdrop.retain();
    } else if (this.$wuxBackdrop.backdropHolds!=0){
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#3399ff',
      })
      this.$wuxBackdrop.release();
    }
  },

  /**
   * 监听分享事件
   */
  onShareAppMessage(e){
    return{
      title: '听说微校查出行很好用，快试试',
      imageUrl:'/lib/shareCard/basic.png'
    }
  }
})  