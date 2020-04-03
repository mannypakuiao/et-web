$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;

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
        function find(pageNo,pageSize) {
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize,
                "docName": $("#key").val()
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/doc/docList",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    layer.close(loading);
                    if (res.retCode == 0) {
                        $(".tableContent tbody").empty();
                        if (res.data.list.length > 0) {
                            getPageList(res.data.totalSize,pageNo,pageSize)
                            for (var i = 0; i < res.data.list.length; i++) {
                                var content = res.data.list[i];
                                var str="";
                                if(content.isShowHealth==0){
                                    str="否";
                                }
                                if(content.isShowHealth==1){
                                    str="是";
                                }
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                "<td hidden='true' class='id'>" + content.id + "</td>" +
                                "<td  class='docName'>" + content.docName + "</td>" +
                                "<td  class='docTitle'>" + content.docTitle + "</td>" +
                                "<td  class='docTel'>" + content.docTel + "</td>" +
                                "<td  class='deptName'>" + content.deptName+ "</td>" +
                                "<td  class='deptName'>" + str+ "</td>" +
                                /*"<td  class='docSex'>" + content.docSex + "</td>" +
                                "<td  class='regFee'>" + content.regFee + "</td>" +
                                "<td  class='level'>" + content.level + "</td>" +*/
                                "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                            //修改
                            $(".btnMain").click(function () {
                                var num = $(this).parents("tr").find(".num").text();
                                sessionStorage.setItem("content", JSON.stringify(res.data.list[num]));
                                layer.open({
                                    type: 2,
                                    title: "修改医生信息",
                                    area: ['40%', '70%'],
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
                area: ['40%', '70%'],
                content: 'yishengjianjieAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
    });
});