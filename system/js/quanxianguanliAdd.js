//JavaScript代码区域
$(function(){
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var form = layui.form;

        // //监听提交
        form.on('submit(formDemo)', function(data){
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);

            var vo=data.field;
            var arr=[];
            $(":checkbox:checked").each(function(){
                arr.push($(this).val());
            });
            var ids="";
            //遍历数组
            for(var i=0;i<arr.length;i++){
               console.log(arr[i])
                ids+=arr[i]+",";
            }
            data = {
                "roleId": vo.roleId,
                "ids":ids
            };
            if(data.roleId==""){
                msg("请选择角色")
                return false;
            }
            if(data.ids==""){
                msg("请选择所属权限")
                return false;
            }
            console.log(data)

            var loading = layer.load(2);
            $.post({
                url: url + "/admin/role/saveRoleAuthority",
                data:JSON.stringify(data),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    if(res.code == 0) {
                        layer.msg('添加成功', {
                            time: 1000
                        });
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 1000);
                    } else {
                        layer.msg(res.msg, {
                            time: 1000
                        });
                    }
                    layer.close(loading);
                }
            });

        });



        // //查询所有权限
        var loading = layer.load(2);
        $.get({
            url: url + "/admin/role/getRoleAndAuthorityAll",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                console.log(res)
                if(res.code == 0) {
                    var roleId="";
                    var authorityName="";
                    //修改
                    var obj=sessionStorage.getItem("vo");
                    console.log(obj)
                    if(obj!='' && obj!==null){
                         var json=JSON.parse(obj);
                         roleId=json.roleId;
                         authorityName=json.authorityName;
                         res.data.baseRoles=null;
                         var str='<option value="'+roleId+'">'+json.roleName+'</option>'
                         $("#selectdiv").append(str)
                        form.render('select');
                    }

                    //权限
                    if(res.data.baseAuthorities!=null) {
                        size=res.data.baseAuthorities.length;
                        for(var i = 0; i < res.data.baseAuthorities.length; i++) {
                            var vo=res.data.baseAuthorities[i];
                            var checked="";
                            if(authorityName!=""){
                                if(authorityName.indexOf(vo.authorityName) >= 0){
                                    checked="checked";
                                }
                            }
                            var str='<input type="checkbox" required '+checked+' name="checkbox'+i+'" lay-filter="checkbox" value="'+vo.authorityNo+'" title="'+vo.authorityName+'">'
                            $("#checkboxdiv").append(str)

                        }

                        //重新渲染
                        form.render('checkbox');
                    }
                    //角色
                    if(res.data.baseRoles!=null) {

                        for(var i = 0; i < res.data.baseRoles.length; i++) {
                            var vo=res.data.baseRoles[i];
                            var selected="";
                            if(roleId==vo.id){
                                selected="selected";
                            }
                            var str='<option value="'+vo.id+'" '+selected+'>'+vo.roleName+'</option>'

                            $("#selectdiv").append(str)
                        }

                        //重新渲染
                        form.render('select');
                    }

                } else {
                    layer.msg(res.msg, {
                        time: 1000
                    });
                }
                layer.close(loading);
            }
        });






        function msg(msg) {
            layer.msg(msg, {
                time: 2000
            });
        }

    });
});
