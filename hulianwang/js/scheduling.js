$(function() {
	
	$('.layui-input').css("width","90%");
	$('.layui-input').css("marginLeft","5%");
	$('.layui-input').css("marginRight","5%");
	
	
    layui.use(['element', 'table', 'form', 'laydate', 'layer', 'laypage'], function() {
        var datas;
        var arr = []
        //获取科室
        $.post({
            url: url + "/api/admin/deptInfo/getQueryDepartment",
            contentType: 'application/json;charset=UTF-8',
            success: function(res) {
                console.log(res.data)
                arr = res.data
                if(res.retCode == 0) {
                    $("#dept").empty();
                   // $("#dept").append("<option value=''>请选择科室</option>")
                    for (var i=0;i<res.data.length;i++){
                        $("#dept").append("<option value='"+res.data[i].deptNo+"'>"+res.data[i].deptName+"</option>")
                    }
                    getDoc() 
                } else {
                    layer.msg(res.retMsg, {
                        time: 1000
                    });
                }
            }
        });
        //获取医生
        $("#dept").change(function () {
            $.post({
                url: url + "/api/admin/scheduling/getDocByDept",
                method:"POST",
                data:{
                        "deptNo":$("#dept").val()
                },
                success: function(res) {
                    console.log(res.data)
                    if(res.retCode == 0) {
                        $("#doc").empty();
                        for (var i=0;i<res.data.length;i++){
                            $("#doc").append("<option value='"+res.data[i].docNo+"'>"+res.data[i].docName+"</option>")
                        }
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                }
            });
        })
        
        function getDoc(){
            $.post({
                url: url + "/api/admin/scheduling/getDocByDept",
                method:"POST",
                data:{
                        "deptNo": arr[0].deptNo
                },
                success: function(res) {
                    if(res.retCode == 0) {
                        $("#doc").empty();
                        for (var i=0;i<res.data.length;i++){
                            $("#doc").append("<option value='"+res.data[i].docNo+"'>"+res.data[i].docName+"</option>")
                        }
                    } else {
                        layer.msg(res.retMsg, {
                            time: 1000
                        });
                    }
                }
            });
        }
       
        layui.form.render("select");
        $("#search").click(function () {
            find();
        })
    
        function find(){

            $.post({
                url: url + "/api/admin/scheduling/listAll",
                method:"POST",
                data:{
                    "doc_no":$("#doc").val(),
					"hz_type":$("#hz_type").val()
                },
                success: function(res) {
                    if(res.retCode == 0) {
                        console.log(res.data)
                        data = res.data;
                        datas = res.data;
                        for(i=1;i<=data.length;i++){
                            $("#num-" + i+"-1").val(data[i-1].numAM);
                            $("#num-"+i+"-2").val(data[i-1].numPM);
                            $("#type-"+ i+"-1").val(data[i-1].hz_type);
                            $("#type-"+i+"-2").val(data[i-1].hz_type);
                            $("#chu-" + i+"-1").val(data[i-1].hasAm);
                            $("#chu-"+i+"-2").val(data[i-1].hasPm);
                            $("#id-"+ i+"-1").val(data[i-1].id);
                            $("#id-"+i+"-2").val(data[i-1].id);
                            $("#date-" + parseInt(i)).text(data[i-1].date + "    " + getDay(new Date(data[i-1].date)));
                        }
                    } else {

                    }

                }
            });
        }
		
            var laydate = layui.laydate;
            for(i=1;i<=7;i++){
                for(j=1;j<=2;j++){
                    v4 = "#num-" + i + "-" + j;
                    $(v4).blur(function(){}, function(event){
                        var id = "#" + $(this).attr("id");
                        var hang = $(id).parent().parent().prevAll().length;
                        var lie = $(id).parent().prevAll().length + 1;
                        if(hang % 2 == 0) lie++;
                        var index=0;
                        if (hang % 2 ==0){
                            index=hang/2-1
                        }else {
                            index=hang/2
                        }
                        update(datas[parseInt(index)].id,lie2key(lie,hang),$(this).val());
                    });
                    v2 = "#type-" + i + "-" + j;
                    $(v2).on('change', function(){
                        if (v2.substring(v2.length-1,v2.length)=="2"){
                            $("#type-"+i+"1").val($(this).val())
                            $("#type-"+i+"1").attr("disabled","disabled");
                        }else {
                            $("#type-"+i+"2").val($(this).val())
                            $("#type-"+i+"2").attr("disabled","disabled");
                        }
                        var id = "#" + $(this).attr("id");
                        var hang = $(id).parent().parent().prevAll().length;
                        var lie = $(id).parent().prevAll().length + 1;
                        if(hang % 2 == 0) lie++;
                        var index=0;
                        if (hang % 2 ==0){
                            index=hang/2-1
                        }else {
                            index=hang/2
                        }
                        //alert("第"+hang+"行"+"	"+"第"+lie+"列");
                       update(datas[parseInt(index)].id,lie2key(lie,hang),$(this).val());
                    });
                    v3 = "#chu-" + i + "-" + j;
                    $(v3).on('change', function(){
                        var id = "#" + $(this).attr("id");
                        var hang = $(id).parent().parent().prevAll().length;
                        var lie = $(id).parent().prevAll().length + 1;
                        if(hang % 2 == 0) lie++;
                        var index=0;
                        if (hang % 2 ==0){
                            index=hang/2-1
                        }else {
                            index=hang/2
                        }
                        //alert("第"+hang+"行"+"	"+"第"+lie+"列");
                        update(datas[parseInt(index)].id,lie2key(lie,hang),$(this).val());
                    });
                }
            }
        $('.layui-input').hover(function(){
            $(this).css("border-width","1");
        },function(){
            $(this).css("border-width","0");
        });

       function lie2key(lie,hang){
            var attribute="";
            if (lie==3){
                attribute="numAM"//行双数单数为上午午
                if (hang%2==0){
                    attribute="numPM";//行数单数为下午
                }
            }
            if (lie==4){
                attribute="hasAm"//行双数单数为上午午
                if (hang%2==0){
                    attribute="hasPM";//行数单数为下午
                }
            }
            return attribute;
    
        }

        function update(id,key,value){
            console.log(id,key,value)
            $.post({
                url: url + "/api/admin/scheduling/update",
                //dataType: "json",
                method:"POST",
                //contentType: 'application/json;charset=UTF-8',
                data:{
                    "id":id,
                    "key":key,
                    "value" : value,
                    "doc_no":$("#doc").val()
                },
                success: function(res) {

                    if(res.retCode == 0) {

                    } else {
                        alert(res.retMsg);
                    }

                }
            });
        }

        function getDay(date){
            var week;
            if(date.getDay()==0) week="周日";
            if(date.getDay()==1) week="周一";
            if(date.getDay()==2) week="周二";
            if(date.getDay()==3) week="周三";
            if(date.getDay()==4) week="周四";
            if(date.getDay()==5) week="周五";
            if(date.getDay()==6) week="周六";
            return week;
        }
    });


    //function commit(value){
        //alert($("#date-1-1-from").val());
        //var hang = $(v).parent().parent().prevAll().length+1;
        //var lie = $(v).parent().prevAll().length+1;
        //alert("第"+hang+"行"+"	"+"第"+lie+"列");
   // }
});




