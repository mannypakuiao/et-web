
function  request(api,data,callback){
	console.log(url+api)
	console.log(data)
	$.post({
	      url: url + api,
	      dataType: "json",
	      data: JSON.stringify(data),
	      contentType: 'application/json;charset=UTF-8',
	      success: function (res) {
			  console.log(res)
	          if (res.retCode == 0) {
				  callback(res)
	          } else {
	              callback(res)
	          }
	      }
	  });  
}
