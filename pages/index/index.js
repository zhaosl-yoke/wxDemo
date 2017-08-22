var app = getApp();
var md5 = require('../../utils/md5.js');
Page({
    data:{
       imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    url:"../../img/zan.png",
    array:[],
    token:'',
    count:0,
    flag: false,
    url_sel:'../../img/zan_sel.png'
    },
     selected: function(event) {
      let id = event.target.dataset.id
      this.setStatus(id)
    },
    setStatus (dishId) {
		let arrays = this.data.array;
		for (let item of arrays){
				if(item.id == dishId){
					 item.status = !item.status || false
				}
		}
		this.setData({
			array:this.data.array
		})
	},
    onLoad:function() {
    var that = this;
    var arr = [1, 5.2, 3, 4];
    md5.sort(arr);
    wx.request({
        url: 'https://www.artapp.cn/ArtAppInst2/user/login', //仅为示例，并非真实的接口地址
        data: {
            mobile:"13628668744",
            password: 'e10adc3949ba59abbe56e057f20f883e',
            institutionCode:''
        },
        method:'POST',
        header: {"Content-Type":"application/x-www-form-urlencoded"},
        success: function(res) {
          //console.log(res.data); //打印获取数据
          wx.setStorageSync('token', res.data.token);
          that.setData({
              token: res.data.token
          })
          wx.request({
            url: 'https://www.artapp.cn/ArtAppInst2/myVideo/selectMyVideoList', //仅为示例，并非真实的接口地址
            data: {
                pageSize:12,
                addressId:'',
                sort:'desc',
                token: res.data.token,
                pageNum:1
            },
            method:'POST',
            header: {"Content-Type":"application/x-www-form-urlencoded"},
            success: function(res) {
                //console.log(res.data.body.listMyVideos);
                that.setData({
                    array: res.data.body.listMyVideos
                })
            }
        })
     }
    });
  }
})