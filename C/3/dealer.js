var brandlist = new Array("Porsche","Volkswagen","Audi","BMW");
function newClient(){
	var preference = Math.floor((Math.random()*4));
	var time = Math.floor((Math.random()*3000)+1);
	var client = Math.floor((Math.random()*10)+1);
	var HTML = '<div class="client client_'+client+'" data-prod="'+ brandlist[preference]+'" data-client="'+brandlist[preference]+'"><span class="preference">Client for '+brandlist[preference]+'</span></div>';
	$("#clients_queue").append(HTML);
	if ($("#clients_queue .client").length >=10) {
		return ;
	}else{
		setTimeout(function(){newClient();},time);
	}
}
$("document").ready(function(e) {
	newClient();
	var clients_served_sum = 0;//记录浏览次数
	var cars_sold_sum = 0;//记录成交次数
	var amount_sum = 0;//记录交易总金额
	var money = 0; //存放每次交易的金额
	var dosa = 0; //现有车辆的车辆个数
	var obj = null;
	var objDosa = null;
	//
	var exit = $("#exit");
	var cashier = $("#cashier");
	var clients_served = $("#clients_served"); //浏览次数
	var cars_sold = $("#cars_sold");  //成交次数
	var amount = $("#amount"); //交易总金额
	var stime = null;   //存放定时器
	//
	$("#clients_queue .client:nth-child(1)").attr("draggable","true");
	$(document).on("dragstart",function(e){
		//获取被拖拽对象
		 if (e.target.getAttribute("draggable") == "true") {
	        obj = e.target;
        }
	});
	$(document).on("dragover",function(e){
		//阻止默认行为
		e.preventDefault();
		if (e.target.dataset['prod'] == obj.dataset['prod'] && e.target.dataset['html'] == 0) {
	 		obj.dataset["one"] = "true";
	 	}
	});
	for (var i = 0; i < $("#cars_place .place").length; i++) {
		var One =  $("#cars_place .place")[i];
		 One.innerHTML ="Place for  " + One.dataset["prod"] + "cars" + "  购买价格"+One.dataset['money']+"  现有车辆:"+ One.dataset["html"]; 
	}
	//展示台
	$("#cars_place .place").on("drop",function(e){
	 	if (e.target.dataset['prod'] == obj.dataset['prod'] && e.target.dataset['html'] > 0) {
		 	$(this).append(obj);
		 	money = $(this).data("money");
		 	dosa = this.dataset["html"];
		 	objDosa = $(this)[0];
	 	}else if(obj.dataset["one"] && e.target.dataset['html'] > 0){
	 		$(this).append(obj);
		 	dosa = this.dataset["html"];
		 	money = $(this).data("money");
		 	objDosa = $(this)[0];
	 	}
	 });
	//退出
	exit.on("drop",function(e){
		$(this).append(obj);
		setTimeout(function(){
			addClientsServedSum();
			e.target.removeChild(obj);
			$("#clients_queue .client:nth-child(1)").attr("draggable","true");
			newClient();
		},100)
	})
	//交易平台
	cashier.on("drop",function(e){
		$(this).append(obj);
		$(".mask").css("display","block");
		$("#Yes").on("click",function(){
			$(".mask").css("display","none");
			clearTimeout(stime);
			stime = setTimeout(function(){
				e.target.removeChild(obj);
				$("#clients_queue .client:nth-child(1)").attr("draggable","true");
				addClientsServedSum();
				addCarsSoldSum();
				addAmountSum();
				remove();
				newClient();
			}, 500);
		});
		$("#No").on("click",function(){
			clearTimeout(stime);
			$(".mask").css("display","none");
			stime = setTimeout(function(){
				e.target.removeChild(obj);
				$("#clients_queue .client:nth-child(1)").attr("draggable","true");
				addClientsServedSum();
			}, 500);
		});
	})
	//浏览次数函数
	function addClientsServedSum() {
		clients_served_sum++;
		var ss = clients_served_sum + " clients";
		clients_served.html(ss);
	}
	//交易成功次数函数
	function addCarsSoldSum (argument) {
		cars_sold_sum++;
		var ss = cars_sold_sum + " cars";
		cars_sold.html(ss);
	}
	//交易总金额函数
	function addAmountSum(){
		amount_sum += parseFloat(money);
		var ss = "$ " + amount_sum + " 00"
		amount.html(ss);
	}
	//交易成功车辆减少
	function remove(){
		var ss = dosa;
		 ss--;
		objDosa.dataset["html"] = ss;
		objDosa.innerHTML = "Place for  " + objDosa.dataset["prod"] +"cars"+"  购买价格"+objDosa.dataset['money']+"  现有车辆:"+ objDosa.dataset["html"]; 
	}
});
