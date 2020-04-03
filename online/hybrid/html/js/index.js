/* eslint-disable require-jsdoc */
/**
 * [获取URL中的参数名及参数值的集合]
 * 示例URL:http://htmlJsTest/getrequest.html?uid=admin&rid=1&fid=2&name=小明
 * @param {[string]} urlStr [当该参数不为空的时候，则解析该url中的参数集合]
 * @return {[string]}       [参数集合]
 */


let rtc = null;
function init(){

	 var typeUrl = document.location.toString();
	 var arrUrl = typeUrl.split("=");
	 var typeOne = arrUrl[1];
	 
	 var res= layui.data('param').videoOrder;
	 console.log(res)
	 //缓存本次订单号
	 sessionStorage.setItem("orderNo",res.orderNo);
	 sessionStorage.setItem("orderType",res.orderType);
	if (rtc) return;
	rtc = new RtcClient({
	  userId:res.docNo,
	  roomId:res.roomId,
	  sdkAppId: res.sdkAppID,
	  userSig: res.docSig
	});
	rtc.join();
}

//离开房间
function leave(){
	console.log('leave');
	rtc.leave();
	rtc = null;
}

//切换摄像头
function switchDevice(cameraId){
	rtc.switchDevice(cameraId)
	// var cameraId=this.getCameraId();
	// alert("当前摄像头:"+cameraId)
	// $("#cameraId option").each(function(i){
	// 	if(this.value!=cameraId){
	// 		alert("切换的摄像头:"+this.value)
	// 		console.log('cameraId---------'+this.value);
			
	// 		// localStream.switchDevice('video', this.value).then(res => {
	// 		//   alert(res)
	// 		//   alert("切换成功")
			
	// 		// })
	// 	}
	// });
}


