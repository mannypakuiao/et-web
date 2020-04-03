$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
		var form = layui.form;
		form.render()
        var pageNo=1;
        var pageSize=10;
        laydate.render({
            elem: '#buyDay',
            range: true
        });
        laydate.render({
            elem: '#inDay',
            range: true
        });
        laydate.render({
            elem: '#outDay',
            range: true
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
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize,
                "title": $("select[name='menuSystem']").val()
            };
			console.log(data)
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/system/menu/getMenuAll",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function (res) {
                    console.log(res);
                    layer.close(loading);
                    if (res.retCode == 0) {
                         if (res.data.list[0].list.length > 0) {
                            getPageList(res.data.totalSize,pageNo,pageSize)   
                            $(".tableContent tbody").empty();

                            var parentIdArray = [];
                            var idArray = [];

                            for (var i = 0; i < res.data.list[0].list.length; i++) {
                                var content = res.data.list[0].list[i];
                                var types = '';
                                var parent = '';
								if(content.menuSystem == 1){
									types = '统一支付对账平台'
								}
								if(content.menuSystem == 2){
									types = '互联网统一接口'
								}
								if(content.menuSystem == 3){
									types = '健康宣教平台'
                                }
                                if(content.menuSystem == 4){
									types = '互联网医院平台'
								}
								if(content.menuSystem == 5){
									types = '掌上医院'
								}
								if(content.menuSystem == 6){
									types = '系统设置'
                                }
                                
                                console.log(content.o)
								if(content.o == null){
									parent = '无'
								}else{ 
                                    parent = content.o
                                }
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='docName'>" + content.n + "</td>" +
                                    // "<td  class='docTitle'>" + types + "</td>" +
                                    "<td  class='docTel'>" + parent + "</td>" +
                                    "<td  class='docTel'>" + content.request + "</td>" +
                                    "<td  class='docTel'>" + content.sortNo + "</td>" +
                                    // "<td  class='docTel'>" + content.icon + "</td>" +
                                    "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                        
                            
                            
                            $("#num").val(pageNo);

                            //修改
                            $(".btnMain").click(function () {
                                var num = $(this).parents("tr").find(".num").text();
								localStorage.setItem("content", JSON.stringify( res.data.list[0].list[num]))
                                console.log(localStorage.getItem("content"))
                                layer.open({
                                    type: 2,
                                    title: "修改菜单接口",
                                    area: ['550px', '400px'],
                                    content: 'menuAdd.html'  ,
                                    end:function () {
                                        $('#search').trigger('click');
                                    },
									cancel:function(){
										localStorage.setItem("content", '')
									}
                                });

                            })
                          
                            //删除
                            $(".delete").click(function () {
                                var id = $(this).parents("tr").find(".id").text();
                                sessionStorage.setItem("id", id);
                                $("#delete").attr("disabled", 'disabled');
                                setTimeout(function () {
                                    $("#delete").attr("disabled", false);
                                }, 2000);
                                var tr = $(this).parents("tr");
                                layer.open({
                                    type: 1,
                                    content: '确认删除吗',
                                    area: ['250px', '140px'],
                                    skin: 'layui-layer-molv',
                                    shade: 0,
                                    title: '提示信息',
                                    btn: ['删除'],
                                    yes: function (index, layero) {
                                        $.post({
                                            url: url + "/api/system/menu/delMenu/" + id,
                                            dataType: "json",
                                            method:'POST',
                                            contentType: 'application/json;charset=UTF-8',
                                            success: function (res) {
                                                if (res.retCode == 0) {
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
                        }
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                }
            });
        }
        //添加
        $("#add").click(function(){
            $("#yue").css("display","none");
            sessionStorage.setItem("content","");
            layer.open({
                type: 2,
                title: "添加菜单接口",
                area: ['550px', '400px'],
                content: 'menuAdd.html',
                end:function () {
                    $('#search').trigger('click');
                },
				cancel:function(){
					localStorage.setItem("content", '')
				}	
            });
        })
    });
});