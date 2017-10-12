
//http://localhost:63342/day3/腾讯体育/index.html?_ijt=86s5cf3d8rc3bgti6aj4jrt41b?zf="8"&aa=cc;
function query(str){
    var reg = /([^?&=#]+)=([^?&=#]+)/g;
    var obj = {};
    str.replace(reg,function($0,$1,$2){
        obj[$1] = $2;
    });
    reg = /(#[^?&=#]+)/;
    if(reg.test(str)){
        obj["hash"] = RegExp.$1;
    }
    return  obj;
}
// var str = "http://localhost:63342/day3/腾讯体育/index.html?zf=8&aa=cc#p1";
// console.log(query(str));

//->格式化日期
//"2017-10-12"
function formatTime(template){
    template = template||"{0}年{1}月{2}日 {3}时{4}分{5}秒";
    var strAry = this.match(/\d+/g);//[2017,10,12];
    template = template.replace(/{(\d)}/g,function($0,$1){
        return strAry[$1];
    });
    return template;
}
String.prototype.formatTime = formatTime;


~(function(){
   var $main = $(".main"),
       $menu = $(".menu"),
       $headerWrap = $(".headerWrap");
    function fn(){
        //获取整屏的高度  innerHeight() ->clientHeight  outerHeight()->offsetHeight()
        var $winT = $(window).innerHeight();
        var $headerT = $headerWrap.outerHeight();
        $main.css("height",$winT-$headerT-40);
        $menu.css("height",$winT-$headerT-40-2);
    }
    fn();
    //窗口发生改变时监听的事件是resize
    $(window).on("resize",fn);
})();

/*menu区域的逻辑
* 1.获取动态数据,通过ejs模板来绑定数据
*   1)引入ejs.min.js文件
*   2)获取动态数据,分析获取到的数据,在页面构建好模板结构
*   3)把模板结构和动态数据交给ejs模板引擎渲染,渲染后返回一个拼接好的字符串
*   4)把字符串放入相应的位置上
* 2.实现局部滚动
* 3.通过url地址中的hash选中对应的A标签,若没有hash值则第一个A标签选中
* 4.对每个A标签绑定点击事件
* */

var menuRender = (function(){
    var $menu = $(".menu"),
        $menuUl = $menu.children("ul"),
        $menuA = null,
        myScroll = null;
    function bindHtml(data){
        //1.获取模板结构的内容
        var $menuTemp = $("#menuTemplate").html();
        //2.交给ejs模板引擎渲染
        var result = ejs.render($menuTemp,{menuData:data});//menuData一定要跟模板结构里的遍历的数据名一致,渲染结束后返回拼接好的字符串
        //3.放在相应的位置上
        $menuUl.html(result);
    }
    /*局部滚动实现的原理:
    * 1.必须要有两个容器,一个外容器,一个内容器
    * 2.外容器的高度(宽度)是固定的,内容器的高度(宽度)得大于外容器的高度(宽度) myScroll.refresh();
    * 3.滚动条是通过改变transform属性下的translate()方法值移动的
    * 4.若需要滚动条,则在外容器里添加<div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="position: absolute; z-index: 9999; width: 7px; bottom: 2px; top: 2px; right: 1px; overflow: hidden; pointer-events: none; transform: translateZ(0px); transition-duration: 500ms; opacity: 0;"></div>
    * 设置了绝对定位,若不设置参照物则以body为参照物,若想滚动条在容器里,则得把外容器设置成参照物
    * 5.滚动到相应的位置 myScroll.scrollTo(x,y,duration)
    *   滚动到相应的元素 myScroll.scrollToElement(ele,duration) ele是js对象
    *
    * */
    function partIscroll(){

        //初始化scroll
        myScroll = new IScroll(".menu",{
            scrollbars: true,  //添加滚动条
            mouseWheel: true , //通过滚轮控制滚动条
            //bounce:false  //去掉反弹效果
            fadeScrollbars:true //滚动时有滚动条,不滚动时滚动条消失

        })
        //console.dir(myScroll.options)
    }

    function getLocation(){
        var url = window.location.href;//获取到url
        var hash = url.slice(url.lastIndexOf("#"));//#p1
        $menuA = $menu.find("a");
        //查看每个a标签的href值是否和hash相匹配
        var $cur = $menuA.filter('[href="'+hash+'"]');
        $cur.length==0?$cur=$menuA.eq(0):null;
        $cur.addClass("bg");
        //滚动到当前hash的这个元素
        myScroll.scrollToElement($cur[0],300);


        //根据id值获取赛事数据
        calenderRender.init($cur.attr("data-id"));
    }
    function bindA(){
        $menuA.on("click",function(){
            $(this).addClass("bg").parent().siblings().children("a").removeClass("bg");
            //根据id值获取赛事数据
            calenderRender.init($(this).attr("data-id"));
        })
    }

    return {
        init:function(){
            $.ajax({
                url:"json/menu.json",
                type:"get",
                dataType:"json",
                success:function(data){
                   bindHtml(data);
                   partIscroll();
                   getLocation();
                   bindA();
                }
            })
        }
    }
})()
menuRender.init();


//跨域:协议,域名,端口号只要有一个不一样,就是不同域,跨域,通过jsonp请求数据
//同域
//url地址 协议(http://),域名,端口号
//赛事日期的逻辑
//1.通过ejs模板绑定数据
//2.从所有的A标签中对今天的日期设置选中效果,若没有找到,则选中往后最近的日期,若都没有,则选中最后一个日期
//3.把选中的日期显示在显示区域的中间位置
//4.实现左右切换效果,把显示区域的第一个日期设置成选中效果


var calenderRender = (function(){
    var $wrapper = $(".wrapper"),
        $linkA = null,
        maxL = 0,
        minL = null;
    var  $callbacks = $.Callbacks();//安排一个程序池
    // $callbacks.add()添加方法 $callbacks.remove() 移除方法 $callbacks.fire() 执行计划

    //->通过ejs绑定数据
    $callbacks.add(function(today,data){
        var $calenderTemp = $("#calenderTemplate").html();
        var result = ejs.render($calenderTemp,{calenderData:data});
        $wrapper.html(result).css("width",data.length*110+"px");
    });


    $callbacks.add(function(today,data){
        //1.从所有A标签中筛选出 data-time值和today一样的这个A标签
        $linkA = $wrapper.find("a");
        var $cur = $linkA.filter("[data-time='"+today+"']");
        today = today.replace(/-/g,"");
        console.log($cur.length);
        if($cur.length==0){
            $linkA.each(function(index,item){
                var dataTime = $(item).attr("data-time").replace(/-/g,"");
                if(parseInt(dataTime)>parseInt(today)){
                    $cur = $(item);
                    return false;
                }
            })
            //全部找完后也没找到离今天日期往后最近的A标签,则让最后一个A标签选中
            if($cur.length == 0){
                $cur = $linkA.eq($linkA.length-1);
            }
        }
        $cur.addClass("bg");
        //让选中的A移动到显示区域的第一个位置 = wrapper往左移动110*选中的A标签的索引
        var curL = -$cur.index()*110+110*3;
        //边界问题 maxL = 0 ; minL = -($wrapper.width()-770)
        minL = -($wrapper.width()-770);
        curL = curL > maxL ? maxL : (curL < minL ? minL : curL);//边界处理
        $wrapper.stop().animate({left:curL+"px"});
    });

    //->左右切换
    //左边箭头 日期往前七天  右边箭头 日期往后七天
    $callbacks.add(function(today,data,columnId){
        var $btn = $(".btn");
        $btn.on("click",function(){
            //判断下是左边箭头还是右边箭头->通过类名判断
            var curL =parseFloat($wrapper.css("left"));
            console.log(curL);
            $(this).hasClass("btnLeft")?curL+=770:curL-=770;
            curL = curL>maxL?maxL:(curL<minL?minL:curL); //处理边界
            $wrapper.stop().animate({left:curL+"px"});
            //对显示区域的第一个A标签设置选中效果,其他A标签的选中效果去掉
            //->得知道第一个A标签的索引  curL/110
            var index = Math.abs(curL/110);
            $linkA.eq(index).addClass("bg").siblings().removeClass("bg");

            var start =$linkA.eq(index).attr("data-time");
            var end = $linkA.eq(index+6).attr("data-time");
            //获取赛事日期的详细信息
            matchRender.init(columnId,start,end);

        })
    });



    return {
        init :function(columnId){
            $.ajax({
                url:"http://matchweb.sports.qq.com/matchUnion/calendar?columnId="+columnId,
                type:"get",
                dataType:"jsonp",
                success : function(result){
                   if(result&&result.code==0){
                       var data = result.data;
                       var today = data.today;//获取到的今天的日期
                        data  = data.data;//所有的赛事数据
                        $callbacks.fire(today,data,columnId);
                   }
                }

            })
        }
    }
})();


var matchRender = (function(){
    return  {
        //http://matchweb.sports.qq.com/matchUnion/list?startTime=2017-09-16&endTime=2017-09-24&columnId=21
        init : function(columnId,start,end){

        }
    }
})()