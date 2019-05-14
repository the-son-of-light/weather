// 通过百度地图获取天气
let bmap = require('../../libs/bmap-wx.js');
let utils = require('../../utils/util')
Page({
	data: {
		weatherData: '',
		currentCity:'',
		currentData:'',
		weather:'',
		temperature:'',
		nowTemperture:'',
		tempPic:'',
		pic:[],
		weatherDes:[],
		finger:[],
		fingerPic:[
		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557805211708&di=afbcd1fbf0287c41ab1890e0874b93fb&imgtype=0&src=http%3A%2F%2Fimages.669pic.com%2Felement_pic%2F7%2F71%2F47%2F83%2Fed0965ca72209504ba9edd066a683050.jpg',
		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557805174314&di=286b252a8845c098f1006d164f98da33&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F18%2F48%2F590501c8ad04f_610.jpg',
		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557805285343&di=d8c0b458fbc5dcb3b69a483659ad5d77&imgtype=0&src=http%3A%2F%2Fimages.669pic.com%2Felement_pic%2F97%2F56%2F56%2F97%2F55c21592fa173170157151d2cb252b1f.jpg',
		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557805325705&di=924564518b71744c63875aad0ecb8fa9&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F43%2F85%2F59399ce26e45f_610.jpg',
		'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557805360804&di=d8f70e629f09b15f7e205193ac24409d&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F40%2F04%2F59c2d4fb8593b_610.jpg'
		]
  },
  onLoad: function () {
    let TIME = utils.formatTime(new Date());
    let that = this;
    // 新建百度地图对象 
    let BMap = new bmap.BMapWX({
      ak: 'VilotzCpuWGy7XGOeU0P6iKbb2YotcPY'
    });
    let fail = function (data) {
      console.log(data)
    };
    let success = function (data) {
		let weatherData = data.currentWeather[0];
		let weatherDesc = data.originalData;
		let tempPic = weatherDesc.results[0];
		let tempImg = tempPic.weather_data;
		if(TIME > "18:00"){
			that.setData({
			tempPic:tempImg[0].nightPictureUrl
			})
		}else{
			that.setData({
			tempPic:tempImg[0].dayPictureUrl
			})
		}
		let fingerData =  tempPic.index;
		for(let i in that.data.fingerPic){
			fingerData[i].name = that.data.fingerPic[i]
		}
		
		for(let i = 0;i < tempImg.length;i ++){
			if(TIME > "18:00"){
				that.data.pic.push(tempImg[i].nightPictureUrl)
			}else{
				that.data.pic.push(tempImg[i].dayPictureUrl)
			}
		}
		for(let i in that.data.pic){
			tempImg[i].nowPic = that.data.pic[i]
			console.log(tempImg[i])
		}
		tempImg[0].date = tempImg[0].date.substring(0,3)
		that.setData({
			weatherData: weatherData,
			currentCity:weatherData.currentCity,
			currentData:weatherDesc.date,
			weather:weatherData.weatherDesc,
			temperature:weatherData.temperature,
			nowTemperture:weatherData.date.substring(14,17),
			finger:fingerData,
			weatherDes:tempImg
		});
		console.log(that.data.weatherDes)
		
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  }
})