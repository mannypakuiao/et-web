//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate','laypage'], function() {
        var layer = layui.layer;
        $("#search").click(function() {
            find();
        });
        $("#search").trigger("click");
        //分页

        function find() {
            //查找公告列表
            var loading = layer.load(2);
            $.post({
                url: url + "/api/admin/notice/selNoticeMain",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    layer.close(loading);
                    if(res.retCode == 0) {
                        console.log(res);
                        if(res.data!=null) {
                            $("#add").css("display","none")
                            $(".tableContent tbody").empty();
                                var content= res.data;
                                var tr= "<tr>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td hidden='true' class='num'>0</td>" +
                                    "<td  class='title'>"+content.title+"</td>" +
                                    "<td  class='addTime'>"+formatDateTime(content.addTime)+ "</td>" +
                                    "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
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
                                    yes: function(index, layero){

                                        $.post({
                                            url: url + "/api/admin/notice/delNoticeMain?id="+id,
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
                                var num = $(this).parents("tr").find(".num").text();
                                sessionStorage.setItem("content", JSON.stringify(res.data));
                                layer.open({
                                    type: 2,
                                    title: "修改公告",
                                    area: ['400px', '400px'],
                                    content: 'noticeMainAdd.html',
                                    end:function () {
                                        $("#search").trigger("click")
                                    }
                                });

                            })
                        }  else {
                            $("#add").css("display","block")
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
                title: "添加公告",
                area: ['400px', '400px'],
                content: 'noticeMainAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
        //保存
        $("#save").click(function(){

            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var loading = layer.load(2);
            var today = new Date();
            var data = {
                "id": $("#id").val(),
                "title": $("#title").val(),
            };
            data = JSON.stringify(data);
            layer.close(loading);
            $.post({
                url: url + "/api/admin/notice/updNoticeMain",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    if(res.retCode == 0) {
                        layer.msg('操作成功', {
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
            $("#title").val(json.title);
        }

    });
});