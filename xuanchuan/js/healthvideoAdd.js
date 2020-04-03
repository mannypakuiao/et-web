//JavaScript代码区域
$(function() {
    layui.use(['form', 'element', "table", 'layer', 'laydate'], function() {
        var layer = layui.layer;
        var laydate = layui.laydate;
        var docId=-1;
        var healthId=-1;
        laydate.render({
            elem: '#dateAll',
            range: true
        });
        var obj=sessionStorage.getItem("content");
        if(obj==null || obj==""){

        }else {
            var json = JSON.parse(obj);
            var isUp = json.isUp;
            var str = "";
            $("#isUp").empty();
            if (isUp == "0" || isUp == null || isUp == "") {
                str = "<option value='0' selected='selected'>公开</option>\n" +
                    " <option value='1'>隐私</option>";
            } else if (isUp = "1") {
                str = "<option value='0'>公开</option>\n" +
                    " <option value='1' selected='selected'>隐私</option>";
            }
            $("#isUp").append(str);
            $("#id").val(json.id);
            $("#doc").val(json.docId);
            $("#dept").val(json.deptId);
            $("#title").val(json.title);
            docId=json.docId
            healthId=json.healthId
            // $("#link").val(json.link);
            // $("#img").append("<img src='"+json.mainImg+"' style='width: 100px;height: 80px'>")
            if(json.link!=""&&json!=null){
                $("#videolink").show();
            }
        }
        //获取专题
        $.get({
            url: url + "/api/admin/health/getZhuantiAll",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                if(res.retCode == 0) {
                    $("#healthId").children().remove()
                    $("#healthId").append("<option value=''>请选择专题</option>")
                    for (var i=0;i<res.data.length;i++){
                        $("#healthId").append("<option value='"+res.data[i].id+"'>"+res.data[i].title+"</option>")
                    }
                    var obj=document.getElementById("healthId");
                    for (var i = 0; i <obj.length ; i++) {
                        if(healthId==obj[i].value){
                            obj[i].selected = true;
                        }
                    }
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }
            }
        });

        //获取医生
        $.get({
            url: url + "/api/admin/doc/selAllDoc",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                if(res.retCode == 0) {
                    $("#docId").children().remove()
                    $("#docId").append("<option value=''>请选择医生</option>")
                    for (var i=0;i<res.data.length;i++){
                        $("#docId").append("<option value='"+res.data[i].id+"'>"+res.data[i].docName+"</option>")
                    }
                    var obj=document.getElementById("docId");
                    for (var i = 0; i <obj.length ; i++) {
                        if(docId==obj[i].value){
                            obj[i].selected = true;
                        }
                     }
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }
            }
        });
             layui.form.render("select");
        //保存
        $("#save").click(function(){
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var docId=$("#docId option:selected").val();
            if(docId==""){
                msg("请选择医生");
                return false;
            }
            var title=$("#title").val();
            if(title==""){
                msg("标题不能为空");
                return false;
            }
            $("#doc").val(docId);
            var fileInput = $('#videoFile').get(0).files[0];
            if(!fileInput){
                msg("视频文件不能为空");
                return false;
            }

            var loading = layer.load(2);
            $("#regform").ajaxSubmit({
                url: url + "/api/admin/health/saveHealthVideo",
                type: "post",
                enctype: 'multipart/form-data',
                success: function (res)
                {
                    if (res.retCode == "0") {
                        layer.msg('保存成功', {
                            time: 1000
                        });
                        setTimeout(function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            parent.layer.close(index);
                        }, 1000);
                    } else {
                        layer.msg('保存失败', {
                            time: 1000
                        });
                    }
                    layer.close(loading);
                },
                error: function (data)
                {
                    alert("出错");//msg.errCode
                }
            })
        })
    });
        function msg(msg) {
            layer.msg(msg, {
                time: 1000
            });
        }


});