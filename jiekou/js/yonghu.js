$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var totalPages = 0;
        $("#search").click(function() {
            find(1);
        });
        $("#search").trigger("click")
        function find(pageNo) {
            //查找服务列表
            $("#search").attr("disabled", 'disabled');
            setTimeout(function () {
                $("#search").attr("disabled", false);
            }, 2000);
            $("#page").show();
            var loading = layer.load(2);
            var data = {
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/service/InterfaceFrom/selAll",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    layer.close(loading);
                    console.log(res)
                    if (res.retCode == 0) {
                        if (res.data.length > 0) {
                            totalPages = res.data.totalPages;
                            $(".tableContent tbody").empty();
                            for (var i = 0; i < res.data.length; i++) {
                                var content = res.data[i];
                                var tr = "<tr>" +
                                    "<td class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='docName'><a class='details' href='jiekoufenpei.html'>" + content.name + "</a></td>" +
                                    "<td  class='docTel'>" + content.key + "</td>" +
                                    "<td  class='deptName'>" + formatDateTime(content.addTime)+ "</td>" +
                                    "<td  class='del'><p style='cursor: pointer;' class='personState permissions'>权限配置</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                            //详情
                            $(".details").click(function () {
                                var id = $(this).parents("tr").find(".id").text();
                                sessionStorage.setItem("jiekouId",id);
                            })
                            /**
                             * 权限配置
                             */
                            $(".permissions").click(function () {
                                var id = $(this).parents("tr").find(".id").text();
								layui.data('param', {key: 'jiekouId',value: id});
                                //sessionStorage.setItem("jiekouId",id);
                                layer.open({
                                    type: 2,
                                    title: "权限分配",
                                    area: ['600px', '520px'],
                                    content: 'jiekoufenpeiAdd.html',
                                    end:function () {
                                        $("#search").trigger("click");
                                    }
                                });
                            })

                             //修改
                             $(".btnMain").click(function () {
                                var num = $(this).parents("tr").find(".num").text();
								localStorage.setItem("content", JSON.stringify( res.data[num]))
                                console.log(localStorage.getItem("content"))
                                layer.open({
                                    type: 2,
                                    title: "修改账号",
                                    area: ['570px', '260px'],
                                    content: 'yonghuAdd.html'  ,
                                    end:function () {
                                        $('#search').trigger('click');
                                    },
									cancel:function(){
										localStorage.setItem("content", '')
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
                                            url: url + "/service/InterfaceFrom/delAccount/" + id,
                                            dataType: "json",
                                            method:'POST',
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
                title: "添加接口",
                area: ['570px', '260px'],
                content: 'yonghuAdd.html',
                end:function () {
                    $('#search').trigger('click');
                },
				cancel:function(){
					localStorage.setItem("content", '')
				}
            });
        })

        var obj=sessionStorage.getItem("content");
        var id="";

        if(obj==null || obj==""){
           
        }else{
            var json=JSON.parse(obj);
            $("#id").val(json.id);
			$("#name").val(json.name);
            $("#key").val(json.key);
            $("#addTime").val(json.addTime);
            $("#type").val(json.type)
            id=json.id;

        }
 
     

    });
});