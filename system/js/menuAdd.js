		$(function() {
			layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
				// var obj=localStorage.getItem("content");
				// var json=JSON.parse(obj);
				//getInter()
				function getInter(json){
					$.post({
						url: url + "/api/system/menu/getMenuPermission",
						method:"POST",
						data:{
								"menuSystem":$("#menuSystem").val()
						},
						success: function(res) {
							console.log(res)
							if(res.retCode == 0) {
								$("#parentId").empty();
								$("#parentId").append("<option value='0'>请选择上级菜单</option>")
								for (var i=0;i<res.data.length;i++){
									//$("#parentId").append("<option value='"+0+"'>"+请选择+"</option>")
									$("#parentId").append("<option value='"+res.data[i].id+"'>"+res.data[i].menuName+"</option>")

									if(json.o == res.data[i].menuName){
										$('#parentId').val(res.data[i].id);
									}
								}
							} else {
								layer.msg(res.retMsg, {
									time: 1000
								});
							}
						}
					});
				}

				//添加保存
				var layer = layui.layer;
				var laydate = layui.laydate;
				var laypage = layui.laypage;
				var form = layui.form;
				var obj=localStorage.getItem("content");
				var id="";
				$("#menuSystem").change(function () {
					var json = {
						o: 'aaa'
					}
					getInter(json)
				})
				console.log(obj)
				if(obj==null || obj==""){
					$("#parentId").append("<option value='0'>请选择上级菜单</option>")
				}else{
					var json=JSON.parse(obj);
					$("#id").val(json.id);
					$("#menuName").val(json.n);
					$("#menuSystem").val(json.menuSystem);
					$("#parentId").val(json.parentId);
					$("#request").val(json.request);
					$('#sortNo').val(json.sortNo);
					$('#icon').val(json.icon);
					id=json.id;
					getInter(json)
					//$("#parentId").val(json.o);
					//alert(json.o)
				}   

				$("#save").click(function(){
					$("#save").attr("disabled", 'disabled');
					setTimeout(function(){
						$("#save").attr("disabled", false);
					}, 2000);
					var data = {
						"id": id,
						"menuName": $("input[name='menuName']").val(),
						"menuSystem": $("select[name='menuSystem']").val(),
						"parentId":$("select[name='parentId']").val(),
						"request": $("input[name='request']").val(),   
						"sortNo": $("input[name='sortNo']").val(),
						"icon": $("input[name='icon']").val()  

					};
					if(data.id !== "" || data.id !== null){

					}
					if(data.menuName==""){
						layer.msg("菜单名不能为空", {
							time: 1000
						});
						return false;
					}
					// if(data.desc==""){
					//     layer.msg("描述不能为空", {
					//         time: 1000
					//     });
					//     return false;
					// }
					// if(data.interfacName==""){
					//     layer.msg("接口名不能为空", {
					//         time: 1000
					//     });
					//     return false;
					// }
					// if(data.requestType==""){
					//     layer.msg("请求方式不能为空", {
					//         time: 1000
					//     });
					//     return false;
					// }
					console.log(data)
					data = JSON.stringify(data);
					var loading = layer.load(2);
					$.post({
						url: url + "/api/system/menu/saveMenu",
						data: data,
						dataType: "json",
						contentType: 'application/json;charset=UTF-8',
						success: function(res) {
							console.log(res)
							if(res.retCode == 0) {
								layer.msg('操作成功', {
									time: 1000
								});
								layer.close(loading)
								setTimeout(function () {
									var index = parent.layer.getFrameIndex(window.name);
									parent.layer.close(index);
								}, 500);
							} else {
								layer.msg(res.retMsg, {
									time: 1000
								});
							}
							layer.close(loading)
						}
					});
				})
				
				


			})
		})
