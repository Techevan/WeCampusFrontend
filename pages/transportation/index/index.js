// pages/transportation/index.js
/*
var info= [{ card: 1, name: "汽车城短驳车", dept_time: '16:30', boundForID: 1, routeID: 3 },
{ card: 1, name: "昌吉东路短驳车", dept_time: '16:40', boundForID: 2, routeID: 5 },
{ card: 1, name: "北安跨线车", dept_time: '17:00', boundForID: 3, routeID: 8 },
{ card: 2, title: "国庆节短驳车时刻调整", content: "这是一条测试信息,这是一条测试信息,这是一条测试信息,这是一条测试信息"},
{ card: 1, name: "教师班车", dept_time: '16:40', boundForID: 0, routeID: 1 },
{ card: 1, name: "教师班车", dept_time: '16:40', boundForID: 0, routeID: 2 },
{ card: 3, title: "出行助手发福利啦！", content: "点击卡片后打开支付宝即可领取喏！点击卡片后打开支付宝即可领取喏！点击卡片后打开支付宝即可领取喏！点击卡片后打开支付宝即可领取喏！", copyboard: '支付宝红包字符' },
{ card: 4, unitID: "adunit-3ec171e0c67d0e68" }];
*/
var info=new Array();
var message=[];
var stationList = [
    { value: 0, label: '同济大学嘉定校区' },
    { value: 1, label: '上海汽车城地铁站' },
    { value: 2, label: '昌吉东路地铁站' },
    { value: 3, label: '同济大学四平路校区' }
  ];
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

/**
 * 处理info这个JSON数组的函数
 */
function infoUpdate(that,infoTemp){
  for (let i = 0; i < message.length; i++) {
    console.error(message[i].position);
    if(message[i].position<infoTemp.length){
      infoTemp.splice(message[i].position, 0, message[i]);
      console.log()
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
  that.setData({ info: infoTemp });
}

/**请求特殊卡片列表 */
function requestMessage(){
  wx.request({
    url: 'https://dsn.apizza.net/mock/e4a3024c95b0abf39daaaaaa68af4970/message',
    method:"GET",
    success:function(res){
      console.log(res)
      message=res.data.info;
      console.log(message)
    }
  })
}

/**
 * 请求stationList
 */
function requestStationList(that,GPSx,GPSy,callback){
  var thatT=that;
  wx.request({
    url: app.globalData.domain+'GPS',
    method:'GET',
    data:{
      latitude:GPSx,
      longitude:GPSy
    },
    success:function(res){
      stationList=res.data;
      deptStationID=0;
      deptStationName=stationList[0].label;
      // 为站点JSON数组创建索引指针
      for (let i = 0; i < stationList.length; i++) {
        stationListPointer.push(stationList[i].value);
      }
      thatT.setData({
        stationList:stationList,
        stationDisplay:stationList[0].label
      })
      callback(thatT,0,date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes());
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
    url: app.globalData.domain + 'info',
    method:"GET",
    data:{
      station_id:deptLocation,
      cur_time:cur_time,
      cur_date:cur_date
    },
    success:function(res){
      info=res.data;
      // 当获取到info后
      infoUpdate(thatT,info);
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
    stationDisplay:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thatT=this;
    requestMessage();
    wx.getLocation({
      success: function(res) {
        // 请求站点列表，同时回调请求卡片列表
        requestStationList(thatT, res.latitude, res.longitude, requestInfo);
      },fail:function(res){
        // 请求站点列表，同时回调请求卡片列表
        requestStationList(thatT, 0, 0, requestInfo);
      }
    })
    
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
    if (year == this.data.year && month == this.data.month && day == this.data.date && hour == this.data.hour && minute == this.data.minute){
      // 和上一次相比什么都没有改变
      return;
    }

    year = this.data.year;
    month = this.data.month;
    day = this.data.date;
    hour = this.data.hour;
    minute = this.data.minute;
    var tempDeptTime ='';
    if(year==date.getFullYear()&&month==date.getMonth()+1&&day==date.getDate()&&hour==date.getHours()&&minute==date.getMinutes()){
      tempDeptTime='现在';
    } else if (year == date.getFullYear() && month == date.getMonth() + 1 && day == date.getDate()) {
      tempDeptTime = '今天' + hour + '时' + minute + '分';
    } else {
      tempDeptTime = year + '年' + month + '月' + day + '日 ' + hour + '时' + minute + '分';
    }
    this.setData({
      deptTime: tempDeptTime
    })
    // 计数器用于控制第一次不请求onShow中获取卡片的函数
    requestInfo(this, deptStationID, year, month, day, hour, minute);
    console.log('ONSHOW中函数请求')    
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
      url: '../timeSelector/timeSelector',
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
      tempStr += ('&routeName=' + URLinfo.name);
      tempStr += ('&deptDate=' + year + '年' + month + '月' + day + '日');
      tempStr += ('&routeID=' + URLinfo.routeID);
      tempStr += ('&boundFor=' + URLinfo.bound_for);
      tempStr += ('&deptStop=' + deptStationName);
      tempStr += ('&deptStopID=' + deptStationID);
      tempStr += ('&patternID=' + URLinfo.pattern_id);


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
    requestInfo(this, e.detail.value, year, month, day, hour, minute);

  }
})  