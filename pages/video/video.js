var app = getApp();
Page({
    data:{
        catalog:'',
        filename:'',
        extension:'',
        flag:true,
        thumb:''
    },
    onLoad:function(options) {
   var Id = options.id;  
   //console.log(Id)  //打印获取数据
      var that = this;  
      wx.request({  
      url: 'https://www.artapp.cn/ArtAppInst2/myVideo/selectMyVideoInfo',  //服务器参数接收地址，  
      data: { 
       id:Id,
       token: options.token
      },  
      method:'POST',
      header: {"Content-Type":"application/x-www-form-urlencoded"},  
      success: function(res){  
        //console.log(res.data)        //打印获取数据  
        that.setData({  
            catalog: res.data.body.myVideoInfo.catalog,
            filename: res.data.body.myVideoInfo.filename,
            extension: res.data.body.myVideoInfo.extension,
            thumb: res.data.body.myVideoInfo.thumb
        })  
      } 
    })  

    this.videoContext = wx.createVideoContext('myVideo');
    console.log(this.videoContext) //打印获取数据
    
 }
// play:function() {
//   this.videoContext.play()
//   this.setdata()
// },

// setdata() {
//   this.setData({
//     flag:false
//   })
// }

 
})