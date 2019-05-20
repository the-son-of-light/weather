// pages/city/city.js
// 引入城市列表项
let cityList = require('./json');
let touchEndy = 0;//页面增加y坐标属性定义
let rightHeight = 0;//索引条高度
let timer;
let that;

Page({

  /**
   * 页面的初始数据
   */
	data: {
		searchCtiy:'',
		searchValue:'',
		toView:'',//用来做定位联动
		cityList:[],
		searchNav:[]
	},

//   获取输入的城市
	getCity:function(e){
		let searchValue = e.detail.value;
		this.setData({
			searchValue:searchValue
		})
	},
	// 传输要查找的城市
  	chooseCity:function(){
		let cityName = this.data.searchValue;
		wx.reLaunch({
			url: '../index/index?cityName='+cityName,
		});
    	console.log(this.data.searchValue)
  	},
	//   获取城市的数据
	getCItyList(){
		let searchNav = this.data.searchNav
		for(let i in cityList.cityList){
			searchNav.push(cityList.cityList[i].title)
		}
		this.setData({
			cityList:cityList.cityList,
			searchNav:searchNav
		})
		console.log(this.data.cityList)
	},
	// 获取城市名称以及数据索引
	selectcity(e){
		let title = e.currentTarget.dataset.title;
		wx.showToast({
			title: 'title:'+title,
			icon: 'none'
		})
		console.log(e)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCItyList();
		// 获取索引条高度
		let query = wx.createSelectorQuery();//创建节点选择器
		query.select('#right').boundingClientRect();
		query.exec(function(res){
			console.log(res)
			// 取高度
			console.log("height:"+res[0].height);
			rightHeight = res[0].height;
		})
	},
	//右侧索引列表点击
	indexClick:function(e){
		let index = e.currentTarget.dataset.index
		console.log(index)
		this.setData({//定位到字母所在城市item
		toView: index
		})
		console.log(this.data.toView)
	},
	// 开始触摸事件
	touchStart:function(e){
		console.log("touchStart start");
		touchEndy = e.touches[0].pageY
		console.log("touchStart end");
	},
	touchMove(e){
		touchEndy = e.touches[0].pageY;
		let index = parseInt(touchEndy/rightHeight*21)//将索引条从上到下分为21份(共有21个因为字母做索引)、
		//当手指触摸的时候记下y坐标，然后用这个y坐标除以索引条的高度再乘以21，最后转成整数，这个就是我们手指触摸再数组中的下标。
		//具体公式为index=parseInt(touchy/height*21)
		let value = this.data.searchNav[index];
		console.log("touchMove value:"+value)
	},
	touchEnd:function(e){
		let index = parseInt(touchEndy/rightHeight*21);
		let value = this.data.searchNav[index];
		console.log("touchEnd value:"+value)
		this.setData({//定位到字母所在城市item
			toView: index
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