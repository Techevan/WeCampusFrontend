// pages/transportation/index.js
var info = [{ card:1,name: "汽车城短驳车", dept_time: '16:30', bound_for: "上海汽车城地铁站", list_id: 0 },
{card:1, name: "昌吉东路短驳车", dept_time: '10:42', bound_for: "昌吉东路地铁站", list_id: 1 },
{card:1, name: "北安跨线车", dept_time: '17:00', bound_for: "四平路校区", list_id: 2 },
{card:2, title: "国庆节短驳车时刻调整", content: "这是一条测试信息,这是一条测试信息,这是一条测试信息,这是一条测试信息", list_id: 3},
{card:1, name: "教师班车", dept_time: '16:40', bound_for: "四平路校区", list_id: 4 },
{card:1, name: "教师班车", dept_time: '16:40', bound_for: "四平路校区", list_id: 5 },
{ card: 3, title: "出行助手发福利啦！", content: "点击卡片后打开支付宝即可领取喏！点击卡片后打开支付宝即可领取喏！点击卡片后打开支付宝即可领取喏！点击卡片后打开支付宝即可领取喏！",copyboard:'支付宝红包字符', list_id: 6 },
{ card: 5, unitID:"adunit-3ec171e0c67d0e68",list_id: 7 }
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
    var URLinfo = info[e.currentTarget.dataset.list];
    if (URLinfo.card==1)
    {
      wx.navigateTo({
        url: '../scheduleDetail/scheduleDetail?scheduleTime=' + URLinfo.dept_time + '&routeName=' + URLinfo.name + '&deptDate=' + year + '年' + month + '月' + day + '日' + '&deptStop=' + '同济大学嘉定校区' + '&boundFor=' + URLinfo.bound_for,
      })
    } else if (URLinfo.card == 2){
      console.log('INFO')
    } else if (URLinfo.card == 3){
      wx.setClipboardData({
        data: URLinfo.copyboard,
      })
    }
    
  }
})  