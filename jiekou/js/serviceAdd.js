$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        //添加保存
		var layer = layui.layer;
		var laydate = layui.laydate;
		var laypage = layui.laypage;
		var form = layui.form;
		
        var obj=localStorage.getItem("content");
        var id="";
		console.log(obj)
        if(obj==null || obj==""){
           
        }else{
            var json=JSON.parse(obj);
            $("#id").val(json.id);
			$("#docName").val(json.servicename);
            $("#docTitle").val(json.descr);
            $("#deptId").val(json.interfacname);
            $("#requestType").val(json.requestType);
			$('#hz_type').val(json.interfactype);
            id=json.id;

        }
 
               
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
				"interfacType": $("select[name='hzType']").val() //接口类型
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
            if(data.requestType==""){
                layer.msg("请求方式不能为空", {
                    time: 1000
                });
                return false;
            }
			console.log(data)
            data = JSON.stringify(data);
            var loading = layer.load(2);
            $.post({
                url: url + "/api/admin/management/add",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    console.log(res)
                    if(res.retCode == 0) {
                        layer.msg('操作成功', {
                            time: 1000
                        });
                        layer.close(loading)
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

        
    })
})
