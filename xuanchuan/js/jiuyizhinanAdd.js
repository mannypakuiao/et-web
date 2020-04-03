//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        laydate.render({
            elem: '#dateAll',
            range: true
        });
        var obj=sessionStorage.getItem("vo");
        var id="";
        if(obj==null||obj==""){

        }else{
            var json=JSON.parse(obj);
            var title=json.title;
            var content=json.content;
            var sort=json.sort;
            $("#title").val(title);
            $("#content").html(content);
            $("#sort").val(sort);
            id=json.id;
        }
        $("#save").click(function(){
            var data = {
                "id": id,
                "title":$("#title").val(),
                "content":$("#content").html(),
                "sort":$("#sort").val(),
            };
            if(data.title==""){
                layer.msg("标题不能为空",{
                    time:1000
                })
                return false;
            }
            if(content==""){
                layer.msg("内容不能为空",{
                    time:1000
                })
                return false;
            }
            if(data.sort==""){
                layer.msg("阅读量不能为空", {
                    time: 1000
                });
                return false;
            }
            var loading=layer.load(2);
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/MedicalGuidelines/saveMedicalGuidelines",
                method:"POST",
                data:data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    if(res.retCode== 0) {
                        layer.msg('操作成功', {
                            time: 1000
                        });
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 500);
                    } else {
                        layer.msg("操作失败", {
                            time: 1000
                        });
                    }
                    layer.close(loading);
                }
            });
        })

    });
})