$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {

        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var pageNo=1;
        var pageSize=10;
        laydate.render({
            elem: '#crtDateBeg',
            type: 'datetime'

        });
        laydate.render({
            elem: '#crtDateEnd',
            type: 'datetime',
            ready: function(date){
                this.dateTime.hours=23;
                this.dateTime.minutes=59;
                this.dateTime.seconds=59;
            }
        });
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

        $('#crtDateBeg').val(addDate(-new Date().getDate()+1)+" 00:00:00");
        $('#crtDateEnd').val(addDate(0)+" 23:59:59")

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
        var loading = layer.load(2);
        var data = {
            "pageNumber":pageNo,
            "pageSize": pageSize,
            "crtDateBeg": $("#crtDateBeg").val(),
            "crtDateEnd": $("#crtDateEnd").val(),
			"payPlatform" : $("#payPlatform").val()
        };
        data = JSON.stringify(data);
        console.log(data)
        $.post({
            url: url + "/api/admin/zhifu/list",
            data: data,
            method:"POST",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                console.log(res)
                layer.close(loading);
                if (res.retCode == 0) {
                    getPageList(res.data.totalSize,pageNo,pageSize)
                    $(".tableContent tbody").empty();
                    if (res.data.list.length > 0) {
                        for (var i = 0; i < res.data.list.length; i++) {
                            var content = res.data.list[i];
                            var num=i+1
                            var tr = "";
                            tr+="<tr>";
                            tr+="<td  class='tradeNo'>" + num + "</td>";
                            tr+="<td  hidden='true' class='id'>" + content.id + "</td>";
							
							
							if(content.payPlatform == "1") 
								tr+="<td  class='tradeNo'>" + "微信" + "</td>";
							else if(content.payPlatform == "2") 
								tr+="<td  class='tradeNo'>" + "支付宝" + "</td>";
							else tr+="<td  class='tradeNo'>" + "其它" + "</td>";
                            
							
							if(content.payType == 1) tr+="<td  class='tradeNo'>" + "门诊" + "</td>";
							else if(content.payType == 1) tr+="<td  class='tradeNo'>" + "住院" + "</td>";
							else if(content.payType == 1) tr+="<td  class='tradeNo'>" + "医保" + "</td>";
							else if(content.payType == 1) tr+="<td  class='tradeNo'>" + "农合" + "</td>";
							else if(content.payType == 1) tr+="<td  class='tradeNo'>" + "其它" + "</td>";
							
							tr+="<td  class='tradeNo'>" + content.cardNo + "</td>";
							tr+="<td  class='tradeNo'>" + content.totalFree + "</td>";
                            tr+="<td  class='tradeNo'>" + content.body + "</td>";
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
		
		$.post({
            url: url + "/api/admin/zhifu/statistics",
            data: data,
            method:"POST",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                console.log(res)
                layer.close(loading);
			
                $("#wxNum").html(res.data.count + " 笔");
				if(res.data.total == null) res.data.total = "0";
				$("#wxPay").html(res.data.total + " 元");
				
				$("#zfbNum").html(res.data.count2 + " 笔");
				if(res.data.total2 == null) res.data.total2 = "0";
				$("#zfbPay").html(res.data.total2 + " 元");
				
				$("#totalOrder").html((res.data.count2 + res.data.count) + " 笔");
				if(res.data.total == null) res.data.total = 0;
				if(res.data.total2 == null) res.data.total2 = 0;
				
				var v = parseFloat(res.data.total2 + res.data.total);
				$("#totalMoney").html(Math.round(v*100)/100 + " 元");
				
            }
        });
		
		
		
		
		
		
		
        }

        
    });
});

