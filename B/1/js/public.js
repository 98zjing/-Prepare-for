//banner   用于所有的轮播
function banner(btnsTwo,objsTwo,index,childOne){
	btnsTwo.removeClass("active").eq(index).addClass("active");
	objsTwo.animate({left:-index*childOne.offsetWidth},200);
}
//用于列表的每个banner轮播
function listBanners(ids){
	//定时器设置
	ids.time = setInterval(function(){
		ids.index++;
		if (ids.index >= ids.btns.length) {
			ids.index = 0;
		}
		banner(ids.btns,ids.listBanners,ids.index,ids.childOne);
	}, 2000)
	//轮播的点击事件
	$(ids.btns).on("click",function(){
		ids.index = $(this).index();
		if (ids.index >= ids.btns.length) {
			ids.index = 0;
		}
		banner(ids.btns,ids.listBanners,ids.index,ids.childOne);
	})
	//鼠标移入移出，定时的开启去关闭
	$(ids.listBanners).hover(function(){
		//关闭定时器
		ids.untime = clearInterval(ids.time);
	},function(){
		//重新开启定时器
		ids.time = setInterval(function(){
			ids.index++;
			if (ids.index >= ids.btns.length) {
				ids.index = 0;
			}
			banner(ids.btns,ids.listBanners,ids.index,ids.childOne);
		}, 2000);
	})
	ids.media = setInterval(function(){
		var display = ids.btns.parent().css("display");
		//判断不在手机端时，关闭定时器,并且吧
		if (display == "none") {
			ids.untime = clearInterval(ids.time);
			ids.listBanners.css("left",0);
			ids.time = null;
		}
		//判断不在手机在端时，再重新开启定时器，并且判断如果定时器已经开启就不再开启
		if (display == "block" && ids.time == null) {
			ids.time = setInterval(function(){
			ids.index++;
			if (ids.index >= ids.btns.length) {
				ids.index = 0;
			}
				banner(ids.btns,ids.listBanners,ids.index,ids.childOne);
			}, 2000);
		}
	}, 50)
}

//listLeft  分别添加事件对象
function AddTitles(){
	this.title = null;
	this.html = null;
}
//原型添加TitlesFn方法
AddTitles.prototype.TitlesFn = function(){
	//_this用于防止this指向被改变导致的错误
	var _this = this;
	this.title.on("click",function(){
		_this.html.slideToggle();
	})
}