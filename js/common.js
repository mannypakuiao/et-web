
// var url = "http://218.206.208.138:10002";
// var url = "http://marksix.vipgz2.idcfengye.com";
var url = "https://kfetyymini.longtengzhihui.com";
//时间戳格式化年月日时分秒
function formatDateTime(inputTime) {
	if(inputTime == "" || inputTime == null) {
		return "";
	} else {
		var date = new Date(inputTime);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	}
};
//时间戳格式化年月日
function formatDate(inputTime) {
	if(inputTime == "" || inputTime == null) {
		return "";
	} else {
		var date = new Date(inputTime);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		return y + '-' + m + '-' + d;
	}
};

/**
 * inputTime : 字符串时间，格式为 yyyy-MM-dd HH:mm:ss
 * num : 秒
 * return : 返回 下一秒时间 ，格式跟传入的相同
 */
function dateAdd(inputTime,num){
    var date = new Date(inputTime);
    date.setTime(date.getTime()+num*1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

function $ajax(api, postdata,shade,sucessFunc, failFunc, endFunc) {
	var loading;
    if (shade) {
        loading = layer.load(2);
    }
    $.ajax({
        type: 'POST',
        url: url + api,
        data: JSON.stringify(postdata),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
            if (result.retCode == 0) {
                if (typeof sucessFunc === "function") {
                    sucessFunc(result);
                }
                if (typeof endFunc === "function") {
                    endFunc(result);
                }
            } else if (result.retCode == 206) {
                layer.msg(responseJson.retMsg, {
					time: 1000
                });
            } else {
                if (typeof failFunc === "function") {
                    failFunc(result);
                }
                if (typeof endFunc === "function") {
                    endFunc(result);
                }
            }
            if (shade)
                layer.close(loading);
        },
        error: function (result) {
            var responseJson = result.responseJSON;
            if (typeof responseJson != "undefined") {
                if (responseJson.retCode == 206
                    || responseJson.retCode == 401
                    || responseJson.retCode == 423
                    || responseJson.retCode == 497
                    || responseJson.retCode == 498
                    || responseJson.retCode == 412
                    || responseJson.retCode == 424) {
                    //424 用戶登錄失效
                    //206 維護時間
                    //424 用戶登錄失效
                } else if (responseJson.retCode == 499
                    || responseJson.retCode == 500) {
					layer.msg(responseJson.retMsg, {
						time: 1000
					});
                } else {
                    if (typeof failFunc === "function") {
                        failFunc(responseJson);
                    }
                }

                //请求失败时被调用的函数
                if (typeof endFunc === "function") {
                    endFunc(responseJson);
                }
            }
           if (shade)
               layer.close(loading);
        }
    });
}
