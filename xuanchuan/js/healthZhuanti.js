//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate','laypage'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage=layui.laypage;
        var pageNo=1;
        var pageSize=10;
        laydate.render({
            elem: '#dateAll',
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
        function find(pageNo,pageSize) {
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize,
                "dept":$("#title").val()
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/health/getZhuantiList",
                data:data,
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    console.log(res)
                    layer.close(loading);
                    if(res.retCode == 0) {
                        if(res.data.list.length > 0) {
                            getPageList(res.data.totalSize,pageNo,pageSize)
                            $(".tableContent tbody").empty();
                            for(var i = 0; i < res.data.list.length; i++) {
                                var content= res.data.list[i];
                                var tr= "<tr>" +
                                    "<td hidden='true' class='num'>" +i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='title'>"+content.title+"</td>" +
                                    "<td  class='img'><img style='width: 120px;height: 80px' src='"+content.img+"'></td>" +
                                    "<td  class='link'>"+content.sort+ "</td>" +
                                    "<td  class='addTime'>"+formatDateTime(content.addTime)+ "</td>" +
                                    "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
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
                                            url: url + "/api/admin/health/delZhuanti/"+id,
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
                                sessionStorage.setItem("content", JSON.stringify(res.data.list[num]));
                                layer.open({
                                    type: 2,
                                    title: "修改专题",
                                    area: ['520px', '560px'],
                                    content: 'healthZhuantiAdd.html',
                                    end:function () {
                                        $("#search").trigger("click");
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
                title: "添加专题",
                area: ['520px', '520px'],
                content: 'healthZhuantiAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
    });
});