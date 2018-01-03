var banners = $(".banner ul a li"); //banner轮播图片
var bannerBtns = $(".bannerBtn ul a"); //banner轮播btn
var time = null;
var index = 0;
var listBanner = $(".listBanner");
var ids = [
			//很重要属性名不要修改
			//btns每一个轮播的btn节点
			// listBanners每一个轮播被改变节点
			//childOne第一个子节点
			{
				btns:$("#listBannerOne .listBannerBtn li"),
				listBanners:$("#listBannerOne .listBannerList"),
				childOne:$("#listBannerOne .listBannerList li")[0]
			},
			{
				btns:$("#listBannerTwo .listBannerBtn li"),
				listBanners:$("#listBannerTwo .listBannerList"),
				childOne:$("#listBannerOne .listBannerList li")[0]
			},
			{
				btns:$("#listBannerSex .listBannerBtn li"),
				listBanners:$("#listBannerSex .listBannerList"),
				childOne:$("#listBannerOne .listBannerList li")[0]
			}
		];
var Titles = new Array();
$(function(){
	time = setInterval(function(){
		index++;
		if (index >= bannerBtns.length) {
			index = 0;
		}
		banner($(".bannerBtn ul a li"),$(".bannerBox"),index,$(".bannerBox a li")[0]);
	}, 2000)
	bannerBtns.on("click",function(){
		index = $(this).index();
		if (index >= bannerBtns.length) {
			index = 0;
		}
		banner($(".bannerBox"),$(".bannerBtn ul a li"),index,$(".bannerBox a li")[0]);
	});
	// 手机端
	for(var i=0;i<ids.length;i++){
		//原型继承属性与方法
		ids[i].prototype = new ListBanners(ids[i].btns,ids[i].listBanners,ids[i].childOne);
	}
	var listLefts = $(".listLeft ul");
	for(var i = 0;i<listLefts.length;i++){
		Titles.push(new AddTitles());
		Titles[i].title = $(listLefts[i]).children("div");
		Titles[i].html = $(listLefts[i]).children("a").children("li");
		Titles[i].TitlesFn();
	}
})

