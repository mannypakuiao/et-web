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

        $("#month").css("color","#FFB800")
        $('#crtDateBeg').val(addDate(-new Date().getDate()+1)+" 00:00:00");
        $('#crtDateEnd').val(addDate(0)+" 23:59:59")


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
                "pageNo":pageNo,
                "pageSize": pageSize,
                "payType":$("#payType").val(),
                "payWay":$("#payWay").val(),
                "cardName": $("#cardName").val(),
                "starTime": $("#crtDateBeg").val(),
                "endTime": $("#crtDateEnd").val(),
                "isAbnormal": $("#isAbnormal").val()
            };
            data = JSON.stringify(data);
            console.log(data)
            $.post({
                url: url + "/api/PaymentZizhuji/selZizhu",
                data: data,
                method:"POST",
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    console.log(res)
                    layer.close(loading);
                    if (res.retCode == 0) {
                        getPageList(res.data.list.totalSize,pageNo,pageSize)
                        //总
                        $("#totalMoney").text((res.data.total[0].totalMoney-res.data.yujiao[0].totalMoney).toFixed(2)+"元");
                        $("#totalOrder").text(res.data.total[0].totalNum-res.data.yujiao[0].totalNum+"笔")
                        //微信
                        $("#wxPay").text(res.data.weixin[0].totalMoney+"元");
                        $("#wxNum").text(res.data.weixin[0].totalNum+"笔")
                        //支付宝
                        $("#zfbPay").text(res.data.zfb[0].totalMoney+"元");
                        $("#zfbNum").text(res.data.zfb[0].totalNum+"笔")
                        //银行卡
                        // $("#yhkPay").text(res.data.yhk[0].totalMoney+"元");
                        // $("#yhkNum").text(res.data.yhk[0].totalNum+"笔")
                        //现金
                        $("#xjPay").text(res.data.xj[0].totalMoney+"元");
                        $("#xjNum").text(res.data.xj[0].totalNum+"笔")
                        //预交金
                        $("#yujiaoPay").text(res.data.yujiao[0].totalMoney+"元");
                        $("#yujiaoNum").text(res.data.yujiao[0].totalNum+"笔")

                        $(".tableContent tbody").empty();
                        if (res.data.list.list.length > 0) {
                            for (var i = 0; i < res.data.list.list.length; i++) {

                                var content = res.data.list.list[i];
                                var tr = "";
                                if(content.isAbnormal=="1"){
                                    tr+="<tr style='color: red'>";
                                }else {
                                    tr+="<tr>";
                                }
                                //支付类型  1：现金  2：银行卡  3：支付宝  4：微信 6预交金
                                var payWay="";
                                if(content.payWay==1){
                                    payWay="现金";
                                }
                                if (content.payWay==2){
                                    payWay="银行卡";
                                }
                                if (content.payWay==3){
                                    payWay="支付宝";
                                }
                                if (content.payWay==4){
                                    payWay="微信";
                                }
                                if (content.payWay==6){
                                    payWay="预交金";
                                }
                                var cardType="";
                                if (content.cardType==1){
                                    cardType="就诊卡号";
                                }
                                if (content.cardType==5){
                                    cardType="住院号";
                                }
                                if (content.cardType==2){
                                    cardType="身份证";
                                }

                                //交易类型：0 就诊卡充值 1住院预交 2:门诊缴费
                                var payType="";
                                if (content.payType==0){
                                    payType="就诊卡充值";
                                }
                                if (content.payType==1){
                                    payType="住院充值";
                                }
                                if (content.payType==2){
                                    payType="门诊缴费";
                                }
                                var  orderNo="";
                                if(content.orderNo!=null){
                                    orderNo=content.orderNo
                                }
                                var  bankSelectno="";
                                if(content.bankSelectno!=null){
                                    bankSelectno=content.bankSelectno
                                }
                                tr+="<td hidden='true' class='num'>" + i + "</td>"
                                tr+="<td hidden='true' class='id'>" + content.id + "</td>"
                                tr+="<td  class='createdTime'>" + formatDateTime(content.addTime) + "</td>"
                                tr+="<td  class='tradeNo'>" + orderNo + "</td>"
                                tr+="<td  class='tradeNo'>" + bankSelectno + "</td>"
                                tr+="<td  class='payAmt'>" + content.pay + "</td>"
                                tr+="<td  class='payAmt'>"+payWay+"</td>"
                                tr+="<td  class='payAmt'>" + content.userNo + "</td>"
                                tr+="<td  class='payAmt'>" + content.cardNo + "</td>"
                                tr+="<td  class='payAmt'>" + cardType+ "</td>"
                                tr+="<td  class='payAmt'>" + content.cardName + "</td>"
                                tr+="<td  class='payAmt'>"+payType+"</td>"
                                if(content.isAbnormal=='1' &&content.isRefund=="0" ) {
                                    tr+="<td  class='del'><p style='cursor: pointer;' class='personState refund'>退款</p></td>"
                                }else
                                if(content.isAbnormal=='1' &&content.isRefund=="1" ){
                                    tr+="<td >已退款</td>"
                                }else {
                                    tr+="<td ></td>"
                                }
                                tr+="</tr>";
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
                                            url: url + "/api/PaymentZizhuji/refund/"+id,
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
                                                    $("#search").trigger("click");
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
                },error:function () {
                    console.log("erro")
                }
            });
        }
    });
});
