// pages/transportation/scheduleDetail/scheduleDetail.js
/**
 * 初始变量：
 */
var app=getApp();
var scheduleTime='';
var routeName='';
var routeID='';
var deptDate='';
var deptStop='';
var deptStopID='';
var patternID='';
var boundFor='';
var positionInfo='';
var GPSx='';
var GPSy='';
var routeStop=['安亭地铁站','曹安公路安谐路','同济大学嘉定校区','曹杨路中山北二路','同济大学四平路校区'];
var warning='';
// 存放今天当前线路的所有车次
var todaySchedule=new Array();

/**
 * 判断乘车提醒是否已经设置
 */
function alertStorage(deptDateTemp, scheduleTimeTemp, routeNameTemp, boundForTemp, curDateStrTemp, nextDateStrTemp) {
  var storageTemp = wx.getStorageSync('alert');
  if(storageTemp==''){
    return true;
  }
  for(let i=0,j=0,length=storageTemp.length;j<length;j++){
    if (storageTemp[i].deptDate == deptDateTemp && storageTemp[i].scheduleTime == scheduleTimeTemp && storageTemp[i].routeName == routeNameTemp && storageTemp[i].boundFor == boundForTemp){
      return false;
    }else if(storageTemp[i].deptDate!=curDateStrTemp&&storageTemp[i].deptDate!=nextDateStrTemp){
      storageTemp.splice(i, 1);
      continue;
    }else{
      i++;
    }
  }
  wx.setStorageSync('alert', storageTemp);
  return true;
}

/**
 * 判断是否是当天和下一天：用于设置乘车提醒
 */

function alertDisabled(deptDateTemp, scheduleTimeTemp, routeNameTemp,boundForTemp,that){
  var curDate = new Date();
  var nextDate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000);
  var curDateStr = curDate.getFullYear() + '年' + (curDate.getMonth() + 1)+'月'+curDate.getDate()+'日';
  var nextDateStr = nextDate.getFullYear() + '年' + (nextDate.getMonth() + 1) + '月' + nextDate.getDate() + '日';
  var strTemp = scheduleTimeTemp.split(':');
  var afterCurrentTime = (curDate.getHours() < parseInt(strTemp[0])) || ((curDate.getHours() == parseInt(strTemp[0])) && (curDate.getMinutes() < parseInt(strTemp[1])));

  if (!((deptDateTemp == curDateStr && afterCurrentTime) || deptDateTemp == nextDateStr)){
    // 不允许设置乘车提醒
    that.setData({
      alertDisabled: true,
      alertInfo: '无法设置乘车提醒，仅可设置当日之后车次及次日车次',
      alertClass: 'alert-disabled'
    })
    return;
  }else{
    var storage = alertStorage(deptDateTemp, scheduleTimeTemp, routeNameTemp, boundForTemp, curDateStr, nextDateStr);
    if (storage == false) {
      // 已经设置乘车提醒
      that.setData({
        alertDisabled: true,
        alertInfo: "已设置乘车提醒，开车前微信提醒您",
        alertClass: 'alert-disabled'
      })
      return;
    }
    // 允许设置乘车提醒
    that.setData({
      alertDisabled: false,
      alertInfo: "点击设置乘车提醒，开车前微信提醒您",
      alertClass: 'alert-active'
    })
  }
}



