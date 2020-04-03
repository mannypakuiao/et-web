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
        };
        data = JSON.stringify(data);
        console.log(data)
        $.post({
            url: url + "/api/admin/jieban/list",
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
                            tr+="<td hidden='true' class='num'>" + i + "</td>"
                            tr+="<td hidden='true' class='id'>" + content.id + "</td>"
                            tr+="<td  class='tradeNo'>" + num + "</td>"
                            tr+="<td  class='tradeNo'>" + content.orderNo + "</td>"
                            tr+="<td  class='tradeNo'>" + content.jbUser + "</td>"
                            tr+="<td  class='payAmt'>" + formatDateTime(content.addTime) + "</td>"
                            tr+="<td  class='payAmt'>" + formatDateTime(content.startTime) + "</td>"
                            tr+="<td  class='payAmt'>"+formatDateTime(content.endTime)+"</td>"
                            var isSK="";
                            if(content.isSK=="0"){
                                isSK="未收"
                            }
                            if(content.isSK=="1"){
                                isSK="已收"
                            }
                            var skUser="";
                            if(content.skUser == null){
                                skUser="";
                            } else {
								skUser = content.skUser;
							}
							
                            tr+="<td  class='payAmt'>" + isSK + "</td>"
                            tr+="<td  class='payAmt'>" + skUser + "</td>"
                            tr+="<td  class='payAmt'>"+formatDateTime(content.skTime)+"</td>"
                            if(content.isSK=="0"){
                                tr+="<td  class='del'>" +
                                        // "<p style='cursor: pointer;' class='personState shoukuan'>收款</p>&nbsp;&nbsp;&nbsp;&nbsp;" +
                                        "<p style='cursor: pointer;' class='personState delete'>删除</p>"
								tr += "&nbsp;&nbsp;&nbsp;";
								tr+= "<p style='cursor: pointer;marginLeft='5px;' class='personState sk'>收款</p>"
                            }
                            if(content.isSK=="1"){
                                tr+="<td  class='del'>已收款"
                            }
                            tr+="<br>";
                            tr+="<a class='detail' href='javascript:;'>详情</a>"
                            tr+="</td></tr>";
                            $(".tableContent tbody").append(tr);
                        }
                        $("#num").val(pageNo);
                        //删除
                        $(".delete").click(function() {
                            var id = $(this).parents("tr").find(".id").text();
                            var tr = $(this).parents("tr");
                            layer.open({
                                type: 1,
                                content: '确认删除吗' ,
                                area: ['250px', '140px'],
                                skin: 'layui-layer-molv',
                                shade: 0,
                                title :'温馨提示',
                                btn: ['删除'],
                                yes: function(index, layero){

                                    $.post({
                                        url: url + "/api/admin/jieban/del/"+id,
                                        dataType: "json",
                                        contentType: 'application/json;charset=UTF-8',
                                        success: function(res) {
                                            if(res.retCode == 0) {
                                                layer.msg('删除成功', {
                                                    time: 1000
                                                });
                                                tr.remove();
                                                layer.close(index);
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
                        //详情
                        $(".detail").click(function () {
                            var id = $(this).parents("tr").find(".id").text();
							var tr = $(this).parents("tr");
                            layer.open({
                                type: 2,
                                title: " ",
                                area: ['800px', '90%'],
                                content: 'jiebanDetail.html?id='+id,
                            });
                        })
						
						
						$(".sk").click(function() {
							var id = $(this).parents("tr").find(".id").text();
							var tr = $(this).parents("tr");
							
							var data = {
								"username":sessionStorage.getItem("name")
							};
							data = JSON.stringify(data);
							layer.confirm("确认收款?", {btn: ['确定', '取消'], title: "提示"}, function () {
								$.post({
									url: url + "/api/admin/jieban/sk/"+id,
									dataType: "json",
									contentType: 'application/json;charset=UTF-8',
									data:data,
									success: function(res) {
										if(res.retCode == 0) {
											layer.msg('收款成功', {
												time: 1000
											});
											//tr.remove();
											//layer.close(index);
										} else {
											layer.msg(res.retMsg, {
												time: 1000
											});
										}
										find(pageNo,pageSize);
									}
								});
								
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
        })
        }

        //添加
        $("#add").click(function(){
            $("#yue").css("display","none");
            layer.open({
                type: 2,
                title: "结班",
                area: ['500px', '500px'],
                content: 'jiebanAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
    });
});

