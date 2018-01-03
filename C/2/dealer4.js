var brandlist = new Array("Porsche","Volkswagen","Audi","BMW");
function newClient(){
	var preference = Math.floor(Math.random()*4);
	//用于随机的购买车辆品牌
	var time = Math.floor(Math.random() * 1000 + 1); 
	//用与随机添加节点的时间
	var client = Math.floor(Math.random() * 10 + 1);
	//用于给每个创建的节点的随机属性
	var HTML = '<div data-html="Place for '+brandlist[preference] +' cars" class="client client_'+client+'" id="client_ '+client+'"><span>Place for :<br>'+brandlist[preference]+'</span></div>';
	//添加的节点
	$("#clients_queue").append(HTML);
	//添加子元素
	if($("#clients_queue .client").length >= 10){
		//判断子元素个数，当子元素大于等于10个时，就停止添加子元素
		return;
	}else{
		setTimeout(newClient,time)
	}
	// console.log(brandlist[preference]);
	//查看每次调用生成的购买的车辆皮牌
}
$(document).ready(function(e){
	//页面加载完后执行newClient
	// var html = "Place for Porsche cars";
	newClient();
	// $("#clients_queue").eq(0);
	// //右测买车的有人
	// for (var i = 0; i < $("#cars_place .place").length; i++) {
		// $("#cars_place .place")[i].innerHTML +=$("#cars_place .place")[i].dataset["html"] + "  价格："+ $("#cars_place .place")[i].dataset["mas"] + "   可买车辆" + $("#cars_place .place")[i].dataset["sum"];
	// }
	// $("#cars_place .place")[0].html("'+ html +' ''");
	// //左侧的车辆展示台
	// $("#exit");
	// //离开出口
	// $("#cashier");
	//购买提交台
	// $("div.mask ");

	// $();

	var clients_queue = document.querySelector("#clients_queue");
	var place = document.querySelectorAll(".place");
	var exit=document.querySelector('#exit');       /* 出口区域对象 */
    var cashier=document.querySelector('#cashier'); /* 收银台 */
    
    //初始化显示区域
    var num = 0;    //
    var price =  0;
    var sss = 0 ;
    
    document.querySelector("#clients_served").innerHTML = num + "clients";
    document.querySelector("#cars_sold").innerHTML = price + "cars";
    document.querySelector("#amount").innerHTML = sss + "clients";
    var pp;
    var ww;
    var objOne = null;

    // varclients_serve

    //拖拽
    $("#clients_queue .client:nth-child(1)").attr("draggable","true");
    // document.ondragstart=function(e){
        
    //     // console.log(e.target);
    // }
    var obj = null;
    var cars_place = document.querySelectorAll("#cars_place");

    document.ondragstart = function (e){
    	//获取被拖拽对象
    	// console.log(55);
        if (e.target.getAttribute("draggable") == "true") {
	        obj = e.target;
        }
    }
    document.ondragover=function(e){
    	//目标对象被源对象拖动着悬停在上方
        e.preventDefault();
        //阻止默认行为
    }
    // cars_place.ondrop=function(e){
    // //源对象拖动着在目标对象上方释放/松手
    // 	// // var obj= null;
    //  //    if(){

    //  //    }
    //  console.log(1111);
    //  // alert();
    //  e.target.appendChild(obj);
    // }
    for (var i = 0; i < place.length; i++) {
    	place[i].innerHTML = place[i].dataset["html"] + "  价格："+ place[i].dataset["mas"] + "   可买车辆" + place[i].dataset["sum"];
    	place[i].ondrop = function(e){
    		if (e.target.dataset['html'] == obj.dataset['html']) {
    			e.target.appendChild(obj);
		    	 pp = obj.parentNode.dataset["mas"];
		    	 ww = obj.parentNode.dataset["sum"];
		    	 objOne = obj.parentNode;
    		}
    	}
    }
    exit.ondrop = function(e){
    	e.target.appendChild(obj);
    	num++;
    	setTimeout(function(){
    		e.target.removeChild(obj);
    		document.querySelector("#clients_served").innerHTML = num + "clients";
    		newClient();
    		$("#clients_queue .client:nth-child(1)").attr("draggable","true");
    	},500);
    }
    // console.log(cars_place);
    cashier.ondrop = function (e){
    	e.target.appendChild(obj);
    	price++;
    	sss += parseFloat(pp);
    	num++;
    	$(".mask").css("display","block");
    	$("#yes").on("click",function(){
	    	setTimeout(function(){
	    		console.log(e.target);
	    		e.target.removeChild(obj);
	    		document.querySelector("#clients_served").innerHTML = num + "clients";
	    		document.querySelector("#cars_sold").innerHTML = price + "cars";
	    		document.querySelector("#amount").innerHTML = sss + "clients";
	    		ww--;
	    		objOne.dataset["sum"] = ww;
	    		objOne.innerHTML = objOne.dataset["html"] + "  价格："+ objOne.dataset["mas"] + "   可买车辆" + objOne.dataset["sum"];
	    	},500);
    		$(".mask").css("display","none");
    	})
    	$("#no").on("click",function(){
    		e.target.removeChild(obj);
    		$(".mask").css("display","none");
    		document.querySelector("#clients_served").innerHTML = num + "clients";
    	})
		newClient();
	    $("#clients_queue .client:nth-child(1)").attr("draggable","true");
    }
})