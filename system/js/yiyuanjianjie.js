$(function() {
	layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
		var element = layui.element;
		var table = layui.table;
		var layer = layui.layer;
		var form = layui.form;
		var laydate = layui.laydate;
		var laypage = layui.laypage;
		var pageNo = 0;
		var totalPages = 0;
		var userId = sessionStorage.getItem("userId");
		laydate.render({
			elem: '#buyDay',
			range: true
		});
		laydate.render({
			elem: '#inDay',
			range: true
		});
		laydate.render({
			elem: '#outDay',
			range: true
		});
        find(1);
		$("#search").click(function() {
			find(1);
		});
		$("#last").click(function() {
			pageNo=$("#num").val();
			if(pageNo>0){
				pageNo--;
				find(pageNo);
			}else{
				layer.msg("已经是第一页", {
					time: 1000
				});
			}
		});
		$("#next").click(function() {
			pageNo=$("#num").val();
			if(pageNo >= totalPages - 1) {
				layer.msg("已经是最后一页", {
					time: 1000
				});
			}else{
				pageNo++;
				find(pageNo);
			}
		});
		var loading = layer.load(2);
		function find(){
			//查找医院列表
				$("#search").attr("disabled", 'disabled');
				setTimeout(function(){
					$("#search").attr("disabled", false);
				}, 2000);
				$("#page").show();
		}
				var data = {
					"page": {
						"pageNum": pageNo,
						"pageSize": 10
					},
				};
				data = JSON.stringify(data);
				$.post({
					url: url + "/api/admin/hospital/hospitalInfo",
					data: data,
					dataType: "json",
					contentType: 'application/json;charset=UTF-8',
					success: function(res) {
						if(res.retCode == 0) {
							totalPages = res.data.totalPages;
							$(".tableContent tbody").empty();
								var content= res.data;
								var tr= "<tr>" +
									"<td hidden='true' class='id'>" + content.id + "</td>" +
									"<td  class='hospitalName'>"+content.hospitalName+"</td>" +
									"<td  class='address'>"+content.address+ "</td>" +
									"<td  class='tel'>"+content.tel+ "</td>" +
									"<td  class='hospitalLevel'>"+content.hospitalLevel+ "</td>" +
									"<td  class='hospitalType'>"+content.hospitalType+ "</td>" +
									"<td  class='del'><p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
									"</tr>";
								$(".tableContent tbody").append(tr);
								$("#num").val(pageNo);
								layer.close(loading);
							//修改
							$(".btnMain").click(function(){
								sessionStorage.setItem("content", JSON.stringify(content));
								layer.open({
									type: 2,
									title: "修改医院信息",
									area: ['800px', '500px'],
									content: 'yiyuanjianjieAdd.html',
									end:function () {
										$("#search").trigger("click")
                                    }
								});

							})
							}
						else {
							layer.msg(res.retMsg, {
								time: 1000
							});
						}
					}
				});
	   //保存
		$("#save").click(function(){
			$("#save").attr("disabled", 'disabled');
			setTimeout(function(){
				$("#save").attr("disabled", false);
			}, 2000);
			var loading = layer.load(2);
			var data = {
				"id": $("input[name='id']").val(),
				"hospitalName": $("input[name='hospitalName']").val(),
				"address": $("input[name='address']").val(),
				"tel": $("input[name='tel']").val(),
				"hospitalLevel": $("input[name='hospitalLevel']").val(),
				"hospitalDesc": $("#content").html(),
				"hospitalType": $("input[name='hospitalType']").val()
			};

			data = JSON.stringify(data);

			$.post({
				url: url + "/api/admin/hospital/hospitalUpdate",
				data: data,
				dataType: "json",
				contentType: 'application/json;charset=UTF-8',
				success: function(res) {
					if(res.retCode == 0) {
						layer.msg('修改成功', {
							time: 1000
						});
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 500);
					} else {
						layer.msg(res.retMsg, {
							time: 1000
						});
					}
					layer.close(loading);
				}
			});
		})
		var obj=sessionStorage.getItem("content");

		if(obj==null || obj==""){
			return false;
		}else{
			var json=JSON.parse(obj);
			$("#id").val(json.id);
			$("#hospitalName").val(json.hospitalName);
			$("#address").val(json.address);
			$("#tel").val(json.tel);
			$("#hospitalLevel").val(json.hospitalLevel);
			$("#hospitalType").val(json.hospitalType);
            document.getElementById('content').innerHTML=json.hospitalDesc;
		}
	});
});

