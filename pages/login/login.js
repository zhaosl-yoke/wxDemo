var app = getApp();
var md5 = require('../../utils/md5.js');
Page({
    data:{
        userName:'',  
        userPassword:''
    },
    // logIn:function() {
    //     wx.navigateTo({
    //       url: '../music/music'
    //     })
    // },
    userNameInput:function(e){  
        this.setData({  
        userName: e.detail.value  
        })  
    },  
    userPasswordInput:function(e){  
        this.setData({  
        userPassword: e.detail.value  
        })  
        //console.log(e.detail.value)  
    },  
    logIn:function() {
        //console.log(md5.hex_md5(123))
    var that = this;
    var arr  = [1,5.2,3,4];
    alert(md5.sort(arr));
    wx.request({
        url: 'https://www.artapp.cn/ArtAppInst2/user/login', //仅为示例，并非真实的接口地址
        data: {
            mobile:this.data.userName,
            password: md5.hex_md5(this.data.userPassword),
            institutionCode:''
        },
        method:'POST',
        header: {"Content-Type":"application/x-www-form-urlencoded"},
        success: function(res) {
          //console.log(res.data); //打印获取数据
          wx.setStorageSync('token', res.data.token);
          if (res.data.success) {
              wx.navigateTo({
                url: '../music/music?token='+res.data.token
              })
          }
        }
    })
  }
})