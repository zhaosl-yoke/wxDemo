//logs.js
var app = getApp();
Page({
  data: {
    name:'金boss',
    time:'2017-01-05 16:41',
    style:'海顿 吉普赛回族曲',
    num:0,
    comNum:0,
    flag:'',
    id:'',
    token:'',
    msg:'',
    imgList:[
    '../../img/name.jpg',
    '../../img/name.jpg',
    '../../img/name.jpg',
    '../../img/name.jpg'
  ],
  url:'../../img/zan1.png',
  url_sel:'../../img/zan_sel.png',
  comList:[
    // {
    //   "src":"../../img/name.jpg",
    //   "name":"斑马老师",
    //   "content":"很棒，加油!",
    //   "time":"14小时前"
    // },
    // {
    //   "src":"../../img/name.jpg",
    //   "name":"陈福星",
    //   "content":"很棒，加油!",
    //   "time":"16小时前"
    // },
    // {
    //   "src":"../../img/name.jpg",
    //   "name":"陈福星",
    //   "content":"很棒，加油!",
    //   "time":"16小时前"
    // },
    // {
    //   "src":"../../img/name.jpg",
    //   "name":"陈福星",
    //   "content":"很棒，加油!",
    //   "time":"16小时前"
    // }
  ]
  },
 selected:function() {
   this.setData({
     status: this.data.status?false:true
    })
 },
 change:function() {
   var that = this;
    that.setData({
      status1: this.data.status1?false:true
    })
 }, 
formatDate(now)   {     
    var   year=now.getFullYear();     
    var   month=now.getMonth()+1;     
    var   date=now.getDate();     
    var   hour=now.getHours();     
    var   minute=now.getMinutes();     
    var   second=now.getSeconds(); 
    if (month < 10) {
      month = '0' + month;
    }
    if (date < 10) {
      date = '0' + date;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
     if (minute < 10) {
      minute = '0' + minute;
    }
    return   year+"-"+month+"-"+date+"   "+hour+":"+minute;     
    },
 onLoad:function(options) {
   var that = this; 
   var Id = options.id; 
  //console.log(Id) //打印获取数据
   wx.getStorage({
     key: 'token',
     success: function(res){
       //console.log(res); //打印获取数据
       that.setData({
         token: res.data
       })
     }
    })
      wx.showToast({  
        title: '加载中',  
        icon: 'loading',  
        duration: 1000  
      }); 
      wx.request({  
        url: 'https://www.artapp.cn/ArtAppInst2/myVideo/selectMyVideoInfo',  //服务器参数接收地址，  
        data: { 
        id:Id,
        token:options.token
        },  
        method:'POST',
        header: {"Content-Type":"application/x-www-form-urlencoded"},  
        success: function(res){  
          //console.log(res.data.body.myVideoInfo)        //打印获取数据  
          var d = new Date(res.data.body.myVideoInfo.videoCreateTime);
          //console.log(that.formatDate(d)); //打印获取数据
          that.setData({  
              flag: res.data.body.myVideoInfo.thumb,
              id: res.data.body.myVideoInfo.id,
              time: that.formatDate(d),
              name: res.data.body.myVideoInfo.teacherName
          })  
        } 
    })   
 },
 msgInput:function(e){  
    this.setData({  
    msg: e.detail.value  
    })  
},  
 send:function() {
   if (this.data.msg) {
     var newarray = [{
                      'src':this.data.flag,
                      'name': this.data.name,
                      'content': this.data.msg,
                      'time': '刚刚'
                     }];
    this.setData({
      comList:this.data.comList.concat(newarray),
      comNum: this.data.comList.length + 1
    });
   }
 }
})
