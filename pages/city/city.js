// pages/city/city.js
// 引入城市列表项
let cityList = require('./json');

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
	getCity(e){
        let searchValue = e.detail.value;
		this.setData({
			searchValue:searchValue
        })
        let searchContent = this.data.searchNav;
        for(let i in searchContent){
            if(searchValue.toUpperCase() == searchContent[i]){
                this.setData({
                    toView:`city${i}`
                })
            }    
        }
	},
	// 传输要查找的城市
  	chooseCity(){
		let cityName = this.data.searchValue;
		if(cityName == ''){
			wx.showModal({
				title:"提示信息",
				content:"输入的城市不能为空",
				showCancel:false,
				success: function() {
					console.log("用户点击了确定按钮");
				}
			})
			return ;
		}
		let cityList = this.data.cityList;
		let variable = 0;
		for(let i = 0;i < cityList.length;i ++){
			if(cityList[i].lists.includes(cityName)){
				variable = true;
			}
		}
		if(variable == true){
			wx.reLaunch({
				url: '../index/index?cityName='+cityName
			});
		}else{
			console.log(cityName)
			wx.showModal({
				title:"提示信息",
				content:"无匹配城市",
				showCancel:false,
				success: function() {
					console.log("用户点击了确定按钮");
				}
			})			
		}
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
		// console.log(this.data.cityList)
	},
	// 获取城市名称以及数据索引
	selectcity(e){
		let title = e.currentTarget.dataset.title;
		wx.showToast({
			title: 'title:'+title,
			icon: 'none'
		})
		console.log(this.data.cityList)
	},
	// 点击城市在输入框获取点击的城市名称
	getCityValue(e){
		let cityValue = e.currentTarget.dataset.city;
		this.setData({
			searchValue:cityValue
        })
        wx.reLaunch({
            url: '../index/index?cityName='+cityValue
        });
        console.log(cityValue)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCItyList();
	},
	// 点击英文字母进行跳转到相应位置
	cityScroll(e){
		let index = e.currentTarget.dataset.index;
		this.setData({
			toView:`city${index}`
		})
		console.log(index)
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