$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
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
        laydate.render({
            elem: '#createTime'
            ,type: 'date'
        });
        function find(pageNo,pageSize) {
            //查找交易明细列表
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize,
                "orderNo":$("#tradeNo").val(),
                "addTime":$("#createTime").val(),
                "pageSize":'20'
            };
            data = JSON.stringify(data);
            console.log(data)
            $.post({
                url: url + "/api/payment/selAllDetailed",
                method:"POST",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    $(".tableContent tbody").empty();
                    console.log(res)
                    layer.close(loading);
                    if (res.retCode == 0) {
                        getPageList(res.data.totalSize,pageNo,pageSize)
                        if (res.data.list.length > 0) {
                            for (var i = 0; i < res.data.list.length; i++) {
                                var content = res.data.list[i];
                                console.log(content)
                                var cardName="";
                                var cardNo="";
                                var ifCommment="";
                                var tr = "";
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
                                  /*   tr="<tr style='color: red;'"*/
                                }else if(content.ifComment=="0"){
                                    ifCommment="未退款";
                                }

                                tr+="<tr><td hidden='true'  class='num'>" + i + "</td>"
                                /*  tr+="<td hidden='true' class='id'>" + content.id + "</td>"*/
                                tr+="<td  class='addTime'>" + formatDateTime(content.createdTime) + "</td>"
                                tr+="<td  class='orderNo'>" + content.tradeNo+ "</td>"
                                tr+="<td  class='orderNo'>" + content.productName+ "</td>"
                                tr+="<td  class='money'>" + content.exceptionMoney  + "</td>"
                                tr+="<td  class='paymentWayName'>" + content.paymentWayName  + "</td>"
                                tr+="<td  class='cardNo'>" + cardNo + "</td>"
                                tr+="<td  class='userName'>" + cardName + "</td>"
                                tr+="<td  class='userName'>" + ifCommment + "</td>"
                                tr+="</tr>";
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