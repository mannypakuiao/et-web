$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var pageNo=1;
        var pageSize=10;
        laydate.render({
            elem: '#buyDay',
            range: true
        });
        laydate.render({
            elem: '#inDay',
            range: true
        });
        laydate.render({
            elem: '#outDay',
            range: true
        });
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
            //查找用户满意度
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/satisfaction/satisfactionList?pageNumber="+pageNo,
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
                                if(content.title!=null) {
                                    var tr = "<tr><td class='clearFix' colspan='12'>";
                                    var tr = "<tr>" +
                                        "<td hidden='true' class='num'>" + i + "</td>" +
                                        "<td hidden='true' class='id'>" + content.id + "</td>" +
                                        "<td  class='title'>" + content.title + "</td>" +
                                        "<td  class='sal'>" + content.sal + "</td>" +
                                        "</tr>";
                                    $(".tableContent tbody").append(tr);
                                }
                            }
                            $("#num").val(pageNo);
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