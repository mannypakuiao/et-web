$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var typeUrl = document.location.toString();
        var arrUrl = typeUrl.split("=");
        var id = arrUrl[1];


        var loading = layer.load(2);
        $.get({
            url: url + "/api/admin/jieban/detail/"+id,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                console.log(res)
                if(res.retCode == 0) {
                    $("#jbUser").val(res.data.vo.jbUser);
                    $("#addTime").val(formatDateTime(res.data.vo.addTime));
                    $("#orderNo").val(res.data.vo.orderNo);
                    $("#skTime").val(formatDateTime(res.data.vo.skTime));
                    $("#isSK").val(res.data.vo.isSK=="0"?'未收款':'已收款');
                    $("#jkk").val(res.data.jkk);
                    $("#gh").val(res.data.gh);
                    $("#qtgh").val(res.data.gh);
                    $("#cz").val(res.data.cz);
                    $("#qt").val(res.data.cz+res.data.gh);
                    $("#total").val(res.data.total);
                    $("#btime").val(formatDateTime(res.data.vo.startTime));
                    $("#etime").val(formatDateTime(res.data.vo.endTime));
                    if (res.data.list.length > 0) {
                        var wx=0.0;
                        var zfb=0.0;
                        var xj=0.0;
                        var yj=0.0;
                        var total=0.0;
                        for (var i = 0; i < res.data.list.length; i++) {
                            var content = res.data.list[i];
                            wx+=content.wx;
                            zfb+=content.zfb;
                            xj+=content.xj;
                            yj+=content.yjj;
                            total+=content.total;
                            var tr = "";
                            tr+="<tr>";
                            tr+="<td hidden='true' class='num'>" + i + "</td>"
                            tr+="<td hidden='true' class='id'>" + content.id + "</td>"
                            tr+="<td  class='payAmt'>"+formatDate(content.time)+"</td>"
                            tr+="<td  class='tradeNo'>" + content.wx + "</td>"
                            tr+="<td  class='payAmt'>" + content.zfb + "</td>"
                            tr+="<td  class='payAmt'>" + content.xj + "</td>"
                            tr+="<td  class='payAmt'>" + content.yjj + "</td>"
                            tr+="<td  class='payAmt'>" + content.total + "</td>"
                            tr+="</tr>";
                            $(".tableContent tbody").append(tr);
                        }
                        $("#wxPay").text(wx.toFixed(2));
                        $("#zfbPay").text(zfb.toFixed(2));
                        $("#xjPay").text(xj.toFixed(2));
                        $("#yujiaoPay").text(yj.toFixed(2));
                        $("#totalMoney").text(total.toFixed(2));
                       $("#save").click(function () {
                           window.print();
                       })
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
                layer.close(loading);
            }
        });

    });
});

