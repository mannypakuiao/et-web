$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laypage=layui.laypage
        var pageNo=1;
        var pageSize=10;
        $("#search").click(function() {
            find(pageNo,pageSize);
        });
        $("#search").trigger("click");
        //分页
        function getPageList(totalSize,pageNo,pageSize){
            laypage.render({
                elem: 'page'
                ,curr:pageNo
                ,count:totalSize
                ,limit:pageSize
                ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
                ,jump: function(obj,first){
                    //首次不执行
                    if(!first){
                        pageNo=obj.curr
                        pageSize=obj.limit;
                        find(pageNo,pageSize);
                    }
                }
            });
        }
        function find(pageNo,pageSize) {
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize,
                "title": $("#userName").val(),
                "id":sessionStorage.getItem("jiekouId")
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/service/InterfaceFrom/selById",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    layer.close(loading);
                    if (res.retCode == 0) {
                        if (res.data.list.length > 0) {
                            getPageList(res.data.totalSize,pageNo,pageSize)
                            $(".tableContent tbody").empty();
                            for (var i = 0; i < res.data.list.length; i++) {
                                var content = res.data.list[i];
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='docName'>" + content.servicename + "</td>" +
                                    "<td  class='docTitle'>" + content.descr + "</td>" +
                                    "<td  class='docTel'>" + content.interfacname + "</td>" +
                                    "<td  class='docTel'>" + content.requestType + "</td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                        }else {
                            layer.msg("暂无数据", {
                                time: 1000
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
    });
});