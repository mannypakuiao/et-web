$(function () {
	layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function () {
		var element = layui.element;
		var table = layui.table;
		var layer = layui.layer;
		var form = layui.form;
		var laydate = layui.laydate;
		initPages();

		function initPages() {
			var data = {};
			$.post({
				url: url + "/api/league/getSpeciqlistInfo",
				data: data,
				dataType: "json",
				contentType: 'application/json;charset=UTF-8',
				success: function (res) {
					if (res.retCode == 0) {
						renderTable(res.data);
					} else {
						layer.msg(res.retMsg, {
							time: 1000
						});
					}
				}
			});
		}




		var renderTable = function (data) {
			layer.load(2);
			//展示已知数据
			table.render({
				elem: '#tbRecode',
				data: data,
				width: 1000,
				height: 'full-50',
				// ,initSort: {field: orderField,type: orderBy}
				cols: [[ //标题栏
					{ field: 'hospitalName', title: '医院名称', midwidth: 200, align: 'center' }
					, { field: 'tel', title: '电话', midwidth: 200, align: 'center' }
					, { field: 'address', title: '地址', minWidth: 200, align: 'center' }
					, { align: 'center', title: '操作 <a id="add" title="添加" style="border: 1px;"><i class="layui-icon layui-icon-add-1" style="font-size: 20px; margin-left: 20%; "></i></a>', minWidth: 200, toolbar: '#tbRecode-operate' }
				]]
				, even: true
				, page: false
				, limit: 99999
				, done: function () {
					layer.closeAll('loading');
					thisObj = this;
				}
			});
			$("#add").click(function () {
				$("#hospitalName").val('');
				$("#address").val('');
				$("#tel").val('');
				layer.open({
					type: 1,
					title: "添加医院信息",
					area: ['400px', '300px'],
					content: $("#addHospital"),
					btn: ['确定', '关闭'],
					yes: function (index, layero) {

						var hospitalName = $("#hospitalName").val();
						var address = $("#address").val();
						var tel = $("#tel").val();
						//验证条件
						console.log(data);
						if (hospitalName == null || hospitalName == '') {
							layer.msg("医院名称不能为空!", {
								time: 3000
							});
							return false;
						}
						//提交数据

						var data = {
							hospitalName: '',
							address: '',
							tel: ''
						}
						data.hospitalName = $('#hospitalName').val();
						data.address = $('#address').val();
						data.tel = $('#tel').val();
						data = JSON.stringify(data);
						console.log(data);

						$.post({
							url: url + "/api/league/saveDept",
							data: data,
							dataType: "json",
							contentType: 'application/json;charset=UTF-8',
							success: function (res) {
								if (res.retCode == 0) {
									initPages();
									layer.msg("添加成功!", {
										time: 1000
									});
									layer.close(index);
								} else {
									layer.msg(res.retMsg, {
										time: 1000
									});
								}
							}
						});


					}
				});
			})
			//监听工具条
			table.on('tool(tbRecode)', function (obj) {
				var data = obj.data;
				if (obj.event === 'del') {
					layer.confirm('确定删除[' + data.hospitalName + "]?删除后无法还原.", { btn: ['确定', '取消'], title: "提示" }, function (index) {
						var dataid = {
							id: data.id
						}
						$.post({
							url: url + "/api/league/delDept/" + data.id,
							data: data,
							dataType: "json",
							contentType: 'application/json;charset=UTF-8',
							success: function (res) {
								console.log(res)
								if (res.retCode == 0) {
									layer.close(index);
									layer.msg("删除记录成功.  ", {
										time: 1000
									});
									initPages(res.data)
								} else {
									layer.msg(res.retMsg, {
										time: 1000
									});
								}
							}
						});
					});
				}
				if (obj.event === 'eidit') {
					$("#hospitalName").val(data.hospitalName);
					$("#address").val(data.address);
					$("#tel").val(data.tel);
					layer.open({
						type: 1,
						title: "修改医院信息",
						area: ['400px', '300px'],
						content: $("#addHospital"),
						btn: ['确定', '关闭'],
						yes: function (index, layero) {

							var hospitalName = $("#hospitalName").val();
							var address = $("#address").val();
							var tel = $("#tel").val();
							//验证条件
							if (hospitalName == null || hospitalName == '') {
								layer.msg("医院名称不能为空!", {
									time: 3000
								});
								return false;
							}
							//提交数据
							data.hospitalName = hospitalName;
							data.address = address;
							data.tel = tel;
							data = JSON.stringify(data);
							console.log(data);

							$.post({
								url: url + "/api/league/eidSpeciqlistInfo",
								data: data,
								dataType: "json",
								contentType: 'application/json;charset=UTF-8',
								success: function (res) {
									if (res.retCode == 0) {
										initPages();
										layer.msg("更新成功!", {
											time: 1000
										});
										layer.close(index);
									} else {
										layer.msg(res.retMsg, {
											time: 1000
										});
									}
								}
							});


						}
					});
				}
			});
		}
	})
})