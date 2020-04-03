$(function() {
	var datas;
	$.post({
        url: url + "/api/admin/scheduling/listAll",
        //dataType: "json",
        method:"POST",
        //contentType: 'application/json;charset=UTF-8',
        data:{
        	"doc_id":1
        },
        success: function(res) {
        	
            if(res.retCode == 0) {
            	data = res.data;
            	datas = res.data;
            	for(i=1;i<=data.length;i++){
            		var id =  + parseInt((i-1)/2 + 1) + "-" + ((i%2)==0?"2":"1");
            		
            		$("#date-" + id + "-from").val(data[i-1].date_begin);
            		$("#date-" + id + "-to").val(data[i-1].date_to);
            		$("#num-" + id).val(data[i-1].num);
            		$("#type-" + id).val(data[i-1].mz_type);
            		$("#can-" + id).val(data[i-1].order_type);
            		$("#id-" + id).val(data[i-1].id);
            		
            		if(i%2==1){
            			$("#date-" + parseInt(i/2 + 1)).text(data[i-1].date + "    " + getDay(new Date(data[i-1].date)));
            			
            		}
            	}
            	
            } else {
                
            }

        }
    });
	
	
	function commit(value){
		//alert($("#date-1-1-from").val());
		//var hang = $(v).parent().parent().prevAll().length+1;  
		//var lie = $(v).parent().prevAll().length+1;  
		//alert("第"+hang+"行"+"	"+"第"+lie+"列");  
	}
	
	layui.use('laydate',function(){
		var laydate = layui.laydate;
		
		for(i=1;i<=7;i++){
			for(j=1;j<=2;j++){
				v = "#date-" + i + "-" + j + "-from";
				laydate.render({
					elem: v,
					type: 'time',
					done: function(value, date, endDate){
						var id = "#" + this.elem.attr("id");
						var hang = $(id).parent().parent().prevAll().length;  
						var lie = $(id).parent().prevAll().length + 1;
						if(hang % 2 == 0) lie++;
						//alert("第"+hang+"行"+"	"+"第"+lie+"列");
						update(datas[hang - 1].id,lie2key(lie),value);
					}
				});
				v1 = "#date-" + i + "-" + j + "-to";
				laydate.render({
					elem: v1,
					type: 'time',
					done: function(value, date, endDate){
						var id = "#" + this.elem.attr("id");
						var hang = $(id).parent().parent().prevAll().length;  
						var lie = $(id).parent().prevAll().length + 1;
						if(hang % 2 == 0) lie++;
						//alert("第"+hang+"行"+"	"+"第"+lie+"列"); 
						update(datas[hang - 1].id,lie2key(lie),value);
					}
				});
				v2 = "#type-" + i + "-" + j;
				$(v2).on('change', function(){
					
					var id = "#" + $(this).attr("id");
					var hang = $(id).parent().parent().prevAll().length;  
					var lie = $(id).parent().prevAll().length + 1;
					if(hang % 2 == 0) lie++;
					//alert("第"+hang+"行"+"	"+"第"+lie+"列");
					update(datas[hang - 1].id,lie2key(lie),$(this).val());
				});
				v3 = "#can-" + i + "-" + j;
				$(v3).on('change', function(){
					var id = "#" + $(this).attr("id");
					var hang = $(id).parent().parent().prevAll().length;  
					var lie = $(id).parent().prevAll().length + 1;
					if(hang % 2 == 0) lie++;
					//alert("第"+hang+"行"+"	"+"第"+lie+"列");
					update(datas[hang - 1].id,lie2key(lie),$(this).val());
				});
				v4 = "#num-" + i + "-" + j;
				$(v4).blur(function(){}, function(event){
					var id = "#" + $(this).attr("id");
					var hang = $(id).parent().parent().prevAll().length;  
					var lie = $(id).parent().prevAll().length + 1;
					if(hang % 2 == 0) lie++;
					update(datas[hang - 1].id,lie2key(lie),$(this).val());
				});
			}
		}
	});

	
	
	$('.layui-input').hover(function(){
		$(this).css("border-width","1");
	},function(){
		$(this).css("border-width","0");
	});
	
});


function lie2key(lie){
	if(lie == 3) return "date_begin";
	if(lie == 4) return "date_to";
	if(lie == 5) return "num";
	if(lie == 6) return "mz_type";
	if(lie == 7) return "order_type";

}

function update(id,key,value){
	

	$.post({
        url: url + "/api/admin/scheduling/update",
        //dataType: "json",
        method:"POST",
        //contentType: 'application/json;charset=UTF-8',
        data:{
        	"id":id,
        	"key":key,
        	"value" : value,
        	"doc_id": 1
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





