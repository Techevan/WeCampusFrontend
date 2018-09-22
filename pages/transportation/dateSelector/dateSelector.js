// pages/transportation/index.js
var date = new Date();
var nowYear=date.getFullYear();
var nowMonth = date.getMonth() + 1;
var strDate = date.getDate();
var strDay=date.getDay();
var day_style = new Array();

var day_selected=strDate;
var month_selected=nowMonth;
var year_selected=nowYear;

/**
 * 设置日历模式：禁用当前日期前的日期
 */
function setDateStyle(){
  day_style.splice(0, day_style.length); 
  for (let i = 1; i < strDate; i++) {
    day_style.push({ month: 'current', day: i, color: '#cccccc', background: 'white' });
  }
}

/**
 * 初始化：设置当前日期
 */
setDateStyle();

/**
 * 初始化：设置日历的起始月份
 */
if(nowMonth<10){
  var start_date=nowYear+'-0'+nowMonth;
}else{
  var start_date=nowYear+'-'+nowMonth;
}

if(nowMonth<9){
  var end_date = nowYear + '-0' + (nowMonth+1);
}else if(nowMonth==12){
  var end_date=(nowYear+1)+'-01';
}
else{
  var end_date = nowYear + '-' + (nowMonth + 1);
}

/**
 * 初始化：控制快捷按钮的出现
 */
var thisFriday = '';
var thisSaturday = '';

if (strDay - 5 > 0){
  thisFriday='display:none';
}
if (strDay - 6 > 0){
  thisSaturday='display:none';
}

/**
 * 函数：完成数据回传
 */
function directBack(){
  wx.redirectTo({
    url: '../timeSelector/timeSelector?year='+year_selected+'&month='+month_selected+'&day='+day_selected,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    day_style:day_style,
    start_date:start_date,
    end_date:end_date,
    next_festival: [{ name: '国庆节',date:'20181001'}],
    thisFriday:thisFriday,
    thisSaturday:thisSaturday,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择出行日期',
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
   * 日期插件监听
   */
  dayClick: function (event) {
    if(event.detail.month==nowMonth){
      if(event.detail.day<strDate){
        return;
      }
      setDateStyle();
    }else{
      day_style.splice(0, day_style.length); 
    }
    day_style.push({ month: "current", day: event.detail.day, color: 'white', background: '#3399ff' });
    day_selected=event.detail.day;
    month_selected=event.detail.month;
    year_selected=event.detail.year;
    this.setData({
      day_style:day_style
    })
    setTimeout(directBack, 100)
  },
  /**
   * 监听上个月按钮
   */
  prev: function (event) {
    if(event.detail.currentMonth==nowMonth){
      setDateStyle();
    }
    this.setData({
      day_style: day_style
    })
  }, 
  /**
   * 监听下个月按钮
   */
  next: function (event) {
    day_style.splice(0, day_style.length);
    this.setData({
      day_style:day_style
    })
  },
  today:function(event){
    day_selected = strDate;
    month_selected = nowMonth;
    year_selected = nowYear;
    directBack();
  },
  tomorrow:function(event){
    var dateTime=new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 1);
    dateTime = new Date(dateTime);
    day_selected = dateTime.getDate();
    month_selected = dateTime.getMonth()+1;
    year_selected = dateTime.getFullYear();
    directBack();
  },
  thisFriday:function(event){
    var dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 5 - strDay);
    dateTime = new Date(dateTime);
    day_selected = dateTime.getDate();
    month_selected = dateTime.getMonth()+1;
    year_selected = dateTime.getFullYear();
    directBack();
  },
  thisSaturday: function (event) {
    var dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 6 - strDay);
    dateTime = new Date(dateTime);
    day_selected = dateTime.getDate();
    month_selected = dateTime.getMonth()+1;
    year_selected = dateTime.getFullYear();
    directBack();
  },
  thisSunday: function (event) {
    var dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 7 - strDay);
    dateTime = new Date(dateTime);
    day_selected = dateTime.getDate();
    month_selected = dateTime.getMonth()+1;
    year_selected = dateTime.getFullYear();
    directBack();
  }

})