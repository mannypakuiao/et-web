$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var element = layui.element;
        var table = layui.table;
        var layer = layui.layer;
        var form = layui.form;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var totalPages = 0;
        var userId = sessionStorage.getItem("userId");
        var type="0";
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
        find(1);
        $("#search").click(function() {
            find(1);
        });
        $("#last").click(function() {
            pageNo=$("#num").val();
            if(pageNo>1){
                pageNo--;
                find(pageNo);
            }else{
                layer.msg("已经是第一页", {
                    time: 1000
                });
            }
        });
        $("#next").click(function() {
            pageNo=$("#num").val();
            if(pageNo >= totalPages) {
                layer.msg("已经是最后一页", {
                    time: 1000
                });
            }else{
                pageNo++;
                find(pageNo);
            }
        });
        $("#search").trigger("click")
        function find(pageNo) {
            //查找交易明细列表
            $("#search").attr("disabled", 'disabled');
            setTimeout(function () {
                $("#search").attr("disabled", false);
            }, 2000);
            $("#page").show();
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "addTime":sessionStorage.getItem("createTimes"),
                "orderNo":$("#tradeNo").val(),
                "pageSize":'20'
            };
            data = JSON.stringify(data);
            console.log(data)
            $.post({
                url: url + "/api/payment/selByDetailed",
                method:"POST",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    $(".tableContent tbody").empty();
                    console.log(res)
                    layer.close(loading);
                    if (res.retCode == 0) {
                        console.log(res.data)
                        if (res.data.list.length > 0) {
                            for (var i = 0; i < res.data.list.length; i++) {
                                var content = res.data.list[i];
                                console.log(content)
                                var cardName="";
                                var cardNo="";
                                var ifCommment="";
                                if(content.state=="0"){
                                    cardName=content.chargeCardName;
                                    cardNo=content.chargeCardNo;
                                }
                                if(content.state=="1"){
                                    cardName=content.chargeCardName;
                                    cardNo=content.inOrderNo+"(住院号)";
                                }
                                if(content.cardName!=null){
                                    cardName=content.cardName;
                                }
                                if(content.paymentCardName!=null){
                                    cardName=content.paymentCardName;
                                }
                                if(content.cardNo!=null){
                                    cardNo=content.cardNo;
                                }
                                if(content.paymentCardNo!=null){
                                    cardNo=content.paymentCardNo;
                                }
                                if (content.ifComment=="1"){
                                    ifCommment="完成退款";
                                }else if(content.ifComment=="0"){
                                    ifCommment="未退款";
                                }
                                var tr = "";
                                tr+="<tr></tr><td hidden='true' class='num'>" + i + "</td>"
                                tr+="<td hidden='true' class='id'>" + content.id + "</td>"
                                tr+="<td  class='addTime'>" + formatDateTime(content.createdTime) + "</td>"
                                tr+="<td  class='orderNo'>" + content.tradeNo+ "</td>"
                                tr+="<td  class='orderNo'>" + content.productName+ "</td>"
                                tr+="<td  class='money'>" + content.exceptionMoney  + "</td>"
                                tr+="<td  class='paymentWayName'>" + content.paymentWayName  + "</td>"
                                tr+="<td  class='cardNo'>" + cardNo + "</td>"
                                tr+="<td  class='userName'>" + cardName + "</td>"
                                tr+="<td  class='hisNo'>" + content.hisNo + "</td>"
                                tr+="<td  class='ifCommment'>" + ifCommment + "</td>"
                                tr+="<td  class='del'><p style='cursor: pointer;' class='personState btnMain'>退款</p></td>"
                                tr+="</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
                        }else {
                            layer.msg("暂无数据", {
                                time: 1000
                            });
                        }
                        //退款
                        $(".btnMain").click(function () {
                            //alert("暂未开放");
                            //return false;
                            var id=$(this).parents("tr").find(".id").text();
                            var data={
                                "id":id
                            }
                            data=JSON.stringify(data);
                            layer.open({
                                type: 1,
                                content: '确认退款吗?' ,
                                area: ['250px', '140px'],
                                skin: 'layui-layer-molv',
                                shade: 0,
                                title :'提示信息',
                                btn: ['退款'],
                                yes: function(index){
                                    $.post({
                                        url:url+"/api/payment/updDetailed",
                                        data: data,
                                        method:"POST",
                                        dataType:"json",
                                        contentType:"application/json;charset=UTF-8",
                                        success:function (res) {
                                            console.log(res)
                                            if(res.retCode==0){
                                                layer.msg("退款成功",{
                                                    time:1000
                                                })
                                                layer.close(index);
                                                $("#search").trigger("click")
                                            }else{
                                                layer.msg("退款失败",{
                                                    time:1000
                                                })
                                            }
                                        }

                                    });

                                }})

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