Page({
  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "img/location.png",
      id: 0,
      latitude: 31.286720,
      longitude: 121.212030,
      width: 30,
      height: 30,
    }],
    warningDisplay:true, // 是否显示黄色提示框,
    setAlertButton:'设置乘车提醒',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    scheduleTime = options.scheduleTime;
    routeName = options.routeName;
    deptDate = options.deptDate;
    deptStop = options.deptStop;
    deptStopID = options.deptStopID;
    boundFor = options.boundFor;
    routeID = options.routeID;
    deptStopID = options.deptStopID;
    patternID=options.patternID;
    // 从服务器二次获取详细信息
    var thatT=this;
    wx.request({
      url: app.globalData.domain +'transportation/api/get_route_detail.php',
      method:'GET',
      header:app.globalData.requestHeader,
      data:{
        station_id:deptStopID,
        route_id:routeID,
        pattern_id:patternID
      },
      success:function(res){
        GPSx = parseFloat(res.data.route_info[0].GPSx);
        GPSy = parseFloat(res.data.route_info[0].GPSy);
        positionInfo = res.data.route_info[0].location;
        warning = res.data.route_info[0].warning;
        todaySchedule=res.data.schedule;
        var warningDisplay=(warning=='');
        thatT.setData({
          GPSx:GPSx,
          GPSy:GPSy,
          positionInfo:positionInfo,
          warningDisplay:warningDisplay,
          warning:warning,
        })
      }
    })

    // 设置乘车提醒功能
    alertDisabled(deptDate,scheduleTime,routeName,boundFor,this);

    wx.setNavigationBarTitle({
      title: routeName,
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f0f0f0',
    })
    this.setData({
      scheduleTime:scheduleTime,
      routeName:routeName,
      deptDate:deptDate,
      deptStop:deptStop,
      boundFor:boundFor,
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
   * 设置乘车提醒模板消息
   */
  setAlert:function(e){
    var strTemp = deptDate.split('年');
    var tempY=strTemp[0];
    var strTemp2=strTemp[1].split('月');
    var tempM=strTemp2[0];
    var tempD=(strTemp2[1].split('日'))[0];
    if(tempM.length!=2){
      tempM='0'+tempM;
    }
    if(tempD.length!=2){
      tempD='0'+tempD;
    }
    var tempDeptTime=tempY+'-'+tempM+'-'+tempD+' '+scheduleTime;

    var storageTemp=wx.getStorageSync('alert');
    if(!storageTemp){
      var newStorage = new Array();
      newStorage.push({ deptDate: deptDate, scheduleTime: scheduleTime, routeName: routeName, boundFor: boundFor });
      wx.setStorageSync('alert', newStorage);
    }else{
      storageTemp.push({ deptDate: deptDate, scheduleTime: scheduleTime, routeName: routeName, boundFor: boundFor });
      wx.setStorageSync('alert', storageTemp);
    }

    var thatT=this;
    wx.request({
      url: app.globalData.domain +'transportation/api/send_template_message.php',
      header: app.globalData.requestHeader,
      method:'POST',
      data:{
        open_id:app.globalData.openID,
        form_id:e.detail.formId,
        time:tempDeptTime,
        keyword_1:routeName,
        keyword_2:deptStop,
        keyword_3:boundFor,
        keyword_5:scheduleTime,
        station_id: deptStopID,
        route_id: routeID,
        pattern_id: patternID
      },
      success:function(res){
        console.log(res)
        if(res.data.success==true){
          thatT.setData({
            alertDisabled: true,
            setAlertButton: '已设置乘车提醒',
            alertInfo: '乘车提醒已设置，将在开车前15分钟左右提醒您',
            alertClass: 'alert-disabled'
          })
        }
      }
    })    
  },

  /**
   * 反馈按钮监控
   */
  feedback:function(){
    wx.navigateTo({
      url: '../feedback/feedback?name=' + routeName + '&date=' + deptDate +'&time=' + scheduleTime+'&boundFor='+boundFor+'&stop='+deptStop,
    })
  },

  /**
   * 分享按钮监控
   */
  share:function(){
    wx.showToast({
      title: '分享功能即将上线，请先截图分享，谢谢',
      icon:'none'
    })
  },

  /**
   * 监控上一班车按钮
   */
  lastBus:function(){
    var index=todaySchedule.indexOf(scheduleTime);
    if(index<=0){
      wx.showToast({
        title: '已经是当日第一班车',
        icon:'none'
      })
      return;
    }else{
      scheduleTime=todaySchedule[index - 1];
      alertDisabled(deptDate, scheduleTime, routeName, boundFor, this);
      this.setData({
        scheduleTime:scheduleTime
      })
    }
  },

  /**
   * 监控下一班车按钮
   */
  nextBus:function(){
    var index=todaySchedule.indexOf(scheduleTime);
    if(index==todaySchedule.length-1){
      wx.showToast({
        title: '已经是当日末班车',
        icon:'none'
      })
      return;
    }else{
      scheduleTime=todaySchedule[index+1];
      alertDisabled(deptDate, scheduleTime, routeName, boundFor, this);
      this.setData({
        scheduleTime:scheduleTime
      })
    }
  }
})