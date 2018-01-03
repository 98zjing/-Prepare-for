//banner   用于所有的轮播
function banner(btnsTwo,objsTwo,index,childOne){
	btnsTwo.removeClass("active").eq(index).addClass("active");
	objsTwo.animate({left:-index*childOne.offsetWidth},200);
}
//用于列表的每个banner轮播
function ListBanners(btns,listBanners,childOne){
	this.index = 0;
	this.time = null;
	this.time= null;
	this.btns = btns;
	this.listBanners = listBanners;
	this.childOne = childOne;
	this.timeFn();
	this.onHover();
	this.onClick();
	this.media();
}
//定时器设置
ListBanners.prototype.timeFn = function(){
	var _this = this;
	this.time = setInterval(function(){
		_this.index++;
		_this.ifFn();
	}, 2000)
}
//事件定义，鼠标移入移出，定时器的开启去关闭
ListBanners.prototype.onHover = function(){
	var _this = this;
	$(this.listBanners).hover(function(){
		//关闭定时器
		_this.untimeFn();
	},function(){
		//重新开启定时器
		_this.timeFn();
	})
}
//事件定义,点击事件
ListBanners.prototype.onClick = function(){
	var _this = this;
	$(this.btns).on("click",function(){
		_this.untimeFn();
		_this.index = $(this).index();
		_this.ifFn();
		_this.timeFn();
	})
}
//定时器的清除
ListBanners.prototype.untimeFn = function(){
	this.untime = clearInterval(this.time);
}
//设备检测
ListBanners.prototype.media = function(){
	var _this = this;
	setInterval(function(){
		//检测_this.btns的父级display的值是否为none
		var display = _this.btns.parent().css("display");
		//判断不在手机端时，关闭定时器,并且吧
		if (display == "none") {
			_this.untime = clearInterval(_this.time);
			_this.listBanners.css("left",0);
			_this.time = null;
		}
		//判断不在手机在端时，再重新开启定时器，并且判断如果定时器已经开启就不再开启
		if (display == "block" && _this.time == null) {
			_this.time = setInterval(function(){
			_this.index++;
			_this.ifFn();
			}, 2000);
		}
	}, 50)
}
//index判断
ListBanners.prototype.ifFn = function(){
	//btns个数由外部传入
	if (this.index >= this.btns.length) {
			this.index = 0;
	}
	banner(this.btns,this.listBanners,this.index,this.childOne);
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