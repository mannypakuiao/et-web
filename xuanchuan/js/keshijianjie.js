$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage','upload'], function() {
        var element = layui.element;
        var table = layui.table;
        var layer = layui.layer;
        var upload = layui.upload;
        var form = layui.form;
        var laydate = layui.laydate;
        var laypage = layui.laypage;
        var totalPages = 0;
        var pageNo=1;
        var pageSize=10;
        var userId = sessionStorage.getItem("userId");
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
        function find(pageNo){
            //查找科室列表
            $("#search").attr("disabled", 'disabled');
            setTimeout(function(){
                $("#search").attr("disabled", false);
            }, 2000);
            $("#page").show();
            var loading = layer.load(2);
            var data = {
                "pageNumber":pageNo,
                "pageSize":pageSize,
                "deptName": $("#key").val()
        };
        data = JSON.stringify(data);
        $.post({
            url: url + "/api/admin/dept/deptList",
            data: data,
            dataType: "json",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                layer.close(loading);
                if(res.retCode == 0) {
                    if (res.data.list.length > 0) {
                        getPageList(res.data.totalSize,pageNo,pageSize)
                        $(".tableContent tbody").empty();
                            for(var i = 0; i < res.data.list.length; i++) {
                                var content= res.data.list[i];
                                var str="";
                                /* if(content.isShowHealth==0){
                                     str="否";
                                 }
                                 if(content.isShowHealth==1){
                                     str="是";
                                 }*/
                                var tr = "<tr>" +
                                    "<td hidden='true' class='num'>" + i + "</td>" +
                                    "<td hidden='true' class='id'>" + content.id + "</td>" +
                                    "<td  class='deptName'>" + content.deptName + "</td>" +
                                    /* "<td  class='deptName'>" + content.deptInfo + "</td>" +*/
                                    "<td  class='sort'>" + content.sort + "</td>" +
                                    /*    "<td  class='sort'>" + str+ "</td>" +*/
                                    /* "<td  class='deptParentId'>" + content.deptParentId + "</td>" +*/
                                    "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                    "</tr>";
                                $(".tableContent tbody").append(tr);
                            }
                        $("#num").val(pageNo);
                        //修改
                        $(".btnMain").click(function () {
                            var num=$(this).parents("tr").find(".num").text();
                            sessionStorage.setItem("content", JSON.stringify( res.data.list[num]));
                            layer.open({
                                type: 2,
                                title: "修改科室信息",
                                area: ['800px', '500px'],
                                content: 'keshijianjieAdd.html',
                                end:function () {
                                    $("#search").trigger("click")
                                }
                            });
                        })
                        //删除
                        $(".delete").click(function() {
                            var id = $(this).parents("tr").find(".id").text();
                            sessionStorage.setItem("id", id);
                            $("#delete").attr("disabled", 'disabled');
                            setTimeout(function(){
                                $("#delete").attr("disabled", false);
                            }, 2000);
                            var tr = $(this).parents("tr");
                            layer.open({
                                type: 1,
                                content: '确认删除吗' ,
                                area: ['250px', '140px'],
                                skin: 'layui-layer-molv',
                                shade: 0,
                                title :'提示信息',
                                btn: ['删除'],
                                yes: function(index, layero){
                                    $.post({
                                        url: url + "/api/admin/dept/deptDel/"+id,
                                        dataType: "json",
                                        data: content,
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
                    }else {
                        layer.msg("暂无数据",{
                            time:1000
                        })
                    }
                }
                else {
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
                title: "添加科室",
                area: ['800px', '500px'],
                content: 'keshijianjieAdd.html',
                end:function () {
                    $("#search").trigger("click")
                }
            });
        })
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
            var data = {
                "id": $("input[name='id']").val(),
                "deptName": $("input[name='deptName']").val(),
                "deptDesc": $("#content").html(),
                "sort": $("#sort").val(),
                "deptImgPath":imgPath,
              /*  "isShowHealth":$("#isShowHealth").val()*/
            };
            if(data.deptName==""){
                layer.msg("科室名称不能为空", {
                    time: 1000
                });
                return false;
            }
            var loading = layer.load(2);
            data = JSON.stringify(data);
            $.post({
                url: url + "/api/admin/dept/deptSave",
                data: data,
                dataType: "json",
                contentType: 'application/json;charset=UTF-8',
                success: function(res) {
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

        var obj=sessionStorage.getItem("content");

        if(obj==null || obj==""){
        }else{
            var json=JSON.parse(obj);
            $("#id").val(json.id);
            $("#deptName").val(json.deptName);
            $("#sort").val(json.sort);
            $("#imgPath").attr("src",json.deptImgPath);
            document.getElementById('content').innerHTML=json.deptDesc;
          /*  $("#isShowHealth").empty();
            if(json.isShowHealth==0){
                $("#isShowHealth").append('<option value="0">否</option><option value="1">是</option>')
            }else {
                $("#isShowHealth").append('<option value="1">是</option><option value="0">否</option>')
            }*/
            $("#img").attr("src",json.deptImgPath);
            $("#img").show();
        }
    });
});

