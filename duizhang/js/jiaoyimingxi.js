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
        $("#month").css("color","#FFB800")
        $('#crtDateBeg').val(addDate(-new Date().getDate()+1)+" 00:00:00");
        $('#crtDateEnd').val(addDate(0)+" 23:59:59")
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
        $("#yesterday").click(function() {
            $("#today").css("color","")
            $("#week").css("color","")
            $("#month").css("color","")
            $(this).css("color","#FFB800")
            $('#crtDateBeg').val(addDate(-1)+" 00:00:00");
            $('#crtDateEnd').val(addDate(-1)+" 23:59:59")
        });
        $("#today").click(function() {
            $("#yesterday").css("color","")
            $("#week").css("color","")
            $("#month").css("color","")
            $(this).css("color","#FFB800")
            $('#crtDateBeg').val(addDate(0)+" 00:00:00");
            $('#crtDateEnd').val(addDate(0)+" 23:59:59");
        });
        $("#week").click(function() {
            $("#yesterday").css("color","")
            $("#today").css("color","")
            $("#month").css("color","")
            $(this).css("color","#FFB800")
            $('#crtDateBeg').val(addDate(-new Date().getDay()+1)+" 00:00:00");
            $('#crtDateEnd').val(addDate(0)+" 23:59:59");
        });
        $("#month").click(function() {
            $("#yesterday").css("color","")
            $("#today").css("color","")
            $("#week").css("color","")
            $(this).css("color","#FFB800")
            $('#crtDateBeg').val(addDate(-new Date().getDate()+1)+" 00:00:00");
            $('#crtDateEnd').val(addDate(0)+" 23:59:59")
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
            //查找交易明细列表
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize": pageSize,
                "orderNo": $("input[name='orderNo']").val(),
                "productName": $("select[name='productName']").val(),
                "payType": $("select[name='comment']").val(),
                "cardNo": $("input[name='cardNo']").val(),
                "inOrderNo": $("input[name='inOrderNo']").val(),
                "hisNo": $("input[name='hisNo']").val(),
                "crtDateBeg": $("#crtDateBeg").val(),
                "crtDateEnd": $("#crtDateEnd").val()
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/payment/paymentList",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    console.log(res)
                    layer.close(loading);
                    if (res.retCode == 0) {
                        getPageList(res.data.totalSize,pageNo,pageSize)
                        totalMoney = res.data.list[0].totalMoney;
                        refundMoney = res.data.list[0].refundMoney;
                        totalOrder = res.data.list[0].totalOrder;
                        refundOrder =res.data.list[0].refundOrder;
                        var r1,r2,m,n;
                        try{r1=totalMoney.toString().split(".")[1].length}catch(e){r1=0}
                        try{r2=refundMoney.toString().split(".")[1].length}catch(e){r2=0}
                        m=Math.pow(10,Math.max(r1,r2));
                        n=(r1>=r2)?r1:r2;
                        var incomeMoney=((totalMoney*m-refundMoney*m)/m).toFixed(n);
                        // var incomeMoney=(totalMoney-refundMoney);
                        var incomeOrder=totalOrder-refundOrder;
                        $("#total").text(totalMoney+"  元");
                        $("#refund").text(refundMoney+"  元");
                        $("#income").text(incomeMoney+"  元");
                        $("#totalOrder").text(totalOrder+"  笔");
                        $("#refundOrder").text(refundOrder+"  笔");
                        $("#incomeOrder").text(incomeOrder+"  笔");
                        $(".tableContent tbody").empty();
                        if (res.data.list[0].list.length > 0) {
                            for (var i = 0; i < res.data.list[0].list.length; i++) {
                                var content = res.data.list[0].list[i];
                                if(content.type==0){
                                    content.cardNo=content.cardNo1;
                                    content.cardName=content.cardName1;
                                }else if(content.type==1){
                                    content.cardNo=content.cardNo2;
                                    content.cardName=content.cardName2;
                                }else if(content.type==2){
                                    content.cardNo=content.cardNo3;
                                    content.cardName=content.cardName3;
                                }else if(content.type==null){
                                    content.cardNo="";
                                }
                                if(content.cardName==null){
                                    content.cardName="";
                                }
                                if(content.inOrderNo==null){
                                    content.inOrderNo="";
                                }
                                var str="";
                                if(content.ifComment=="0"){
                                    str="支付成功";
                                }else {
                                    str="完成退款";
                                }
                                if(content.hisNo==null){
                                    content.hisNo="";
                                }
                                var tr = "";

                                if(content.ifComment=="1"){
                                    tr+="<tr style='color: red'>";
                                }else {
                                    tr+="<tr>";
                                }
                                tr+="<td hidden='true' class='num'>" + i + "</td>"
                                tr+="<td hidden='true' class='id'>" + content.id + "</td>"
                                tr+="<td  class='createdTime'>" + formatDateTime(content.createdTime) + "</td>"
                                tr+="<td  class='tradeNo'>" + content.tradeNo + "</td>"
                                tr+="<td  class='payAmt'>" + content.payAmt + "</td>"
                                tr+="<td  class='paymentWayName'>" + content.paymentWayName + "</td>"
                                tr+="<td  class='cardNo'>" + content.cardNo + "</td>"
                                tr+="<td  class='cardName'>" + content.cardName + "</td>"
                                tr+="<td  class='productName'>" + content.productName+ "</td>"
                                tr+="<td  class='inOrderNo'>" + content.inOrderNo+ "</td>"

                                if(content.exceptionOrder=="1"&&content.ifComment=="0"){
                                    tr+="<td  class='del'><p style='cursor: pointer;' class='personState refund'>退款</p></td>"
                                }else {
                                    tr+="<td  class='comment'>" + str+ "</td>" ;
                                }

                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                            $(".refund").click(function() {
                                var id = $(this).parents("tr").find(".id").text();
                                layer.open({
                                    type: 1,
                                    content: '确认退款吗' ,
                                    area: ['250px', '140px'],
                                    skin: 'layui-layer-molv',
                                    shade: 0,
                                    title :'温馨提示',
                                    btn: ['确定'],
                                    yes: function(index, layero){
                                        var load = layer.load(2);
                                        $.post({
                                            url: url + "/api/payment//updDetailed/"+id,
                                            dataType: "json",
                                            data: content,
                                            contentType: 'application/json;charset=UTF-8',
                                            success: function(res) {
                                                layer.close(index);
                                                layer.close(load);
                                                if(res.retCode == 0) {
                                                    layer.msg('退款成功', {
                                                        time: 1000
                                                    });
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

function refund(id){

	$.post({
                url: url + "/api/payment//updDetailed",
                data: {'id':id},
                method:"POST",
                dataType: "json",
                //contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    console.log(res)
                    if (res.retCode == 0) {
                       alert("退款成功");
                    } else {
                       alert("退款失败");
                    }
                },error:function () {
                    console.log("erro")
                }
            });
}