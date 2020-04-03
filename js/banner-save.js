$(function(){
    layui.use(['form', 'element', "table", 'layer', 'laydate'],function () {
        function f() {
            var loading=layer.load(2)
            var options = {
                url:url + "/api/admin/base/saveBanner",
                type:'POST',
                success: function (res) {
                    if(res.retCode=="0"){
                        alert("保存成功")
                    }else {
                        alert("保存失败")
                    }
                    layer.close(loading)
                }
            };
            return options;
        }
        $("#save").click(function () {
            $("#regform").ajaxForm(f());
        });
    })
})