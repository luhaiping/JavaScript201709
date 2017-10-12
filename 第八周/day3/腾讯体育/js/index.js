
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
    }
    function bindA(){
        $menuA.on("click",function(){

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


