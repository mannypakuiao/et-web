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
			$("#name").val(json.name);
            $("#key").val(json.key);
            $("#addTime").val(json.addTime);
            $("#type").val(json.type);
			
            id=json.id;
        }  

        $("#save").click(function(){
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var data = {
                "id": id,
                "name": $("input[name='name']").val(),//账号
                "key": $("input[name='key']").val(),//key值
                "addTime":$("input[name='addTime']").val(),//创建时间
                "type": $("input[name='type']").val(),   //类型
            };
            if(data.id !== "" || data.id !== null){

            }
            if(data.name==""){
                layer.msg("账号名不能为空", {
                    time: 1000
                });
                return false;
            }
			console.log(data)
            data = JSON.stringify(data);
            var loading = layer.load(2);
            $.post({
                url: url +"/service/InterfaceFrom/saveAccount",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
                    console.log(res)
                    if(res.retCode == 0) {
                        layer.msg('操作成功', {
                            time: 1000,
                            end:function () {
                           
                            }
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
