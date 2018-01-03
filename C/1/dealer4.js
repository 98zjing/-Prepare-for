var brandlist = new Array("Porsche","Volkswagen","Audi","BMW");
function newClient(){
	var preference = Math.floor(Math.random()*4);
	//用于随机的购买车辆品牌
	var time = Math.floor(Math.random() * 1000 + 1); 
	//用与随机添加节点的时间
	var client = Math.floor(Math.random() * 10 + 1);
	//用于给每个创建的节点的随机属性
	var HTML = '<div data-flag="Place for '+brandlist[preference] +' cars" class="client client_'+client+'" id="client_ '+client+'"><span>Place for '+brandlist[preference]+'</span></div>';
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
	for (var i = 0; i < $("#cars_place .place").length; i++) {
		$("#cars_place .place")[i].innerHTML =$("#cars_place .place")[i].dataset["html"] + "  价格："+ $("#cars_place .place")[i].dataset["mas"] + "   可买车辆" + $("#cars_place .place")[i].dataset["sum"];
	}
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
    for (var i = 0; i < place.length; i++) {
    	console.log(place[i].dataset["html"]);
    	place[i].innerHTML = place[i].dataset["html"] + "  价格："+ place[i].dataset["mas"] + "   可买车辆" + place[i].dataset["sum"];
    }
    //初始化显示区域
    var num = 0;
    var price =  0;
    

    var display = document.querySelector("#display");
    var displayUlLi = display.querySelectorAll("ul li");
    // alert(displayUlLi.length);
    for (var i = 0; i < displayUlLi.length; i++) {
    	displayUlLi[i].innerHTML = 0;
    }
    // varclients_serve

    //拖拽
    $("#clients_queue .client:nth-child(1)").attr("draggable","true");
    // document.ondragstart=function(e){
        
    //     // console.log(e.target);
    // }
    var obj = null;

    document.ondragstart = function (e){
    	//获取被拖拽对象
    	// console.log(55);
        if (e.target.getAttribute("draggable") == "true") {
	        obj = e.target;
        }
    }
    document.ondragleave=function(){
        console.log(3);
    }
    document.ondrop=function(e){
    	// // var obj= null;
     //    if(){

     //    }
     console.log(1111);
     e.target.appendChild(obj);
    }
})