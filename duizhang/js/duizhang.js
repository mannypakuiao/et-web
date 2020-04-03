$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var pageNo=1;
        var pageSize=10;
        laydate.render({
            elem: '#crtDateBeg',
            type: 'date'

        });
        laydate.render({
            elem: '#crtDateEnd',
            type: 'date',
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
            $('#crtDateBeg').val(addDate(-1));
            $('#crtDateEnd').val(addDate(-1))
        });
        $("#today").click(function() {
            $("#yesterday").css("color","")
            $("#week").css("color","")
            $("#month").css("color","")
            $(this).css("color","#FFB800")
            $('#crtDateBeg').val(addDate(0));
            $('#crtDateEnd').val(addDate(0));
        });
        $("#week").click(function() {
            $("#yesterday").css("color","")
            $("#today").css("color","")
            $("#month").css("color","")
            $(this).css("color","#FFB800")
            $('#crtDateBeg').val(addDate(-new Date().getDay()+1));
            $('#crtDateEnd').val(addDate(0));
        });
        $("#month").click(function() {
            $("#yesterday").css("color","")
            $("#today").css("color","")
            $("#week").css("color","")
            $(this).css("color","#FFB800")
            $('#crtDateBeg').val(addDate(-new Date().getDate()+1));
            $('#crtDateEnd').val(addDate(0))
        });
        $("#search").click(function() {
            find(pageNo,pageSize);
        });
        $("#search").trigger("click");
        function getPageList(totalSize,pageNo,pageSize){
            //完整功能
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
                "pageSize": pageSize,
                "crtDateBeg": $("#crtDateBeg").val(),
                "crtDateEnd": $("#crtDateEnd").val()
            };
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/payment/duizhangList",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    console.log(res)
                    layer.close(loading);
                    if (res.retCode == 0) {
                        getPageList(res.data.totalSize,pageNo,pageSize)
                        var wxTotalMoney = res.data.list[0].wxTotalMoney.toFixed(2);
                        var exceptionMoney = res.data.list[0].exceptionMoney.toFixed(2);
                        var hisTotalMoney = res.data.list[0].hisTotalMoney.toFixed(2);
                        $("#wxTotalMoney").text(wxTotalMoney+"  元");
                        $("#exceptionMoney").text(exceptionMoney+"  元");
                        $("#hisTotalMoney").text(hisTotalMoney+"  元");
                        $(".tableContent tbody").empty();
                        if (res.data.list[0].list.length > 0) {
                            for (var i = 0; i <res.data.list[0].list.length; i++) {
                                var content = res.data.list[0].list[i];
                                var tr="";
                                if(content.exMoney!=0){
                                    tr+="<tr style='color: red'>";
                                }else {
                                    tr+="<tr>";
                                }
                                tr+="<td hidden='true' class='num'>" + i + "</td>"
                                tr+="<td  class='createdTime'>" + formatDate(content.dataTime) + "</td>"
                                tr+="<td  class='tradeNo'>" + content.hisMoney + "</td>"
                                tr+="<td  class='paymentWayName'>" + content.wxMoney + "</td>"
                                tr+="<td  class='cardNo'>" + content.exMoney + "</td>"
                                tr+="<td  class='del'><p style='cursor: pointer;' class='personState btnMain'>查看</p></td>"
                                tr+="</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                            $("#num").val(pageNo);
							  //查看详情
                            $(".btnMain").click(function () {
                                var createTime=$(this).parents("tr").find(".createdTime").text();
                                sessionStorage.setItem("createTimes",createTime);
                                layer.open({
                                    type: 2,
                                    title: "差异明细",
                                    area: ['900px', '500px'],
                                    content: 'chayimingxi.html',
                                });
                            });
                            //end查看详情
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