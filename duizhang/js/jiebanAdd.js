//JavaScript代码区域
$(function(){
    layui.use(['form', 'element', "table", 'layer', 'laydate','upload'], function() {
        var userName=sessionStorage.getItem("name");
        $("#jbUser").val(userName);
        var layer = layui.layer;
        var form = layui.form;
        var laydate = layui.laydate;

        laydate.render({
            elem:'#endTime',
            type: 'datetime',
        })
        var data = {
            "starTime": $("#beginTime").val(),
            "endTime": $("#endTime").val(),
        };
        data = JSON.stringify(data);
        console.log(data)
        var loading = layer.load(2);
        $.post({
            url: url + "/api/admin/jieban/lastTime",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {

                if(res.retCode == 0) {
                   if(res.data==""||res.data==null){
                       $("#beginTime").val("2019-01-01 00:00:00");
                   }else{
                       $("#beginTime").val(dateAdd(formatDateTime(res.data),1));
                   }
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }
                layer.close(loading);
            }
        });


        // //监听提交
        form.on('submit(formDemo)', function(data){

            console.log(data.field)
            var loading = layer.load(2);
            $.post({
                url: url + "/api/admin/jieban/save",
                data:JSON.stringify(data.field),
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    console.log(res)
                    if(res.retCode == 0) {
                        layer.msg('操作成功', {
                            time: 1000
                        });
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 500);
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                    layer.close(loading);
                }
            });
        });
    });
});
