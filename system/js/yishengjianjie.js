$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
		var form = layui.form;
		var table = layui.table;
        var userId = sessionStorage.getItem("userId");
        var pageNo=1;
        var pageSize=10;
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
        $("#search").click(function() {
            find(pageNo,pageSize);
        });
        $("#search").trigger("click");
        //分页
        function getPageList(totalSize,pageNo,pageSize){
            laypage.render({
                elem: 'page'
                ,curr:pageNo
                ,count:totalSize
                ,limit:pageSize
                ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                ,jump: function(obj,first){
                    //首次不执行
                    if(!first){
                        pageNo=obj.curr
                        pageSize=obj.limit;
                        find(pageNo,pageSize);
                    }
                }
            });
        }
		var deptNo = '';
        function find(pageNo,pageSize) {
            var loading = layer.load(2);
			//科室列表
			request('/api/admin/deptInfo/getQueryDepartment','',function(res){
				if(res.retCode == 0){
					$("#dept").empty();
					$("#dept").append("<option value=''>请选择科室</option>")
					for (var i=0;i<res.data.length;i++){
					    $("#dept").append("<option value='"+res.data[i].deptNo+"' "+(res.data[i].deptNo == deptNo?'selected':'')+">"+res.data[i].deptName+"</option>")
					}
					form.render('select')
				} else {
					layer.msg(res.retMsg, {
					    time: 1000
					});
				}
			})
			form.on('select(dept)', function(data){
			  console.log(data.elem); //得到select原始DOM对象
			  console.log(data.value); //得到被选中的值
			  console.log(data.othis); //得到美化后的DOM对象
			  deptNo = data.value
			}); 
			//医生列表
			var data = {
			    "pageNumber":pageNo,
			    "pageSize":pageSize,
			    "docName": $("#key").val(),
				"deptNo": deptNo
			};
			console.log(data)
			data = JSON.stringify(data);
            $.post({ 
                url: url + "/api/admin/doc/docList",
                data: data,
                dataType: "json", 
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
					console.log(res)
                    layer.close(loading);
                    if (res.retCode == 0) {
                        $(".tableContent tbody").empty();
                        if (res.data.list.length > 0) {
                            getPageList(res.data.totalSize,pageNo,pageSize)
                            for (var i = 0; i < res.data.list.length; i++) {
                                var content = res.data.list[i];
                                
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                "<td hidden='true' class='id'>" + content.id + "</td>" +
                                "<td  class='docName'>" + content.docName + "</td>" +
                                "<td  class='docTitle'>" + content.docTitle + "</td>" +
                                "<td  class='docTel'>" + content.docTel + "</td>" +
                                "<td  class='deptName'>" + content.deptName+ "</td>" +
								"<td  class='chebox'>" + 
									"<input type='checkbox' value='1' lay-filter='encrypt' "+(res.data.list[i].hasImage && res.data.list[i].hasImage == 1?'checked':'')+" lay-skin='primary' name='tuwen'>"
								 + "</td>" +
								"<td  class='chebox'>" +
									"<input type='checkbox' value='2' lay-filter='encrypt' "+(res.data.list[i].hasVideo && res.data.list[i].hasVideo == 1?'checked':'')+" lay-skin='primary' name='shipin'>"
								 + "</td>" +
								"<td  class='chebox'>" +
									"<input type='checkbox' value='3' lay-filter='encrypt' "+(res.data.list[i].isShowHealth && res.data.list[i].isShowHealth == 1?'checked':'')+" lay-skin='primary' name='health'>" 
								 + "</td>" +
								"<td  class='chebox'>" +
									"<input type='checkbox' value='4' lay-filter='encrypt' "+(res.data.list[i].hashuizhen && res.data.list[i].hashuizhen == 1?'checked':'')+" lay-skin='primary' name='huiyi'>"
								 + "</td>" +
                                "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                "</tr>";

                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
							var api = '/api/admin/doc/setDocOpenSet';
							var hasImage ='';
							var hasVideo ='';
							var hashuizhen ='';
							var isShowHealth ='';
							var data = '';
			
							form.on('checkbox(encrypt)', function(data){
							  var num = $(this).parents("tr").find(".num").text();
							  var docNo = res.data.list[num].docNo;
							  
							  if(data.value == 1){ //图文咨询
								  if(data.elem.checked ){
									  data = {
										  hasImage:  1,
										  docNo: docNo
									  }
								  } else {
									  data = {
									  	  hasImage:  0,
										  docNo: docNo
									  }
								  }
							  }
							  if(data.value == 2){ //视频咨询
								  if(data.elem.checked){
									  data = {
										  hasVideo:  1,
										  docNo: docNo
									  }
								  } else {
									  data = {
										  hasVideo:  0,
										  docNo: docNo
									  }
								  }
							  }
							  if(data.value == 3){ //健康宣教
								  if(data.elem.checked){
									  data = {
										  isShowHealth:  1,
										  docNo: docNo
									  }
								  } else {
									  data = {
										  isShowHealth:  0,
										  docNo: docNo
									  }
								  }
							  }
							  if(data.value == 4){ //远程会诊
								  if(data.elem.checked){
									  data = {
										  hashuizhen:  1,
										  docNo: docNo
									  }
								  } else {
									  data = {
										  hashuizhen:  0,
										  docNo: docNo
									  }
								  }
							  }
							  var api = '/api/admin/doc/setDocOpenSet';
							  request(api,data,function(ress){
								  if (ress.data.retCode == 0) {
								      layer.msg('操作成功', {
								          time: 1000
								      });
									   $(".layui-laypage-btn")[0].click(); //刷新当前页
								  } else {
								      layer.msg(ress.data.retMsg, {
								          time: 1000
								      });
								  }
							  })
							}); 
							
							form.render();
                            //修改
                            $(".btnMain").click(function () {
                                var num = $(this).parents("tr").find(".num").text();
                                sessionStorage.setItem("content", JSON.stringify(res.data.list[num]));
                                layer.open({
                                    type: 2,
                                    title: "修改医生信息",
                                   area: ['70%', '70%'],
                                    content: 'yishengjianjieAdd.html',
                                    end:function () {
                                        $("#search").trigger("click")
                                    }
                                });

                            })
                            //删除
                            $(".delete").click(function () {
                                var id = $(this).parents("tr").find(".id").text();
                                sessionStorage.setItem("id", id);
                                $("#delete").attr("disabled", 'disabled');
                                setTimeout(function () {
                                    $("#delete").attr("disabled", false);
                                }, 2000);
                                var tr = $(this).parents("tr");
                                layer.open({
                                    type: 1,
                                    content: '确认删除吗',
                                    area: ['250px', '140px'],
                                    skin: 'layui-layer-molv',
                                    shade: 0,
                                    title: '提示信息',
                                    btn: ['删除'],
                                    yes: function (index, layero) {
                                        $.post({
                                            url: url + "/api/admin/doc/docDel/" + id,
                                            dataType: "json",
                                            data: content,
                                            contentType: 'application/json;charset=UTF-8',
                                            success: function (res) {
                                                if (res.retCode == 0) {
                                                    layer.msg('删除成功', {
                                                        time: 1000
                                                    });
                                                    tr.remove();
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
                            });
                        }else {
                            layer.msg("暂无数据",{
                                time:1000
                            })
                        }
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                }
            });
        }
        //添加
        $("#add").click(function(){
            $("#yue").css("display","none");
            sessionStorage.setItem("content","");
            layer.open({
                type: 2,
                title: "添加医生",
                area: ['70%', '70%'],
                content: 'yishengjianjieAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
    });
});