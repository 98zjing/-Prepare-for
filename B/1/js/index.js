var banners = $(".banner ul a li"); //banner轮播图片
var bannerBtns = $(".bannerBtn ul a"); //banner轮播btn
var time = null;
var index = 0;
var listBanner = $(".listBanner");
var ids = [
			//很重要属性名不要修改
			//btns每一个轮播的btn节点
			// listBanners每一个轮播被改变节点
			//index每一个对应的索引号
			//childOne第一个子节点
			//time每一个轮播的定时器
			//untime删除每一个轮播的定时器
			//media设备宽度检测
			{
				btns:$("#listBannerOne .listBannerBtn li"),
				listBanners:$("#listBannerOne .listBannerList"),
				index:0,
				childOne:$("#listBannerOne .listBannerList li")[0],
				time:null,
				untime:null,
				media:null
			},
			{
				btns:$("#listBannerTwo .listBannerBtn li"),
				listBanners:$("#listBannerTwo .listBannerList"),
				index:0,
				childOne:$("#listBannerOne .listBannerList li")[0],
				time:null,
				untime:null,
				media:null
			},
			{
				btns:$("#listBannerSex .listBannerBtn li"),
				listBanners:$("#listBannerSex .listBannerList"),
				index:0,
				childOne:$("#listBannerOne .listBannerList li")[0],
				time:null,
				untime:null,
				media:null
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
		listBanners(ids[i]);
	}
	var listLefts = $(".listLeft ul");
	for(var i = 0;i<listLefts.length;i++){
		Titles.push(new AddTitles());
		Titles[i].title = $(listLefts[i]).children("div");
		Titles[i].html = $(listLefts[i]).children("a").children("li");
		Titles[i].TitlesFn();
	}
})

