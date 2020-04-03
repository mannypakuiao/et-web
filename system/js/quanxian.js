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




        find(1);
        $("#search").click(function() {
            find(1);
        });
      /*  // $("#last").click(function() {
        //     pageNo=$("#num").val();
        //     if(pageNo>1){
        //         pageNo--;
        //         find(pageNo);
        //     }else{
        //         layer.msg("已经是第一页", {
        //             time: 1000
        //         });
        //     }
        // });
        // $("#next").click(function() {
        //     //pageNo当前页
        //     pageNo=$("#num").val();
        //     if(pageNo >= totalPages) {
        //         layer.msg("已经是最后一页", {
        //             time: 1000
        //         });
        //     }else{
        //         pageNo++;
        //         find(pageNo);
        //     }
        // });*/
        function find(pageNo) {
            //查找服务列表
            $("#search").attr("disabled", 'disabled');
            setTimeout(function () {
                $("#search").attr("disabled", false);
            }, 2000);
            $("#page").show();
            var data = {
                "roleName": " "
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/role/selRoleJurisdiction",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    console.log(res)
                    if (res.retCode == 0) {
                        if (res.data.length > 0) {
                            totalPages = res.data.totalPages;
                            $(".tableContent tbody").empty();
                            for (var i = 0; i < res.data.length; i++) {
                                var content = res.data[i];
                                var tr = "<tr>" +
                                    //"<td  class='check'>" + "<input type='checkbox' name='' value='' lay-skin='primary' lay-filter='c_one' class='cityId' />" + "</td>" +
                                    "<td class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='docName'>" + content.roleName + "</td>" +
                                    "<td  class='docTel'>" + content.jurisdictionName + "</td>" +
                                    "<td  class='deptName'>" + formatDateTime(content.createTime)+ "</td>" +
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
                                    area: ['600px', '320px'],
                                    content: 'quanxianAdd.html'
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
                                            url: url + "/api/admin/role/delRoleJurisdiction?id=" + id,
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
                area: ['600px', '320px'],
                content: 'quanxianAdd.html'
            });
        })

        var jueseId = '';
        var type = 2;
        var loading = layer.load(2);
        $.post({
            url: url + "/api/admin/role/selByRoleTrue?type=" + type,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                layer.close(loading);
                console.log(res)
                if (res.retCode == 0) {
                    var obj=sessionStorage.getItem("content");
                    if(obj==null || obj==""){
                        console.log("添加")
                       //角色名称渲染
                        if(res.data.role.length > 0){
                            $("#releaseType").empty();
                            $("#releaseType").append("<option value='' id='xuanze'> 请选择 </option>");
                            for (var i = 0; i < res.data.role.length; i++) {
                                var content = res.data.role[i];
                                $("#releaseType").append("<option value='" + content.roleId + "'>" + content.roleName + "</option>");
                            }
                            //坑，重新渲染 固定写法
                            layui.form.render("select");
                        }
                         //权限范围渲染
                        if(res.data.Jurisdiction.length > 0){
                            $(".checks").empty();
                            for (var i = 0; i < res.data.Jurisdiction.length; i++) {
                                var content = res.data.Jurisdiction[i];
                                var inputs= "<div class='input_cont'>" +
                                            "<input type='checkbox' class='ipt' name='checkbox'  value='"+ content.jurisdictionId +"'> " +  
                                            "<div class='input_ms'>" + content.jurisdictionName + "</div>" +
                                            "</div>"
                                            
                                $(".checks").append(inputs);
                            }
                            //坑，重新渲染 固定写法
                            // layui.form.render();
                        }
                    }else{
                        console.log("修改")
                        var json=JSON.parse(obj);
                        jueseId=json.roleId;
                        $("#releaseType").append("<option value='"+json.id+"' > "+ json.roleName+" </option>");
                        layui.form.render("select");
                        //权限范围渲染
                        if(res.data.Jurisdiction.length > 0){
                            $(".checks").empty();   
                            for (var i = 0; i < res.data.Jurisdiction.length; i++) {
                                var content = res.data.Jurisdiction[i];
                                var inputs ="<div class='input_cont'>" +
                                            "<input type='checkbox' class='ipt' name='checkbox' " 
                                for (var j = 0; j <json.jurisdictionId.length; j++) {
                                    if(content.jurisdictionId==json.jurisdictionId[j]){
                                        inputs+="checked " 
                                    }
                                }
                                var inputs=  inputs+" value='"+ content.jurisdictionId +"'> " +  
                                            "<div class='input_ms'>" + content.jurisdictionName + "</div>" +
                                            "</div>"
                                $(".checks").append(inputs);
                            }
                          
                           
                            //坑，重新渲染 固定写法
                            // layui.form.render();
                        }
                    }
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }

            }
        });



        //layui监听select option
        form.on('select(releaseType)', function (data) {
            jueseId = data.value;
           
        });
                     
        //保存
        $("#save").click(function(){
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);

            var chk_value =[];//定义一个数组    
            $('input[name="checkbox"]:checked').each(function(){//遍历每一个名字为interest的复选框，其中选中的执行函数    
                chk_value.push($(this).val());//将选中的值添加到数组chk_value中    
            });
            var ids="";
            for(var i=0;i<chk_value.length;i++){
                ids+=chk_value[i]+","
            }

            console.log(ids)
          
            if(ids.endsWith(",")){
                ids=ids.substring(0,ids.length-1)
            }
           
            
            if(jueseId==""){
                layer.msg("角色名称不能为空", {
                    time: 1000
                });
                return false;
            }

            data={
                id:1,
                jurisdiction: ids,
                roleId: jueseId
            },
            data = JSON.stringify(data)
            console.log(data)

            var loading = layer.load(2);
            $.post({
                url: url + "/api/admin/role/addRoleJurisdiction",
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
                        
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                    layer.close(loading)
                }
            });

        })

    });
});