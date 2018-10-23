// pages/transportation/timeSelector/timeSelector.js
const hours=[];
const minutes=[];
const seconds=[];
const currentDate=new Date();
/*
var year=currentDate.getFullYear();
var month=currentDate.getMonth()+1;
var date=currentDate.getDate();
*/
var hour=currentDate.getHours();
var minute=currentDate.getMinutes();
var second=currentDate.getSeconds();


for(let i=0;i<24;i++){
  if(i<10){
    i='0'+i;
  }
  hours.push(i);
}


for(let i=0;i<60;i++){
  if (i < 10) {
    i = '0' + i;
  }
  minutes.push(i);
  seconds.push(i);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hours:hours,
    minutes:minutes,
    seconds:seconds,
    value:[currentDate.getHours(),currentDate.getMinutes(),currentDate.getSeconds()],
    today:"submit_active",
    tomorrow:"submit",
    otherDate:"submit",
    otherDateTitle:"其他日期"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var curDate = new Date();
    var nextDate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000);
    var today_class='submit';
    var tomorrow_class='submit';
    var otherday_class='submit';
    var otherday_title='其他日期';

    var yearT = parseInt(options.year);
    var monthT = parseInt(options.month);
    var dayT=parseInt(options.day);
    var hourT=parseInt(options.hour);
    var minuteT=parseInt(options.minute);
    hour=hourT;
    minute=minuteT;

    if (yearT==curDate.getFullYear()&&monthT==(curDate.getMonth()+1)&&dayT==curDate.getDate()){
      today_class='submit_active';
    } else if (yearT == nextDate.getFullYear() && monthT == (nextDate.getMonth() + 1) && dayT == nextDate.getDate()){
      tomorrow_class='submit_active';
    } else{
      otherday_class='submit_active',
      otherday_title=yearT+'年'+monthT+'月'+dayT+'日'
    }
    this.setData({
      year:yearT,
      month:monthT,
      date:dayT,
      value:[hour,minute,second],
      today:today_class,
      tomorrow:tomorrow_class,
      otherDate:otherday_class,
      otherDateTitle:otherday_title
    })


    wx.setNavigationBarTitle({
      title: '选择出行时间',
    })
    /*
    year=options.year;
    month=options.month;
    date=options.day;
    console.log(year+month+date)
    
    if(year!=null&&month!=null&&date!=null){
      this.setData({
        otherDateTitle:year+"年"+month+"月"+date+"日",
        today: "submit",
        tomorrow: "submit",
        otherDate: "submit_active",
      })
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
   * 监听今天按钮
   */
  today:function(){
/*
    year=currentDate.getFullYear();
    month=currentDate.getMonth()+1;
    date=currentDate.getDate();
*/
    var dateTime=new Date();
    this.setData({
      today: "submit_active",
      tomorrow: "submit",
      otherDate: "submit",
      year:dateTime.getFullYear(),
      month:dateTime.getMonth()+1,
      date:dateTime.getDate()
    })
  },
  /**
   * 监听明天按钮
   */
  tomorrow:function(){
    var dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 1);
    dateTime = new Date(dateTime);

    this.setData({
      today: "submit",
      tomorrow: "submit_active",
      otherDate: "submit",
      year: dateTime.getFullYear(),
      month: dateTime.getMonth() + 1,
      date: dateTime.getDate()
    })
  },
  /**
   * 监听其他日期按钮
   */
  otherDate:function(){
    this.setData({
      today: "submit",
      tomorrow: "submit",
      otherDate: "submit_active",
    })
    wx.navigateTo({
      url: '../dateSelector/dateSelector',
    })
  },
  /**
   * 监听确定按钮
   */
  confirm:function(){
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    prevPage.setData({//直接给上移页面赋值
      year:this.data.year,
      month: this.data.month,
      date: this.data.date,
      hour:hour,
      minute:minute
    });
    wx.navigateBack({//返回
      delta: 1
    })
  },
  /**
   * 监听滑动动作
   */
  bindChange:function(e){
      hour = e.detail.value[0];
      minute = e.detail.value[1];
      second = e.detail.value[2];
  }
})