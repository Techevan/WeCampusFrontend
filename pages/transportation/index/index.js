// pages/transportation/index.js
var info = [{ name: "汽车城短驳车", dept_time: '16:30', bound_for: "上海汽车城地铁站", list_id: 0 },
{ name: "昌吉东路短驳车", dept_time: '16:40', bound_for: "昌吉东路地铁站", list_id: 1 },
{ name: "北安跨线车", dept_time: '17:00', bound_for: "四平路校区", list_id: 2 },
{ name: "教师班车", dept_time: '16:40', bound_for: "四平路校区", list_id: 3 },
{ name: "教师班车", dept_time: '16:40', bound_for: "四平路校区", list_id: 4 }
];
const date=new Date();
var year=0;
var month=0;
var day=0;
var hour=0;
var minute=0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: info,
    deptTime:"现在",
    year:date.getFullYear(),
    month:date.getMonth()+1,
    date:date.getDate(),
    hour:date.getHours(),
    minute:date.getMinutes(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log(this.data);
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
    console.log(e.currentTarget.dataset.list);
    var URLinfo=info[e.currentTarget.dataset.list];
    wx.navigateTo({
      url: '../scheduleDetail/scheduleDetail?scheduleTime='+URLinfo.dept_time+'&routeName='+URLinfo.name+'&deptDate='+'2018年9月24日'+'&deptStop='+'同济大学嘉定校区'+'&boundFor='+URLinfo.bound_for,
    })
  }
})  