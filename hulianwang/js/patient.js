$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {

        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var pageNo=1;
        var pageSize=10;
        
        //加减天数
        function addDate(days) {
            var d = new Date();
            d.setDate(d.getDate()+days);
            var month = d.getMonth()+1;
            var day = d.getDate();
            if(month<10) {
                month="0"+month;
            }
            if(day<10) {
                day="0"+day;
            }
            var val = d.getFullYear()+"-"+month+"-"+day;
            return val;
        }


        find(pageNo,pageSize);

        $("#search").click(function () {
            find(pageNo,pageSize);
        })
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
        //查找交易明细列表
        
        var data = {
            "pageNumber":pageNo,
            "pageSize": pageSize,
            "name": $("#name").val(),
            "phone": $("#phone").val(),
			"area" : $("#area").val()
        };
       data = JSON.stringify(data);
        
        $.post({
            url: url + "/api/admin/patient/list",
            data: data,
            method:"POST",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {

                if (res.retCode == 0) {
                    getPageList(res.data.totalSize,pageNo,pageSize)
                    $(".tableContent tbody").empty();
                    if (res.data.list.length > 0) {
                        for (var i = 0; i < res.data.list.length; i++) {
                            var content = res.data.list[i];
                            var num=i+1
                            var tr = "";
                            tr+="<tr>";
                            /*tr+="<td  class=''>" + num + "</td>";*/
                            tr+="<td  hidden='true' class='id'>" + content.id + "</td>";
							tr+="<td  class=''>" + content.name + "</td>";
							tr+="<td  class=''>" + content.sex + "</td>";
                            tr+="<td  class=''>" + content.age + "</td>";
                            tr+="<td  class=''>" + content.phone + "</td>";
                            tr+="<td  class=''>" + content.tips + "</td>";
                            tr+="<td  class=''>" + content.area + "</td>";
                            tr+="<td  class=''>" + content.source + "</td>";
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

