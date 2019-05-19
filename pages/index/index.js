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
		prompt:'',
		weatherDes:[]
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
			let location = data.originalData.result.addressComponent.district;
			options.cityName == undefined ? location:location = options.cityName;
			that.getCity(location);
		} 
		// 发起regeocoding检索请求 
		BMap.regeocoding({ 
			fail: fail, 
			success: success
		});     	
	},
	// 获取城市的天气情况
	getCity(location){
		let that = this;
		api.getCityWeather('weather_mini?city='+location).then((res)=>{
			let weather = res.data.data;
			// 获取当前时间
			let TIME = util.formatTime(new Date());
			that.setData({
				currentDate:TIME,
				currentCity:location,
				nowTemperture:weather.wendu,
				weather:weather.forecast[0].type,
				low:weather.forecast[0].low,
				high:weather.forecast[0].high,
				weatherDes:weather.forecast,
				prompt:weather.ganmao
			})
			for(let i in that.data.weatherDes){
				let subWeather = that.data.weatherDes[i].date.substring(3,6);
				let low = that.data.weatherDes[i].low.substring(3,6);
				let high = that.data.weatherDes[i].high.substring(3,6);
				let weathers = that.data.weatherDes[i];
				weathers.date=subWeather;
				weathers.low=low;
				weathers.high=high;
			}
			that.setData({
				weatherDes:weather.forecast
			})
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
  
	}
  })