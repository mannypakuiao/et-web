//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
		var form = layui.form;
        var totalPages = 0;
        laydate.render({
            elem: '#dateAll',
            range: true
        });
        // find(1);
        $("#search").click(function() {
            find(1);
        });
        $("#last").click(function() {
            pageNo=$("#num").val();
            if(pageNo>1){
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
            if(pageNo >= totalPages) {
                layer.msg("已经是最后一页", {
                    time: 1000
                });
            }else{
                pageNo++;
                find(pageNo);
            }
        });
        function find(pageNo) {
            $("#search").attr("disabled", 'disabled');
            setTimeout(function () {
                $("#search").attr("disabled", false);
            }, 2000);
            $("#page").show();
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "dept":$("#title").val()
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/health/getDeptList",
                data:data,
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    layer.close(loading);
                    if(res.retCode == 0) {
                        if(res.data.list.length > 0) {
                            totalPages = res.data.totalPages;
                            $(".tableContent tbody").empty();
                            for(var i = 0; i < res.data.list.length; i++) {
                                var content= res.data.list[i];
                                var tr= "<tr>" +
                                    "<td hidden='true' class='num'>" +i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='title'>"+content.deptName+"</td>" +
                                    "<td  class='img'><img style='width: 120px;height: 80px' src='"+content.img+"'></td>" +
                                    "<td  class='link'>"+content.sort+ "</td>" +
									"<td  class='chebox'>" +
										"<input type='checkbox' value='1' lay-filter='encrypt' lay-skin='primary' name='like1[write]'>"
									 + "</td>" +
									"<td  class='chebox'>" +
										"<input type='checkbox' lay-filter='encrypt' lay-skin='primary' name='like1[write]'>"
									 + "</td>" +
									"<td  class='chebox'>" +
										"<input type='checkbox' lay-filter='encrypt' lay-skin='primary' name='like1[write]'>"
									 + "</td>" +
									"<td  class='chebox'>" +
										"<input type='checkbox' lay-filter='encrypt' lay-skin='primary' name='like1[write]'>"
									 + "</td>" +
                                    "<td  class='addTime'>"+formatDateTime(content.addTime)+ "</td>" +
                                    "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
							form.render();
                            layer.close(loading);
                            $(".delete").click(function() {
                                var id = $(this).parents("tr").find(".id").text();
                                sessionStorage.setItem("id", id);
                                $("#delete").attr("disabled", 'disabled');
                                setTimeout(function(){
                                    $("#delete").attr("disabled", false);
                                }, 2000);
                                var tr = $(this).parents("tr");
                                layer.open({
                                    type: 1,
                                    content: '确认删除吗' ,
                                    area: ['250px', '140px'],
                                    skin: 'layui-layer-molv',
                                    shade: 0,
                                    title :'提示信息',
                                    btn: ['删除'],
                                    yes: function(index){
                                        $.get({
                                            url: url + "/api/admin/health/delDept/"+id,
                                            dataType: "json",
                                            contentType: 'application/json;charset=UTF-8',
                                            success: function(res) {
                                                if(res.retCode == 0) {
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
                            //修改
                            $(".btnMain").click(function(){
								// alert(111)
                                var num = $(this).parents("tr").find(".num").text();
                                sessionStorage.setItem("content", JSON.stringify(res.data.list[num]));
                                layer.open({
                                    type: 2,
                                    title: "修改科室",
                                    area: ['800px', '500px'],
                                    content: 'healthDeptAdd.html',
                                    end:function () {
                                        $("#search").trigger("click")
                                    }
                                });

                            })
                        }else {
                            layer.close(loading);
                            $(".tableContent tbody tr").remove();
                            layer.msg("暂无数据", {
                                time: 1000
                            });
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
            sessionStorage.setItem("content", "");
            layer.open({
                type: 2,
                title: "添加科室",
                area: ['800px', '600px'],
                content: 'healthDeptAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
    });
});