//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        laydate.render({
            elem: '#dateAll',
            range: true
        });
        //保存
        $("#save").click(function(){

            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var deptName=$("#deptName").val();
            if(deptName==""){
                msg("科室不能为空");
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
                url: url + "/api/admin/health/saveDept",
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
                        layer.msg('保存失败', {
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
        var obj=sessionStorage.getItem("content");
        if(obj==null || obj==""){
            return false;
        }else{
            var json=JSON.parse(obj);

            $("#id").val(json.id);
            $("#deptName").val(json.deptName);
            $("#sort").val(json.sort);
            $("#descr").val(json.descr);
            $("#img").append("<img src='"+json.img+"' style='width: 120px;height: 80px'>")
            var obj=document.getElementById("type");
            for (var i = 0; i <obj.length ; i++) {
                if(json.type==obj[i].value){
                    obj[i].selected = true;
                }
            }
        }
    });
    function msg(msg) {
        layer.msg(msg, {
            time: 1000
        });
    }
});