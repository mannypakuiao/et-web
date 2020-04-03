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
                "title": $("select[name='hzType']").val()
            };
			console.log(data)
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/management/selAll",
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
                            for (var i = 0; i < res.data.list[0].list.length; i++) {
                                var content = res.data.list[0].list[i];
								var types = '';
								if(content.interfactype == 1){
									types = '门诊'
								}
								if(content.interfactype == 2){
									types = '住院'
								}
								if(content.interfactype == 3){
									types = '结算'
								}
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='docName'>" + content.servicename + "</td>" +
                                    "<td  class='docTitle'>" + content.descr + "</td>" +
                                    "<td  class='docTel'>" + content.interfacname + "</td>" +
                                    "<td  class='docTel'>" + content.requestType + "</td>" +
									"<td  class='docTel'>" + types + "</td>" +
                                    "<td  class='docTel'><a href='#' class='djj'>点击查看</a></td>" +
                                    "<td  class='deptName'>" + formatDateTime(content.starTime)+ "</td>" +
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
                                    title: "修改接口",
                                    area: ['550px', '390px'],
                                    content: 'serviceAdd.html'  ,
                                    end:function () {
                                        $('#search').trigger('click');
                                    },
									cancel:function(){
										localStorage.setItem("content", '')
									}
                                });

                            })
                            //详情
                            $(".djj").click(function () {
                            /*    var id = $(this).parents("tr").find(".id").text();
                                alert(id)
                                location.href="details.html"*/
                                var id = $(this).parents("tr").find(".id").text();
                                sessionStorage.setItem("imId",id)
                                location.href="details.html";
                            });

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
                                            url: url + "/api/admin/management/del/" + id,
                                            dataType: "json",
                                            method:'GET',
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
                title: "添加接口",
                area: ['550px', '390px'],
                content: 'serviceAdd.html',
                end:function () {
                    $('#search').trigger('click');
                },
				cancel:function(){
					localStorage.setItem("content", '')
				}	
            });
        })

        var obj=sessionStorage.getItem("content");
        var id="";

        if(obj==null || obj==""){
           
        }else{
            var json=JSON.parse(obj);
            $("#id").val(json.id);
			$("#docName").val(json.servicename);
            $("#docTitle").val(json.descr);
            $("#deptId").val(json.interfacname);
            $("#requestType").val(json.requestType)
            id=json.id;

        }
 
        //保存
        $("#save").click(function(){
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var data = {
                "id": id,
                "serviceName": $("input[name='docName']").val(),//服务名
                "descr": $("input[name='docTitle']").val(),//描述
                "interfacName":$("input[name='deptId']").val(),//接口名
                "requestType": $("input[name='requestType']").val(),   //请求类型
            };
            if(data.id !== "" || data.id !== null){

            }
            if(data.serviceName==""){
                layer.msg("服务名不能为空", {
                    time: 1000
                });
                return false;
            }
            if(data.desc==""){
                layer.msg("描述不能为空", {
                    time: 1000
                });
                return false;
            }
            if(data.interfacName==""){
                layer.msg("接口名不能为空", {
                    time: 1000
                });
                return false;
            }
            data = JSON.stringify(data);
            var loading = layer.load(2);
            $.post({
                url: url + "/api/admin/management/add",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    if(res.retCode == 0) {
                        layer.msg('操作成功', {
                            time: 1000,
                            end:function(){
                            }
                        });
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 500);
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                    layer.close(loading)
                }
            });
        })

    });
});