//JavaScript代码区域
$(function(){
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#crtDateBeg',
            type: 'datetime'

        });
        laydate.render({
            elem: '#crtDateEnd',
            type: 'datetime',
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
        find();
        $("#search").click(function () {
            find();
        });
        function find(){
            var loding=layer.load(2)
            var data={
                "starTime":$("#crtDateBeg").val(),
                "endTime":$("#crtDateEnd").val()
            }
            data=JSON.stringify(data);
            $.post({
                url:url+"/api/payment/statistics",
                data:data,
                method:"POST",
                async:true,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success:function (res) {
                    console.log(res)
                    if (res.retCode==0){
                        /************交易渲染***************/
                        $("#head").empty();
                        $("#head").append("     <li class=\"jiaoyi_li\" style=\"background:#06a180\">\n" +
                            "                <div class=\"imgs\"><img src=\"../images/022.png\"></div>\n" +
                            "                <div class=\"jiaoyi_left\">\n" +
                            "                    <div class=\"jiaoyi_num\"><span id=\"xcxMoney\">"+res.data.xcx[0].count+"</span></div>\n" +
                            "                    <div class=\"jiaoyi_title\">小程序交易笔数</div>\n" +
                            "                </div>\n" +
                            "            </li>\n" +
                            "            <li class=\"jiaoyi_li\" style=\"background:#f65260\">\n" +
                            "                <div class=\"imgs\"><img src=\"../images/023.png\"></div>\n" +
                            "                <div class=\"jiaoyi_left\">\n" +
                            "                    <div class=\"jiaoyi_num\"><span id=\"xcx\">"+res.data.xcx[0].money+"</span></div>\n" +
                            "                    <div class=\"jiaoyi_title\">小程序交易金额</div>\n" +
                            "                </div>\n" +
                            "            </li>\n"
                     /*       "            <li class=\"jiaoyi_li\" style=\"background: #028ac5\">\n" +
                            "                <div class=\"imgs\"><img src=\"../images/024.png\"></div>\n" +
                            "                <div class=\"jiaoyi_left\">\n" +
                            "                    <div class=\"jiaoyi_num\"><span id=\"zzj\">"+res.data.zzj[0].count+"</span></div>\n" +
                            "                    <div class=\"jiaoyi_title\">自助机交易笔数</div>\n" +
                            "                </div>\n" +
                            "            </li>\n" +
                            "            <li class=\"jiaoyi_li\" style=\"background:#f65260 \">\n" +
                            "                <div class=\"imgs\"><img src=\"../images/026.png\"></div>\n" +
                            "                <div class=\"jiaoyi_left\">\n" +
                            "                    <div class=\"jiaoyi_num\"><span id=\"zzjMoney\">"+res.data.zzj[0].money+"</span></div>\n" +
                            "                    <div class=\"jiaoyi_title\">自助机交易金额</div>\n" +
                            "                </div>\n" +
                            "            </li>"*/)
                        var xcx=res.data.listxcxfw;
                 /*       var zzj=res.data.listzzjfw;*/
                        var dateTime=res.data.dateTime;
                        var count1=new Array();
                        var count2=new Array();
                        var time1=new Array();
                        var time2=new Array();
                        var count11=new Array();
                        var count22=new Array();
                        for (var i=0;i<xcx.length;i++){
                            count1[i]=xcx[i].money;
                            count11[i]=xcx[i].count;
                            time1[i]=xcx[i].time;
                        }
                      /*  for (i=0;i<zzj.length;i++){
                            count2[i]=zzj[i].money;
                            count22[i]=zzj[i].count;
                            time2[i]=zzj[i].time;
                        }*/
                        /***************交易额渲染end***************/
                        /*                 var time=new Array();
                                         for (i=0;i<res.data.timeList.length;i++){
                                             time[i]=res.data.timeList[i];
                                         }
                                         var count1=new Array();
                                         var count2=new Array();
                                         for (j=0;j<res.data.xcxDay.length;j++){
                                             count1[j]=res.data.xcxDay[j][0].money;
                                             count2[j]=res.data.zzjDay[j][0].money;
                                         }
                                         /!** ***********曲线图渲染结束***************************!/
                                         var count11=new Array();
                                         var count22=new Array();
                                         for (j=0;j<res.data.xcxDay.length;j++){
                                             count11[j]=res.data.xcxDayCount[j][0].count;
                                             count22[j]=res.data.zzjDayCount[j][0].count;
                                         }*/
                        /*******************交易笔数渲染end***********************/

                        var chart = Highcharts.chart('container', {
                            title: {
                                text: dateTime+'交易额统计'
                            },
                            credits: {
                                enabled:false
                            },
                            colors: ['#058DC7', '#50B432', '#f8a427'],
                            yAxis: {
                                title: {
                                    text: '交易金额（元）'
                                }
                            },
                            xAxis: {
                                categories:time1
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },
                            series: [{
                                name: '小程序交易额',
                                data:count1
                            }/*,{
                                name: '自助机交易额',
                                data:count2
                            }*/],
                            responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                            layout: 'horizontal',
                                            align: 'center',
                                            verticalAlign: 'bottom'
                                        }
                                    }
                                }]
                            }
                        });
                        var chart2 = Highcharts.chart('container2', {
                            title: {
                                text: dateTime+'交易笔数统计'
                            },
                            credits: {
                                enabled:false
                            },
                            colors: ['#058DC7', '#50B432', '#f8a427'],
                            yAxis: {
                                title: {
                                    text: '交易笔数（笔）'
                                }
                            },
                            xAxis: {
                                categories:time1
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },
                            series: [{
                                name: '小程序交易笔数',
                                data:count11
                            }/*,{
                                name: '自助机交易笔数',
                                data:count22
                            }*/],
                            responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                            layout: 'horizontal',
                                            align: 'center',
                                            verticalAlign: 'bottom'
                                        }
                                    }
                                }]
                            }
                        });
                        layer.close(loding)
                    }
                },error:function (res) {
                    console.log(res)
                    alert("错误")
                    layer.close(loding)
                }
            });

        }
    });
});
