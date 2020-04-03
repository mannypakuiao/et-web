$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {

        var name = sessionStorage.getItem("name");
        $("#exitname").append(name);

        $(".btn-img").click(function() {

            if(name==null||name==""){
                return false
            }
            var id=$(this).attr("id");
            var authority=sessionStorage.getItem("authority");
            if(authority.indexOf(id) == -1 ){
                layer.msg("暂无权限", {
                    time: 1000
                });
                return false;
            }

            var title = $(this).attr("alt");
            switch(title) {
                case "统一对账平台":
                    judge(title, "duizhang/index.html");
                    break;
                case "健康宣教平台":
                    judge(title, "xuanchuan/index.html");
                    break;
                case "互联网统一接入管理":
                    judge(title, "jiekou/index.html");
                    break;
                case "系统设置":
                    judge(title, "system/index.html");
                    break;
                case "互联网医院平台":
                    judge(title, "hulianwang/index.html");
                    break;
            }
        });

        function judge(title, url) {
             window.location.href=url;
        }
    })
    $("#exitbtnn").click(function() {
        layer.open({
            type: 2,
            title: "修改密码",
            area: ['400px', '300px'],
            content: 'password.html'
        });
    });
});