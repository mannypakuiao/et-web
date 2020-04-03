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
            "order_no": $("#order_no").val(),
			"mz_type" : $("#mz_type").val()
        };
       data = JSON.stringify(data);
        
        $.post({
            url: url + "/api/admin/WZOrder/list",
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
							tr+="<td  class=''>" + content.wz_date.substring(0,19).replace("T"," ") + "</td>";
							tr+="<td  class=''>" + content.order_no + "</td>";
							if(content.mz_type == 1) tr+="<td  class=''>" + "普通门诊 " + "</td>";
							if(content.mz_type == 2) tr+="<td  class=''>" + "专家门诊"  + "</td>";
							if(content.mz_type == 3) tr+="<td  class=''>" + "专科门诊"  + "</td>";
                            /*tr+="<td  class=''>" + content.mz_type + "</td>";*/
                            tr+="<td  class=''>" + content.patient_name + "</td>";
                            tr+="<td  class=''>" + content.phone + "</td>";
                            tr+="<td  class=''>" + content.doctor_name + "</td>";
                            tr+="<td  class=''>" + content.dept + "</td>";
                            if(content.order_state == 1) tr+="<td  class=''>" + "待接诊 " + "</td>";
                            if(content.order_state == 2) tr+="<td  class=''>" + "已完成 " + "</td>";
                            if(content.order_state == 3) tr+="<td  class=''>" + "已取消 " + "</td>";
                            /*tr+="<td  class=''>" + content.order_state + "</td>";*/
                            /*tr+="<td  class=''>" + content.evaluate_state + "</td>";*/
                            if(content.evaluate_state == 1) tr+="<td  class=''>" + "未评价 " + "</td>";
                            if(content.evaluate_state == 2) tr+="<td  class=''>" + "已评价 " + "</td>";
                            tr+="<td  class=''>" + content.wz_source + "</td>";
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

