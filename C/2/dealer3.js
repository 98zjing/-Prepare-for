/**
 * Created by silence on 2017/12/25.
 */

var brandlist = new Array("Porsche","Volkswagen","Audi","BMW");
function newClient(){
    var preference = Math.floor((Math.random()*4));
    //console.log(preference+'----preference');
    var time = Math.floor((Math.random()*10000)+1);
    //console.log(time+'----time');
    var client = Math.floor((Math.random()*10)+1);

    $('#clients_queue').append('<div data-flag="Place for '+brandlist[preference]+' cars" class="client client_'+client+'"  id="client_'+client+'"><span>Place for '+brandlist[preference]+'</span></div>');


    if($('#clients_queue .client').length>=10){
        return;
    }else{
        setTimeout(function(){
            newClient()
        },1000)
    }
}

$(document).ready(function(){
    newClient();
/*第一步获取 被拖拽对象*/
    /*获取被拖拽对象
    * 1、顾客父盒子
    * 2、目标对象
    *   a.展台区域
    *   b.出口区域
    *   c.收银台
    * */
    var clients_queue=document.querySelector('#clients_queue'); /* 顾客父盒子 */

    var place=document.querySelectorAll('.place');  /* 展台目标对象 */
    var exit=document.querySelector('#exit');       /* 出口区域对象 */
    var cashier=document.querySelector('#cashier'); /* 收银台 */

/*第二步实时显示区域对象*/

    /*显示区域对象
    * 1、展台汽车对象+展台初始可售汽车数量
    * 2、模态框
    *    yes + no 按钮
    * 3、初始显示可卖汽车+顾客访问量 + 初始显示已卖汽车数量 + 初始显示销售总金额
    *
    * */
    var place=document.querySelectorAll('.place');  /*展台汽车对象*/

    var mask=document.querySelector('.mask');       /*模态框*/
    var no=document.querySelector('.no');
    var yes=document.querySelector('.yes');


    for(var i=0;i<place.length;i++) {
        /*实时显示可售汽车数量  获取的是汽车的自定义data属性*/
        place[i].innerHTML = place[i].dataset['flag']+'-----汽车价格' +place[i].dataset['price'] + "---剩余车辆数：" + place[i].dataset['num'];
    }


    /*1、定义初始化对象*/
    var obj=null;  				 /*首先初始一个对象 存储拖拽的那个顾客*/
    /*	var obj2=null;  			 /!*首先初始一个对象 存储拖拽的那个顾客所选的车数量为0*!/*/
    var num=0;    				 /*访问量*/
    var car_num=0; 				 /*售出汽车数量*/
    var car_total_price=0;       /*销售总金额*/


    var clients_served=document.querySelector("#clients_served");   /*访问量对象*/
    var cars_sold=document.querySelector("#cars_sold");  	 		/*售出汽车数量对象*/
    var amount=document.querySelector("#amount");  		 			/*销售总金额对象*/

    /*初始化访问量、售出汽车数量、销售总金额*/
    clients_served.innerHTML = num + " clients";
    cars_sold.innerHTML = car_num + " clients";
    amount.innerHTML = car_total_price + " clients";

/*第三步实现被拖拽*/
    /*  A 实现拖拽  从队列开始拖拽 (第一次拖拽)
    *       1、只有开启拖拽的才可以拖动 即：第一个
    *       2、可以拖动到的区域
    *           a.出口区域
    *               i.   统计显示顾客的访问量
    *               ii.  顾客移除
    *               iii. 再添加一个顾客
    *           b.展台区域
    *               i.   如果顾客要买的车数量为0，
    *                       a、则弹出弹框 提示：可以选择其他车型
    *                       b、给这个顾客一个标记 data-view=1 (表示这个顾客要买的车已经售完他可以选择其它款型的车)
    *               ii、 如果顾客有标记 data-view=1  说明该顾客想买的车已经售卖完，则他可以选择店里任意可以买的车
    *               iii. 如果顾客要买的车数量大于0，则顾客回到队列的起点，再次拖拽则可以选择其他车型
    *   B 实现拖拽  从展台开始拖拽 (第二次拖拽)
    *       1、可以拖动到的区域
     *           a.出口区域
     *              i.   统计显示顾客的访问量
     *              ii.  顾客移除
     *              iii. 再添加一个顾客
     *           b.收银台区域  >>>>显示模态框
     *              yes:
     *                  i.   统计显示顾客的访问量    >>>递增
     *                  ii.  统计显示汽车的销售数量  >>>递增
     *                  iii. 统计显示汽车的销售金额  >>>叠加
     *                  iv.  统计显示汽车可卖数量    >>>递减
     *                  v.   模态框关闭+移除刚添加的子元素
     *                  vi.  再添加一个顾客
     *                  vii. 第一个顾客开启拖拽
     *                  viii.关闭模态框
     *              no:
     *                  i.   统计显示顾客的访问量    >>>递增
     *                  v.   顾客移除+关闭模态框
     *                  vi.  再添加一个顾客
     *                  vii. 第一个顾客开启拖拽
     *
    * */

    /*第一个开启拖拽*/
    $('#clients_queue .client:nth-child(1)').attr('draggable','true');
    /*1/*/
    document.ondragstart=function(e){
        if(e.target.getAttribute('draggable')=='true'){   /*只有 开启拖拽的才可以拖拽 获取这个开启拖拽的对象*/
            obj = e.target;
        }
    };

    /*4、阻止浏览器默认行为，防止浏览器不能触发ondrop事件*/
    document.ondragover=function(e){
        e.preventDefault();
    }


    for(var i=0;i<place.length;i++) {
        place[i].ondrop=function(e){


            /*能进入汽车展台的情况分析
            * 1、如果汽车可售数量 小于等于0 ，并且顾客进入的是他想买的车型
            *    >>>>就阻止进入，并且给他做一个标记  即说明：此顾客要买的车已经售完，可以凭借此标记顾客可以选别的车
            * 2、如果如果顾客再次进入展台，
            *    有标记 则他可以进入任意一个汽车数量大于1的展台中
            * 3、如果汽车可售数量 大于等于1 ，
            *    则只允许此顾客进入他要买的车型展台中，否则就阻止
            *
            * */

            if($(e.target).data('num')<=0 && $(obj).data('flag') == $(e.target).data('flag')){
                alert("<p>该型号汽车已经售卖完，请选择其他车型！！！</p>");
                $(obj).data('view',1);
                console.log(333);
                return;
            }else if($(obj).data('view')==1){
                $(e.target).append(obj);
            }else if($(e.target).data('num')>=1){
                console.log($(obj).data('flag'),44444);
                console.log($(e.target).data('flag'),3333);
                if($(obj).data('flag') == $(e.target).data('flag')){
                    $(e.target).append(obj);
                }else{
                    console.log(22);
                    return;

                }
            }
        }
    };





    exit.ondrop=function(e){
        num++;
        $('#clients_served').html(num+'clients');
        e.target.appendChild(obj);
        setTimeout(function(){
            e.target.removeChild(obj);

            newClient();
            /*第一个开启拖拽*/
            $('#clients_queue .client:nth-child(1)').attr('draggable','true');
        },300)
    };
    /*汽车展台数量 、车型 、 汽车对象*/
    /*
    * 1、可卖的数量
    * 2、汽车标志 / 车型
    * 3、汽车对象
    *
    * */

    var data_num;           /*可卖的数量*/
    var flag;               /*汽车标志 / 车型*/
    var data_num_parent;    /*汽车对象*/

    cashier.ondrop=function(e){
        num++;
        for(var i=0;i<place.length;i++) {
            if(obj.parentNode==place[i]){
                var obj_price=$(obj).parent().data('price');
                data_num=$(obj).parent().data('num');
                flag=$(obj).parent().data('flag');
                data_num_parent=$(obj).parent();

                e.target.appendChild(obj);
                mask.style.display='block';
                yes.onclick=function(){
                    mask.style.display='none';
                    data_num--;
                    console.log(data_num,777);
                    car_num++;
                    $('#clients_served').html(num+'clients');
                    $('#cars_sold').html(car_num+'clients');

                    data_num_parent.data('num',data_num);
                    data_num_parent.html(data_num_parent.data('flag')+'-----汽车价格' +data_num_parent.data('price') + "---剩余车辆数：" + data_num_parent.data('num'));

                    car_total_price+=parseFloat(obj_price);   /*计算已售卖汽车的总价钱*/

                    console.log(parseFloat(obj_price),454444);
                    $('#amount').html('€ '+parseFloat(car_total_price).toFixed('2')+'clients');


                    e.target.removeChild(obj);
                    newClient();
                    /*第一个开启拖拽*/
                    $('#clients_queue .client:nth-child(1)').attr('draggable','true');
                };
                no.onclick=function(){
                    mask.style.display='none';

                    $('#clients_served').html(num+'clients');
                    e.target.removeChild(obj);
                    newClient();
                    /*第一个开启拖拽*/
                    $('#clients_queue .client:nth-child(1)').attr('draggable','true');
                }



            }
        }

    }


    /*exit.ondrop=function(e){
        e.target.appendChild(obj);
        setTimeout(function () {
            e.target.removeChild(obj);
            num++;
            clients_served.innerHTML = num + " clients";     /!*统计顾客的访问量*!/

            newClient();   					/!*移走一个就补上去一个*!/

            $("#clients_queue .client:nth-child(1)").attr('draggable',true);
        }, 300)
    };
    /!*第三步*!/
    /!* 目标拖拽对象 收银台 *!/
    cashier.ondrop=function(e){
        num++;
        for(var i=0;i<place.length;i++) {
            if (obj.parentNode==place[i]) {  /!*吐过拖拽对象到的父元素为访问的车辆区域的对象*!/
                var t_obj=$(obj).parent().data('price');

                data_num=$(obj).parent().data('num');  //!*重新获取汽车的数量*!/
                flag=$(obj).parent().data('flag');     /!*重新获取汽车标志*!/
                data_num_parent=$(obj).parent();       /!*重新获取汽车对象*!/


                e.target.appendChild(obj);


                mask.style.display='block';  			/!*弹框显示*!/
                no.onclick=function(){
                    mask.style.display='none';
                    e.target.removeChild(obj);
                    newClient();   						/!*移走一个就补上去一个*!/

                    clients_served.innerHTML = num + " clients";   /!*统计顾客的访问量*!/
                    $("#clients_queue .client:nth-child(1)").attr('draggable',true);/!*重新设置第一个开启拖拽*!/
                }
                yes.onclick=function(){
                    data_num--;   /!*购买一台展台上的汽车数量就减少一台*!/

                    /!*展台汽车的实时数量*!/
                    data_num_parent.data('num',data_num);
                    data_num_parent.text(flag+" 剩余车辆数："+data_num);


                    /!*点击确定：弹窗隐藏+顾客移走*!/
                    e.target.appendChild(obj);
                    mask.style.display='none';
                    setTimeout(function(){
                        e.target.removeChild(obj);
                    },500);


                    newClient();  /!*移走一个就补上去一个*!/

                    clients_served.innerHTML = num + " clients";
                    $("#clients_queue .client:nth-child(1)").attr('draggable',true);/!*重新设置第一个开启拖拽*!/
                    car_num++;  /!*售买一辆就递增一辆*!/



                    /!*获取当前车的价钱*!/
                    car_total_price+=parseFloat(t_obj);   /!*计算已售卖汽车的总价钱*!/
                    /!*console.log(typeof(car_total_price), 67666);*!/
                    document.querySelector("#cars_sold").innerHTML = car_num + " cars";  /!*统计汽车售卖台数*!/
                    document.querySelector("#amount").innerHTML="€ "+parseFloat(car_total_price).toFixed('2'); /!*统计已售卖汽车的总价钱*!/
                }
            }
        }
    };*/




})

