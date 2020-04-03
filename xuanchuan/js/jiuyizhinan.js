$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laypage=layui.laypage;
        var pageNo=1;
        var pageSize=10;
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
            //就医指南
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize,
                "title":$("#title").val()
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/MedicalGuidelines/selByTitle",
                method:"POST",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success:function (res) {
                    if (res.retCode==0){
                        $(".tableContent tbody").empty();
                        if (res.data.list.length > 0) {
                            getPageList(res.data.totalSize,pageNo,pageSize)
                            for (var i = 0; i < res.data.list.length; i++) {
                                var contents = res.data.list[i];
                                var tr = "";
                                tr+="<tr></tr><td hidden='true' class='num'>" + i + "</td>"
                                tr+="<td hidden='true' class='id'>" + contents.id + "</td>"
                                tr+="<td  class='title'>" + contents.title+ "</td>"
                                tr+="<td hidden='hidden' class='content'>" + contents.content+ "</td>"
                                tr+="<td  class='orderNo'>" + contents.sort+ "</td>"
                                tr+="<td  class='orderNo'>" +formatDateTime(contents.addTime)+ "</td>"
                                tr+= "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState upd'>修改</p></td>"
                                tr+="</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                        }else {
                            layer.msg("暂无数据", {
                                time: 1000
                            });
                        }
                    }else {
                        layer.msg("查询失败",{
                            time:1000
                        })
                    }
                    layer.close(loading)
                    //删除
                    $(".delete").click(function () {
                        var id=$(this).parents("tr").find(".id").text();
                        $("#delete").attr("disabled", 'disabled');
                        setTimeout(function(){
                            $("#delete").attr("disabled", false);
                        }, 2000);
                        var tr = $(this).parents("tr");
                        layer.confirm('确定要删么？', {
                            btn: ['确定','取消'] //按钮
                        },function () {
                            var loading = layer.load(2);
                            $.get({
                                url: url + "/api/admin/MedicalGuidelines/delMedicalGuidelines?id="+id,
                                dataType: "json",
                                method:"GET",
                                contentType: 'application/json;charset=UTF-8',
                                success: function(res) {
                                    layer.close(loading);
                                    if(res.retCode == 0) {
                                        tr.remove();
                                        layer.msg("删除成功", {
                                            time: 1000
                                        });
                                    } else {
                                        layer.msg(res.msg, {
                                            time: 1000
                                        });
                                    }
                                    layer.close(loading);
                                }
                            });
                        })
                    });
                    //修改
                    $(".upd").click(function () {
                        $("#yue").css("display","none");
                        var num = $(this).parents("tr").find(".num").text();
                        sessionStorage.setItem("vo",JSON.stringify(res.data.list[num]));
                        layer.open({
                            type: 2,
                            title: "修改就医指南",
                            area: ['800px', '700px'],
                            content: 'jiuyizhinanAdd.html',
                            end:function () {
                                $("#search").trigger("click");
                            }
                        });
                    });
                    //添加
                    $("#add").click(function () {
                        sessionStorage.setItem("vo","");
                        layer.open({
                            type: 2,
                            title: "添加就医指南",
                            area: ['800px', '700px'],
                            content: 'jiuyizhinanAdd.html',
                            end:function () {
                                $("#search").trigger("click");
                            }
                        });
                    });
                }
            });
        }
    });
});