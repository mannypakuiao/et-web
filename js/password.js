$(function() {
	layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
		var layer = layui.layer;
		var userId = sessionStorage.getItem("userId");
		var roleId=sessionStorage.getItem("roleId");
		var userName=sessionStorage.getItem("userName");
		var authority=sessionStorage.getItem("authority");
		$("#change").click(function() {
			if(userId==null||userId==""){
				return false;
			}
            var passwordok = $("input[name='passwordok']").val()
			var newpassword = $("input[name='newpassword']").val()
			if(newpassword==""||newpassword==null){
                layer.msg('密码不能为空', {
                    time: 1000
                });
                return false
			}
			if(passwordok === newpassword){
				var data = {
					"id": userId,
					"password": $("input[name='passwordok']").val(),
					"roleId":roleId,
					"userName":userName,
					"authority":authority
				};
				data = JSON.stringify(data);
				$.post({
					url: url + "/api/admin/base/updateAccount",
					dataType: "json",
					data: data,
					contentType: 'application/json;charset=UTF-8',
					success: function(res) {
						if(res.retCode == 0) {
							layer.msg('修改成功', {
								time: 1000
							});
							setTimeout(
							function(){
							window.parent.location= 'login.html'
							sessionStorage.clear();
							}, 1000);
						} else {
							layer.msg(res.msg, {
								time: 1000
							});
						}
					}
				});
			}else{
				layer.msg('两次输入密码不一致', {
					time: 1000
				});
			}
			
		})

	});
});