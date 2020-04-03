$(function() {
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
		alert(1)
        var layer = layui.layer;
      $().ready(function () {
          //添加保存
          var obj=sessionStorage.getItem("content");
          var id="";
          var imId=sessionStorage.getItem("imId")
          if(obj==null || obj==""){

          }else{
              var json=JSON.parse(obj);
              $("#id").val(json.id);
              $("#interfaceLink").val(json.interfaceLink);
              $("#requestType").val(json.requestType);
              $("#parameterName").val(json.parameterName);
              $("#parameterType").val(json.parameterType);
              $("#isYn").val(json.isYn);
              $("#parameterDesc").val(json.parameterDesc);
              if(json.type=="入参"){
                  $("#type").html("<option value=\"1\" selected=\"selected\">入参</option>\n" +
                      "            <option value=\"2\">出参</option>")
              }else{

              }
              id=json.id;
          }
          $("#save").click(function(){
              var data = {
                  "id": id,
                  "parameterName":$("input[name='parameterName']").val(),//参数名称
                  "parameterType":$("input[name='parameterType']").val(),//参数类型
                  "isYn":$("input[name='isYn']").val(),                  //是否必填
                  "parameterDesc":$("input[name='parameterDesc']").val(),//参数描述
                  "type":$("#type").val(),                              //出入参类型
                  "imId":imId
              };
              if(data.id !== "" || data.id !== null){

              }
              if(data.interfaceLink==""){
                  layer.msg("接口链接不能为空", {
                      time: 1000
                  });
                  return false;
              }
              if(data.requestType==""){
                  layer.msg("请求类型不能为空", {
                      time: 1000
                  });
                  return false;
              }
              if(data.parameterName==""){
                  layer.msg("参数名不能为空", {
                      time: 1000
                  });
                  return false;
              }
              if(data.parameterType==""){
                  layer.msg("参数类型不能为空", {
                      time: 1000
                  });
                  return false;
              }
              if(data.isYn==""){
                  layer.msg("是否必填不能为空", {
                      time: 1000
                  });
                  return false;
              }
              if(data.parameterDesc==""){
                  layer.msg("参数描述不能为空", {
                      time: 1000
                  });
                  return false;
              }
              data = JSON.stringify(data);
              var loading = layer.load(2);
              $.post({
                  url: url + "/api/admin/management/delParameterDetails",
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
                      layer.close(loading)
                  }
              });
          })

      })
    })
})
