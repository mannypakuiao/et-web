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
        //全选 取消全选
        form.on('checkbox(c_all)', function (data) {
            var a = data.elem.checked;
            if (a == true) {
                $(".cityId").prop("checked", true);
                form.render('checkbox');
            } else {
                $(".cityId").prop("checked", false);
                form.render('checkbox');
            }
 
        });
        form.on('checkbox(c_one)', function (data) {
            var item = $(".cityId");
            for (var i = 0; i < item.length; i++) {
                if (item[i].checked == false) {
                    $("#c_all").prop("checked", false);
                    form.render('checkbox');
            
                break;
                }
            }
            //如果都勾选了  勾上全选
            var  all=item.length;
            for (var i = 0; i < item.length; i++) {
                if (item[i].checked == true) {
                    all--;
                }
            }
            if(all==0){
            $("#c_all").prop("checked", true);
            form.render('checkbox');}
        });
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
            $.post({
                url: url + "/api/admin/base/accountList",
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
                                if(content.roleName==null){
                                    types = '暂无' 
                                }else{
                                    types = content.roleName
                                }
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='docName'>" + content.userName + "</td>" +
                                    "<td  class='password'>" + content.password + "</td>" +
                                    "<td  class='deptName'>" + formatDateTime(content.addTime)+ "</td>" +
                                    "<td  class='docTel'>" + types + "</td>" +
                                    "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                            //修改
                            $(".btnMain").click(function () {
                                var num = $(this).parents("tr").find(".num").text();
                                sessionStorage.setItem("content", JSON.stringify(res.data[num]));
                                layer.open({
                                    type: 2,
                                    title: "修改接口",
                                    area: ['530px', '450px'],
                                    content: 'zhanghaoAdd.html',
                                    end:function () {
                                        $('#search').trigger('click');
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
                                            url: url + "/api/admin/base/delAccount?id=" + id,
                                            dataType: "json",
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
                area: ['530px', '450px'],
                content: 'zhanghaoAdd.html',
                end:function () {
                    $('#search').trigger('click');
                }
            });
        })

        var data = {
            "roleName": " "
        };
        var loading = layer.load(2);
        data = JSON.stringify(data);
        $.post({
            url: url + "/api/admin/role/selRole",
            data: data,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                layer.close(loading);
                console.log(res)
                var obj=sessionStorage.getItem("content");
                if (res.retCode == 0) {
                    if(obj==null || obj==""){
                        console.log('添加')
                        //角色名称渲染
                        if(res.data.role.length > 0){
                            $("#releaseType").empty();
                            $("#releaseType").append("<option value=''> 请选择 </option>");
                            for (var i = 0; i < res.data.role.length; i++) {
                                var content = res.data.role[i];
                                
                                $("#releaseType").append("<option value='" + content.roleId + "'>" + content.roleName + "</option>");
                            }
                            //坑，重新渲染 固定写法
                            layui.form.render("select");
                        } 
                    } else {
                        console.log('修改')
                        var json=JSON.parse(obj);
                        $("#readu").empty();
                        layui.form.render("radio");
                        jueseId=json.roleId;
                        $("#username").attr("disabled","disabled");
                        $("#username").val(json.userName);
                        $("#password").val(json.password);
                        for (var i = 0; i < res.data.role.length; i++) {
                            var content = res.data.role[i];
                            $("#releaseType").append("<option value='" + content.roleId + "'>" + content.roleName + "</option>");
                        }
                        $('select').val(jueseId);//光标选中角色所对应的id的值,代码是按照至上而下的顺序执行的要写在for循环下面
                        layui.form.render("select");
                    }
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }
            }
        });

        
        var jueseId = '';
        //layui监听select option
        form.on('select(releaseType)', function (data) {
            jueseId = data.value;
        });

        //保存
        $("#save").click(function(){
            var obj=sessionStorage.getItem("content");
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var data = {
                "userName": $("#username").val(),
                "password": $("#password").val(),
                "roleId": jueseId
               // "isDoc":$('input[name="isDoc"]:checked').val()
            };
            if(obj==null || obj==""){
                data = JSON.stringify(data);
                var loading = layer.load(2);
                console.log(data)
                $.post({
                    url: url + "/api/admin/base/saveAccount",
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
            } else {
                var json = JSON.parse(obj);
                var data = {
                    "id": json.id,
                    "userName": $("#username").val(),
                    "password": $("#password").val(),
                    "roleId": jueseId
                //    "isDoc":$('input[name="isDoc"]:checked').val(),
                };
                data = JSON.stringify(data);
                var loading = layer.load(2);
                console.log(data)
                $.post({
                    url: url + "/api/admin/base/updateAccount",
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
            }

            
        })

    });
});