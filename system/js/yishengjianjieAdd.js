$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage','upload'], function() {
        var upload = layui.upload;
        var form = layui.form;
        var obj=sessionStorage.getItem("content");
        var deptNo="";

        if(obj==null || obj==""){
        }else{
            var json=JSON.parse(obj);
			console.log(json)
            $("#id").val(json.id);
            $("#docName").val(json.docName);
            $("#docTitle").val(json.docTitle);
            $("#docTel").val(json.docTel);
            $("#docSpecialty").val(json.docSpecialty);
            $("#docIntro").val(json.docIntro);
            $("#loginPwd").val(json.loginPwd);
            $("#videoPrice").val(json.videoPrice);
            $("#imagePrice").val(json.imagePrice);
            $("#img").attr("src",json.docImg);
            $("#img").show();
            deptNo=json.deptNo;
            $("#isShowHealth").empty();
            if(json.hasImage==1){ // 图文
                $("#tuwen").attr("checked","checked")
            }else {
                $("#tuwen").removeAttr('checked')
            }
			if(json.hasVideo==1){ // 视频
			    $("#shipin").attr("checked","checked")
			}else {
			    $("#shipin").removeAttr('checked')
			}
			if(json.isShowHealth==1){ // 健康
			    $("#health").attr("checked","checked")
			}else {
			    $("#health").removeAttr('checked')
			}
			if(json.hashuizhen==1){ // 会议
			    $("#huiyi").attr("checked","checked")
			}else {
			    $("#huiyi").removeAttr('checked')
			}
			form.render('checkbox')// 重点 不加的话,attr添加cheched属性无效
        }
		var hasImage = 0;
		var hasVideo = 0;
		var isShowHealth = 0;
		var hashuizhen = 0;
		if($('#tuwen').prop('checked')){
			hasImage = 1
		}
		if($('#shipin').prop('checked')){
			hasVideo = 1
		}
		if($('#health').prop('checked')){
			isShowHealth = 1
		}
		if($('#huiyi').prop('checked')){
			hashuizhen = 1
		}
		console.log($('#tuwen').prop('checked'))
		form.on('checkbox(encrypt)', function(data){
			if(data.value == 1){ //图文
				if(data.elem.checked){
					hasImage = 1
				} else {
					hasImage = 0
				}
			} 
			if(data.value == 2){ //视频
				if(data.elem.checked){
					hasVideo = 1
				} else {
					hasVideo = 0
				}
			} 
			if(data.value == 3){ //健康
				if(data.elem.checked){
					isShowHealth = 1
				} else {
					isShowHealth = 0
				}
			} 
			if(data.value == 4){ //会议
				if(data.elem.checked){
					hashuizhen = 1 
				} else {
					hashuizhen = 0
				}
			} 
		}); 
		
		
		
		// form.render();
        //查找科室
        $.post({
            url: url + "/api/admin/doc/docDeptList/",
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                console.log(res)
                if(res.retCode == 0) {
                    var data = res.data;
                    for(var m in data) {
                        var selected="";
                        if(data[m].deptNo==deptNo){
                            selected="selected";
                        }
                        var str='<option  value="' + data[m].deptNo + '"  '+selected+'>' + data[m].deptName + '</option>';
                        $("#detpNo").append(str);
                    }
                    form.render('select');
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }
            }
        });

        //上传图片
        var loading;
        var imgPath;
        var uploadInst = upload.render({
            elem: '#upload' //绑定元素
            ,accept:'images'//允许上传的文件类型
            ,url: url+'/api/admin/dept/uploadImg' //上传接口
            ,size: 5000 //最大允许上传的文件大小KB
            ,before:function (obj) {
                loading = layer.load(2);
                $("#imgbtn").text("上传中...")
            }
            ,done: function(res){
                //上传完毕回调
                if(res.retCode==0){
                    $('#img').attr('src', res.data);
                    $("#img").show();
                    imgPath=res.data;
                }
                $("#imgbtn").text("上传图片")
                layer.close(loading);

            }
            ,error: function(res){
                //请求异常回调
                $("#imgbtn").text("上传图片")
                layer.close(loading);
            }
        });
        //保存
        $("#save").click(function(){
            $("#save").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#save").attr("disabled", false);
            }, 2000);
            var loading = layer.load(2);
            var data = {
                "id": $("input[name='id']").val(),
                "docName": $("input[name='docName']").val(),
                "docTitle": $("input[name='docTitle']").val(),
                "docTel": $("input[name='docTel']").val(),
                "docSpecialty": $("#docSpecialty").val(),
                "docIntro": $("#docIntro").val(),
                "deptNo":$("#detpNo").find("option:selected").val(),
                "docImg":imgPath,
                "loginPwd":$("#loginPwd").val(),
                "videoPrice":$("#videoPrice").val(),
                "imagePrice":$("#imagePrice").val(),
				"hasImage": hasImage,
				"hasVideo": hasVideo,
				"hashuizhen": hashuizhen,
				"isShowHealth": isShowHealth
            };
			console.log(data)
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/doc/docSave",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
					console.log(res)
                    if(res.retCode == 0) {
                        layer.msg('操作成功', {
                            time: 1000
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
                    layer.close(loading);
                }
            });
        })

    })
})
