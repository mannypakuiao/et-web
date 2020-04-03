//JavaScript代码区域
$(function(){
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var laydate = layui.laydate;
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
        find();
        $("#search").click(function () {
            find();
        });
        function find() {
            var loding=layer.load(2)
            var data={
                "starTime":$("#crtDateBeg").val(),
                "endTime":$("#crtDateEnd").val()
            }
            data=JSON.stringify(data);
            $.get({
                url:url+"/service/InterfaceCall/selAll",
                data:data,
                method:"POST",
                async:true,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success:function (res) {
                    if (res.retCode==0){
                        console.log(res)
                        /************交易渲染***************/
                        $("#head").empty();
                        $("#head").append("     <li class=\"jiaoyi_li\" style=\"background:#06a180;margin-left: 17.5%\">\n" +
                            "                <div class=\"imgs\"><img src=\"../images/022.png\"></div>\n" +
                            "                <div class=\"jiaoyi_left\">\n" +
                            "                    <div class=\"jiaoyi_num\"><span id=\"xcx\"></span></div>\n" +
                            "                    <div class=\"jiaoyi_title\">小程序调用总数</div>\n" +
                            "                </div>\n" +
                            "            </li>\n" +
                            "            <li class=\"jiaoyi_li\" style=\"background: #c2c6c7;margin-left: 17.5%\">\n" +
                            "                <div class=\"imgs\"><img src=\"../images/024.png\"></div>\n" +
                            "                <div class=\"jiaoyi_left\">\n" +
                            "                    <div class=\"jiaoyi_num\"><span id=\"zzj\"></span></div>\n" +
                            "                    <div class=\"jiaoyi_title\">自助机调用总数</div>\n" +
                            "                </div>\n" +
                            "            </li>")
                        var xcx=res.data.xcx[0];
                        var zzj=res.data.zzj[0];
                        $("#xcx").text(xcx.count+"次")
                        $("#zzj").text(zzj.count+"次")
                        /***************交易渲染end***************/
                        var time=new Array();
                        var content=new Array();
                        var callCount=res.data.callCount;
                        for (i=0;i<callCount.length;i++){
                            time[i]=callCount[i].time;
                            content[i]=callCount[i].count;
                        }
                        /** ***********曲线图渲染结束***************************/
                        var countzz=new Array();
                        var countxcx=new Array();
                        var xcxDay=res.data.xcxDay;
                        var zzjDay=res.data.zzjDay;
                        for (k=0;k<xcxDay.length;k++){
                            countxcx[k]=xcxDay[k].count
                        }
                        for (q=0;q<zzjDay.length;q++){
                            countzz[q]=zzjDay[q].count
                        }
                        /*******************柱状图渲染结束*********************/
                        var contentTop=res.data.listTop;
                        var topcount=0;
                        for (j=0;j<contentTop.length;j++){
                            topcount=topcount+contentTop[j].count;
                        }
                        var contentCount=res.data.listCount[0].count;
                        var countTop=new Array();
                        var da={
                            name: '其他',
                            y: contentCount-topcount,
                            sliced: true,
                            selected: true
                        }
                        countTop[0]=da
                        for (i=0;i<contentTop.length;i++){
                            var data={
                                name: contentTop[i].interfaceName,
                                y:contentTop[i].count
                            }
                            countTop[i+1]=data;
                        }
                        var dateTime=res.data.dateTime;
                        var chart = Highcharts.chart('container', {
                            title: {
                                text: dateTime+"访问统计"
                            },
                            credits: {
                                enabled:false
                            },
                            colors: ['#058DC7', '#50B432', '#f8a427'],
                            yAxis: {
                                title: {
                                    text: '访问统计（次）'
                                }
                            },
                            xAxis: {
                                categories:time
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },
                            series: [{
                                name: '接口访问量',
                                data:content
                            }],
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
                        var chart2 = Highcharts.chart('container2',{
                            chart: {
                                type: 'column'
                            }, credits: {
                                enabled:false
                            },
                            title: {
                                text: dateTime+'访问统计'
                            },
                            xAxis: {
                                categories:time,
                                crosshair: true
                            },
                            yAxis: {
                                allowDecimals:false,
                                min: 0,
                                title: {
                                    text: '访问统计（次）'
                                }
                            },
                            tooltip: {
                                // head + 每个 point + footer 拼接成完整的 table
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y} 次</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    borderWidth: 0
                                }
                            },
                            series: [{
                                name: '小程序',
                                data: countxcx
                            }, {
                                name: '自助机',
                                data: countzz
                            }]/*, {
                            name: '伦敦',
                            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0,]
                        }, {
                            name: '柏林',
                            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4,]
                        }]*/
                        });
                        var chart3 =Highcharts.chart('container3', {
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            credits: {
                                enabled:false
                            },
                            title: {
                                text:dateTime+'接口调用份额'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                            },
                            series: [{
                                name: 'Brands',
                                colorByPoint: true,
                                data:countTop /*[{
                                name: 'Chrome',
                                y: 61.41,
                                sliced: true,
                                selected: true
                            }, {
                                name: 'Internet Explorer',
                                y: 11.84
                            }, {
                                name: 'Firefox',
                                y: 10.85
                            }, {
                                name: 'Edge',
                                y: 4.67
                            }, {
                                name: 'Safari',
                                y: 4.18
                            }, {
                                name: 'Sogou Explorer',
                                y: 1.64
                            }, {
                                name: 'Opera',
                                y: 1.6
                            }, {
                                name: 'QQ',
                                y: 1.2
                            }, {
                                name: 'Other',
                                y: 2.61
                            }]*/
                            }]
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
