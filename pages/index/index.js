let bmap = require('../../libs/bmap-wx');//引用百度地图小程序API
let wxMarkerData = [];	//定位成功回调对象
let api = require('../../utils/api');//引用公共接口
let util = require('../../utils/util')//引用获取时间
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currentCity:'',
		currentDate:'',
		nowTemperture:'',
		weather:'',
		low:'',
		high:'',
    weaImg:'yu',
		weatherDes:[],
        hours:[],
        weatherFinger:[],
		fingerPic:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558498306827&di=76d7eab41fd3165b21c3228894a44b26&imgtype=0&src=http%3A%2F%2Fwww.awing.cn%2Fuploadfiles%2Fpictures%2Fproduct%2F20170527093809_8922.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558498508344&di=48d131cad8e8da33324442d8164830a6&imgtype=0&src=http%3A%2F%2Fimgb.mumayi.com%2Fandroid%2Fimg_mumayi%2F2015%2F03%2F13%2F93%2F933011%2Ficon%2F933011_91684.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558498550791&di=b7d570597e924e6792433f2d8d7d967d&imgtype=0&src=http%3A%2F%2Fimg.aso.aizhan.com%2Ficon%2Fd2%2F37%2F17%2Fd237171a771587e9f3f8a323b3adde6c.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558498755787&di=aa451ab2ec32e4f5e056e32b82175296&imgtype=0&src=http%3A%2F%2Fwebtv1.ccsobey.com%2Fhdgbdst%2Fupload%2FImage%2Fmrtp%2F2017%2F06%2F07%2F1_46ac153c17e646b98b7c4e07c6f06e10.jpg',
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558498792789&di=0ae152d12b14a28ee5d7b02568da2af7&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F18%2F54%2F5905013815ee2_610.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558497244328&di=040fd79ef8daa2fc07e6bf81536e24ea&imgtype=0&src=http%3A%2F%2Fqstatic.zuimeia.com%2Fimg%2Ficons%2Fcld%2F2015120206592332856_350x350.jpeg'
		],
    weaObj:{
      yun:'http://image.wanguobaoshi.com/7f036835d83bc19297f09ad4b1b105d5.png',
      qing:'http://image.wanguobaoshi.com/45dd3f09e62d68f86c0800f0e2a30f52.png',
      yu:'http://image.wanguobaoshi.com/6a0afd3a61110134f571ff8c164e3b96.png',
      xue:'http://image.wanguobaoshi.com/3035d926c2441aded0d5f21d4d5a6d98.png'
    }
	},
  
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
			
		// 获取当前的地理位置
		let that = this;
		    // 新建bmap对象 
		let BMap = new bmap.BMapWX({ 
			ak: 'VilotzCpuWGy7XGOeU0P6iKbb2YotcPY'
		}); 
		let fail = function(data) { 
			console.log(data);
		}; 
		let success = function(data) { 
			//返回数据内，已经包含经纬度
			console.log(data);
			//使用wxMarkerData获取数据
			wxMarkerData = data.wxMarkerData;  
			// 获取要传的参数值
			let location = data.originalData.result.addressComponent.district.substring(0,2);
			console.log(location)
            options.cityName == undefined ? location:location = options.cityName;
            console.log(location)
			that.getCity(location);
		} 
		// 发起regeocoding检索请求 
		BMap.regeocoding({ 
			fail: fail, 
			success: success
		});     	



    
	},
	// 获取城市当前的天气情况
	getCity(location){
		let that = this;
		api.getCityWeather("api/?version=v1&city="+location).then((res)=>{
			console.log(res.data)
			let weather = res.data;
      console.log(weather.data[0])

      let weaImg = that.funWeaImg(weather.data[0].wea_img);

			// // 获取当前时间
			let TIME = util.formatTime(new Date());
			that.setData({
				currentDate:TIME,
				currentCity:weather.city,
				nowTemperture:weather.data[0].tem,
				weather:weather.data[0].wea,
				hours:weather.data[0].hours,
				low:weather.data[0].tem2,
				high:weather.data[0].tem1,
				weatherDes:res.data.data,
        weaImg
      })	

      for(let i in that.data.fingerPic){
          this.data.weatherDes[0].index[i].pic = that.data.fingerPic[i]
      }

      this.data.weatherDes[0].index[1].title = "运动指数"
      that.setData({
          weatherFinger:this.data.weatherDes[0].index
      })

      console.log(this.data.weatherFinger)
    })
    
	},
  funWeaImg(wea){
    
    let x = wea;
    switch (wea) {
      case 'lei':
        x = 'yu';
        break;
      case 'yin':
        x='yun'
        break;
    }

    return x;

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
  
	}
  })