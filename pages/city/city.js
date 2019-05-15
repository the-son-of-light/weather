// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	searchCtiy:'',
	searchValue:'',
	hotCity:['北京','上海','广州','深圳','天津','杭州','东莞','宁波','西安','成都','重庆','南京','苏州','武汉','厦门','福州','昆明','沈阳','长春',
			'大连','济南','青岛','郑州','兰州','太原','合肥','哈尔滨','长沙','石家庄','南昌','珠海','香港','澳门','台北']
  },

//   获取输入的城市
	getCity:function(e){
		let searchValue = e.detail.value;
		let chinese =/^[\u4e00-\u9fa5]+$/;
		if(!chinese.test(searchValue) && searchValue != ''){
			wx.showModal({
				title: '提示',
				content: '请输入汉字！',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定')
					}else{
					   console.log('用户点击取消')
					}
				}
			})
			this.setData({
				searchValue:''
      		})
		}else{
			this.setData({
				searchValue:searchValue
			})
		}
	},
  chooseCity:function(){
    let cityName = this.data.searchValue;
    getApp().globalData.showDialog  = cityName;
		wx.switchTab({
      url: '../index/index',
      success: function(e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
       		page.onLoad();
      	}
	})
		console.log(getApp().globalData.showDialog)
    console.log(this.data.searchValue)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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