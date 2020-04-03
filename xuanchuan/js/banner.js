//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var pageNo = 0;
        var totalPages = 0;
        laydate.render({
            elem: '#dateAll',
            range: true
        });
        find();
        $("#search").click(function() {
            find();
        });
        function find() {
            $("#search").attr("disabled", 'disabled');
            setTimeout(function () {
                $("#search").attr("disabled", false);
            }, 2000);
        var loading = layer.load(2);
            layer.close(loading);
            $.post({
            url: url + "/api/admin/base/banner",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                layer.close(loading);
                if(res.retCode == 0) {
                    if(res.data.length > 0) {
                        $(".tableContent tbody").empty();
                        var j=1;
                        for(var i = 0; i < res.data.length; i++) {
                            var content= res.data[i];
                            var tr= "<tr>" +
                                "<td hidden='true' class='id'>" + content.id + "</td>" +
                                "<td  class='num'>" + j + "</td>" +
                                "<td  class='img'><img src='"+content.img+"'></td>" +
                                "<td  class='sort'>"+content.sort+ "</td>" +
                                "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p></td>" +
                                "</tr>";
                            $(".tableContent tbody").append(tr);
                            j++;
                        }
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
                                        url: url + "/api/admin/base/delBanner/"+id,
                                        dataType: "json",
                                        data: content,
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
            sessionStorage.setItem("id", "");
            sessionStorage.setItem("title", "");
            sessionStorage.setItem("img", "");
            sessionStorage.setItem("sort", "");
            sessionStorage.setItem("link", "");
            layer.open({
                type: 2,
                title: "添加banner",
                area: ['400px', '400px'],
                content: 'bannerAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
    });

    
});