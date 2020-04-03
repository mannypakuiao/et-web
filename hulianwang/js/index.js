$(function() {
    var userId = sessionStorage.getItem("userId");
    layui.use('element', function() {
        var element = layui.element;
        //遍历匹配当前所选tabs并修改为选中样式
        element.on("tab(tabs)", function(data) {
            var tabText = this.innerText.substring(0, this.innerText.length - 1);
            $(".layui-nav-item a.tabs-a").each(function() {
                if($(this).text() == tabText) {
                    $(".layui-nav-item .tabs-a").parent().removeClass("layui-this");
                    $(this).parent().addClass("layui-this")
                }
            })
        });
        $(".layui-nav-item a.tabs-a").click(function() {
            var title = $(this).text();
            title = title.substring(0, title.length - 1);
            switch(title) {
                case "问诊排班":
                    judge(title, "scheduling.html");
                    break;
                case "患者管理":
                    judge(title, "patient.html");
                    break;
                case "问诊订单":
                    judge(title, "wz_order.html");
                    break;
                case "视频问诊":
	                judge(title, "../online/onlineVideo/videolist.html");
	                break;
            }
        });

        function judge(title, url) {
            if($(".layui-tab-title li").length == 0) {
                $(".layui-tab").show();
                $(".body-content img").hide();
                element.tabAdd("tabs", {
                    title: title,
                    content: "<iframe src='" + url + "' frameborder='0' width='100%' height='100%'></iframe>",
                    id: title
                });
                element.tabChange("tabs", title)
            } else {
                var array = [];
                $(".layui-tab-title li").each(function(index) {
                    array.push($(".layui-tab-title li").eq(index).attr("lay-id"))
                });
                if(array.indexOf(title) >= 0) {
                    element.tabChange("tabs", title)
                } else {
                    element.tabAdd("tabs", {
                        title: title,
                        content: "<iframe src='" + url + "' frameborder='0' width='100%' height='100%'></iframe>",
                        id: title
                    });
                    element.tabChange("tabs", title)
                }
            }
        }

    })

});