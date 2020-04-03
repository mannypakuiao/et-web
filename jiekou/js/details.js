$(function () {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'],function(){
        $().ready(function() {
            var id = sessionStorage.getItem("imId")
           /* var name=sessionStorage.getItem("pname");
            sessionStorage.removeItem("pname");*/
            find();
            //查询
            $("#search").click(function () {
                find();
            });
             function  find() {
                 var log=layer.load(2)
                 $.post({
                     url:url+"/api/admin/management/selById?imId=" +id+"&parameterName="+$("#key").val(),
                     dataType: "json",
                     method: 'POST',
                     contentType: 'application/json;charset=UTF-8',
                     success: function (res) {
                         $(".tableContent tbody").empty();
                         if (res.retCode == 0) {
                             if (res.data.length > 0) {
                                 for (var i = 0; i < res.data.length; i++) {
                                     var content = res.data[i];
                                     if(content.type==1){
                                         content.type="入参"
                                     }else{
                                         content.type="出参"
                                     }
                                     var tr = "<tr>" +
                                         "<td hidden='true' class='num'>" + i + "</td>" +
                                         "<td hidden='true'  class='id'>" +content.id + "</td>" +
                                         "<td  class='deptName'>" +content.parameterName + "</td>" +
                                         "<td  class='deptName'>" +content.parameterType + "</td>" +
                                         "<td  class='deptName'>" +content.isYn + "</td>" +
                                         "<td  class='deptName'>" +content.parameterDesc + "</td>" +
                                         "<td hidden='true'  class='imId'>" +content.imId + "</td>" +
                                         "<td  class='deptName'>" +content.type + "</td>" +
                                         "<td  class='del'><p style='cursor: pointer;' class='personState delete'>删除</p>&nbsp;&nbsp;&nbsp;<p style='cursor: pointer;' class='personState btnMain'>修改</p></td>" +
                                         "</tr>";
                                     $(".tableContent tbody").append(tr);
                                 }
                             }
                         }
                         layer.close(log)
                         //修改
                         $(".btnMain").click(function () {
                             var num = $(this).parents("tr").find(".num").text();
                             sessionStorage.setItem("content", JSON.stringify(res.data[num]));
                             layer.open({
                                 type: 2,
                                 title: "修改接口",
                                 area: ['600px', '500px'],
                                 content: 'detailsAdd.html',
                                 end:function () {
                                     $("#search").trigger("click")
                                 }
                             });

                         })

                         //删除
                         $(".delete").click(function () {
                             var id = $(this).parents("tr").find(".id").text();
                             var imId = $(this).parents("tr").find(".imId").text();
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
                                         url: url + "/api/admin/management/delParameterDetails?id=" + id,
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
                 });
             }
            //添加
            $("#add").click(function(){
                sessionStorage.setItem("imId",id);
                $("#yue").css("display","none");
                sessionStorage.setItem("content","");
                layer.open({
                    type: 2,
                    title: "添加接口",
                    area: ['600px', '500px'],
                    content: 'detailsAdd.html',
                    end:function () {
                        console.log("shuaxin1")
                        $('#search').trigger('click');
                        console.log("shuaxin")
                    }
                });
            })
        })
    })
})
