$(function(){
    var layer = layui.layer;
    var options = {
        url:url + "/api/admin/base/saveBanner",
        type:'POST',
        success: function (res) {
            if(res.retCode=="0"){
                layer.msg("保存成功",{
                    time:1000
                });
                setTimeout(function () {
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                }, 500);
            }else {
                layer.msg("保存失败",{
                    time:1000
                });
            }
        }
    };
    $("#regform").ajaxForm(options);
})