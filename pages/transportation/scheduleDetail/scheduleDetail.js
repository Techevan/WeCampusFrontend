// pages/transportation/scheduleDetail/scheduleDetail.js
/**
 * 初始变量：
 */
var scheduleTime='';
var routeName='';
var deptDate='';
var deptStop='';
var boundFor='';
var positionInfo='';
var GPSx='';
var GPSy='';
var routeStop=['安亭地铁站','曹安公路安谐路','同济大学嘉定校区','曹杨路中山北二路','同济大学四平路校区'];


/**
 * 判断乘车提醒是否已经设置
 */
function alertStorage(deptDateTemp, scheduleTimeTemp, routeNameTemp, boundForTemp, curDateStrTemp, nextDateStrTemp) {
  var storageTemp = wx.getStorageSync('alert');
  if(storageTemp==''){
    var newStorage=new Array();
    newStorage.push({ deptDate: deptDateTemp, scheduleTime: scheduleTimeTemp, routeName: routeNameTemp, boundFor: boundForTemp });
    wx.setStorageSync('alert', newStorage);
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
  storageTemp.push({deptDate: deptDateTemp, scheduleTime: scheduleTimeTemp, routeName: routeNameTemp, boundFor: boundForTemp});
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

  if ((deptDateTemp == curDateStr || deptDateTemp == nextDateStr) && afterCurrentTime){
    // 允许设置乘车提醒
    that.setData({
      alertDisabled:false,
      alertInfo:"点击设置乘车提醒，开车前微信提醒您",
      alertClass: 'alert-active'
    })
  }else{
    // 不允许设置乘车提醒
    that.setData({
      alertDisabled: true,
      alertInfo: '无法设置乘车提醒，仅可设置当日及次日车次',
      alertClass:'alert-disabled'
    })
    return;
  }
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
    warningDisplay:'none', // 是否显示黄色提示框,
    setAlertButton:'设置乘车提醒'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    scheduleTime = options.scheduleTime;
    routeName = options.routeName;
    deptDate = options.deptDate;
    deptStop = options.deptStop;
    boundFor = options.boundFor;
    positionInfo = options.positionInfo;
    GPSx = options.GPSx;
    GPSy = options.GPSy;
    console.log(deptDate)
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
  setAlert:function(){
    console.log('设置乘车提醒')
    // 在这里补充API信息

    this.setData({
      alertDisabled:true,
      setAlertButton:'已设置乘车提醒',
      alertInfo: '乘车提醒已设置，将在开车前15分钟左右提醒您',
      alertClass: 'alert-disabled'
    })
  }
})