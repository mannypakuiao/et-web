$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var element = layui.element;
        var table = layui.table;
        var layer = layui.layer;
        var form = layui.form;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var totalPages = 0;
        var userId = sessionStorage.getItem("userId");
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
            //pageNo当前页
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
            //查找服务列表
            $("#search").attr("disabled", 'disabled');
            setTimeout(function () {
                $("#search").attr("disabled", false);
            }, 2000);
            $("#page").show();
            var loading = layer.load(2);
            var data = {
                "roleName": " "
            };
            console.log(data.roleName)
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/role/selRole",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    layer.close(loading);
                    console.log(res)
                    if (res.retCode == 0) {
                        if (res.data.role.length > 0) {
                            $(".tableContent tbody").empty();
                            for (var i = 0; i < res.data.role.length; i++) {
                                var content = res.data.role[i];
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.roleId + "</td>" +
                                    "<td  class='docTel'>" + content.roleName + "</td>" +
                                    "<td  class='deptName'>" + formatDateTime(content.createTime)+ "</td>" +
                                    "<td  class='del'><p style='cursor: pointer;' class='personState permissions'>权限配置</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState delete'>删除</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                
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
                                    area: ['400px', '520px'],
                                    content: 'juesefenpeiAdd.html',
                                    end:function () {
                                        $("#search").trigger("click");
                                    }
                                });
                            })
                            //删除
                            $(".delete").click(function () {
                                var id = $(this).parents("tr").find(".id").text();
                                console.log(id)
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
                                            url: url + "/api/admin/role/delRelo?roleId=" + id,
                                            dataType: "json",
                                            method:'GET',
                                            contentType: 'application/json;charset=UTF-8',
                                            success: function (res) {
                                                console.log(res)
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
                area: ['545px', '190px'],
                content: 'jueseAdd.html',
                end:function () {
                    $('#search').trigger('click');
                }
            
            });
        })

        var obj=sessionStorage.getItem("content");
        console.log(obj)
        var id="";

        if(obj==null || obj==""){
           
        }else{
            var json=JSON.parse(obj);
            $("#id").val(json.id);
			$("#docName").val(json.servicename);
            $("#docTitle").val(json.descr);
            $("#deptId").val(json.interfacname);

            id=json.id;

        }
 
        //保存
        $("#save").click(function(){
           
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var data = {
                "roleName": $("input[name='jueseName']").val(),//服务名
            };
            console.log(data.roleName)
            if(data.roleName ==""){
                layer.msg("角色名称不能为空", {
                    time: 1000
                });
                return false;
            }
           
            data = JSON.stringify(data);
            var loading = layer.load(2);
            $.post({
                url: url + "/api/admin/role/addRole",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    console.log(res)
                    if(res.retCode == 0) {
                        layer.msg('操作成功', {
                            time: 1000,
                            end:function(){
                                
                            }
                            
                        });
                           
                        // table.reload();
                        //layui关闭当前页面
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 300);
                           
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                    layer.close(loading)
                }
            });
            // window.parent.location.reload();
        //    table.reload();
        })
    });
});