let url = 'http://wthrcdn.etouch.cn';
function api(cityName){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: `${url}/${cityName}`,
            header: {
                'Content-Type': 'application/json'
            },
            success: resolve,
            fail:reject
        })
    })
}

module.exports = {
    getCityWeather:function(cityName){
        return api(cityName).then(res=>res)
    }
}