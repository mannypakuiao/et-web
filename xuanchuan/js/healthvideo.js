//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var totalPages = 0;
        laydate.render({
            elem: '#dateAll',
            range: true
        });
        find(1);
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
                "title":$("#title").val(),
                "doc":$("#doc").val(),
                "dept":$("#dept").val()
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/health/queryHealthVideo",
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
                                var isUp=content.isUp;
                                if(isUp=="0"||isUp==null||isUp==""){
                                    isUp="公开"
                                }else if (isUp=="1") {
                                    isUp="隐私"
                                }
                                var tr= "<tr>" +
                                    "<td hidden='true' class='num'>" +i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='title'>"+content.title+"</td>" +
                                    "<td  class='img'><video src='"+content.link+"' style='width: 100px;height: 128px' controls></video></td>" +
                                    "<td  class='link'>"+content.num+ "</td>" +
                                    "<td  class='link'>"+content.healthName+ "</td>" +
                                    // "<td  class='link'>"+content.deptName+ "</td>" +
                                    "<td  class='link'>"+content.docName+ "</td>" +
                                    "<td  class='link'>"+isUp+ "</td>" +
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
                                            url: url + "/api/admin/health/delHealthVideo/"+id,
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
                                    title: "修改视频",
                                    area: ['500px', '500px'],
                                    content: 'healthVideoAdd.html',
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
            sessionStorage.setItem("content","");
            layer.open({
                type: 2,
                title: "添加视频",
                area: ['500px', '500px'],
                content: 'healthVideoAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
    });
});