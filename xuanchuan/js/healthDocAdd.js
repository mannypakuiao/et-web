//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        laydate.render({
            elem: '#dateAll',
            range: true
        });

        var loading = layer.load(2);
        $.post({
            url: url + "/api/admin/health/getDeptAll",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                layer.close(loading);
                if (res.retCode == 0) {
                    var obj=sessionStorage.getItem("content");
                    if(obj==null || obj==""){
                        if(res.data.length > 0){
                            $("#healthDeptId").empty();
                            $("#healthDeptId").append("<option value='' id='xuanze'> 请选择科室 </option>");
                            for (var i = 0; i < res.data.length; i++) {
                                var content = res.data[i];
                                $("#healthDeptId").append("<option value='" + content.id + "'>" + content.deptName + "</option>");
                            }
                            //坑，重新渲染 固定写法
                            layui.form.render("select");
                        }
                    }else{
                        var json=JSON.parse(obj);
                        $("#id").val(json.id);
                        $("#docName").val(json.docName);
                        $("#docJob").val(json.docJob);
                        $("#phone").val(json.phone);
                        $("#password").val(json.password);
                        $("#sort").val(json.sort);
                        $("#descr").val(json.descr);
                        $("#img").append("<img src='"+json.img+"' style='width: 80px;height: 100px'>")
                        for (var i = 0; i < res.data.length; i++) {
                            var content = res.data[i];
                            var selected=""
                            if(json.healthDeptId==content.id){
                                selected="selected";
                            }
                            $("#healthDeptId").append("<option value='" + content.id + "' "+selected+">" + content.deptName + "</option>");
                        }
                        //坑，重新渲染 固定写法
                        layui.form.render("select");
                    }
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }

            }
        });
        //保存
        $("#save").click(function(){

            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);

            var healthDeptId=$("#healthDeptId").val();
            if(healthDeptId==""){
                msg("请选择科室");
                return false;
            }

            var docName=$("#docName").val();
            if(docName==""){
                msg("姓名不能为空");
                return false;
            }
            var phone=$("#phone").val();
            if(phone==""){
                msg("电话不能为空");
                return false;
            }else {
                if (!(/^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/.test(phone))) {
                    msg("手机号格式错误");
                    return false;
                }
            }
            var password=$("#password").val();
            if(password==""){
                msg("密码不能为空");
                return false;
            }
            var docJob=$("#docJob").val();
            if(docJob==""){
                msg("职称不能为空");
                return false;
            }
            var sort=$("#sort").val();
            if(sort==""){
                msg("排序不能为空");
                return false;
            }
            var id=$("#id").val();
            if(id==""||id==null){
                var fileInput = $('#file').get(0).files[0];
                if(!fileInput){
                    msg("图片不能为空");
                    return false;
                }
            }
            var loading = layer.load(2);
            $("#regform").ajaxSubmit({
                url: url + "/api/admin/health/saveDoc",
                type: "post",
                enctype: 'multipart/form-data',
                success: function (res)
                {
                    if (res.retCode == "0") {
                        layer.msg('保存成功', {
                            time: 1000
                        });
                        $("#search").trigger("click");
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 1000);
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                    layer.close(loading);
                },
                error: function (data)
                {
                    alert("出错");//msg.errCode
                }
            })
        })
    });
    function msg(msg) {
        layer.msg(msg, {
            time: 1000
        });
    }
});