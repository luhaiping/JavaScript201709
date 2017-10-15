//控制菜单的显示和隐藏
~(function(){
    var $menu = $(".menu"),
        $nav = $(".nav");
        $menu.singleTap(function(){
            $nav.toggleClass("navTarget");
        })
})();

//设置match这块的逻辑
~(function(){
    var $match = $(".match");
    function bindHtml(data){
        //1.获取模板结构
        var mathTempCon = $("#matchTemp").html();
        //2.将模板结构和数据都交给ejs模板引擎渲染
        var result = ejs.render(mathTempCon,{matchData:data});
        //3.把返回的字符串放入该放的地方
        $match.html(result);
    }
    function bind(){
        var $bot = $(".bot"),
            $botLeft = $(".bot>.left"),
            $botRight = $(".bot>.right"),
            $process = $(".process");


        //1.求出进度条的宽度(百分比)
            function pro(){
                var total = parseInt($botLeft.html())+parseInt($botRight.html());
                var percentage = parseInt($botLeft.html())/total;
                $process.css('width',percentage*100+"%");
            }
            pro()


        //获取到本地数据,然后把上次操作的设置下
        var match = JSON.parse(localStorage.getItem("match"));
        if(match){
            if(match.support==1){
                $botLeft.addClass("other");
            }else{
                $botRight.addClass("other");
            }
            return;
        }

        //2.给小手绑定点击事件,并添加选中效果
        $botLeft.singleTap(fn);
        $botRight.singleTap(fn);
        function fn(){
            if($bot.attr('isTap')) return;
            //让当前的点赞数+1
            $(this).html(parseInt($(this).html())+1).addClass('other');
            //更新进度条
            pro();
            //在$bot上添加自定义属性标识下,已经点击了
            $bot.attr("isTap",true);

            //存储数据 :点击的是左边还是右边 是否点击也存储下来
            var support = $(this).hasClass("left")?1:2;
            var obj = {
               support:support,
               isTap:true
            };
            localStorage.setItem("match",JSON.stringify(obj));
        }
    }

    $.ajax({
        url:"http://matchweb.sports.qq.com/html/matchDetail?mid=100002:2365",
        type:"get",
        dataType:"jsonp",
        success:function(result){
            var data = result[1];
            if(data){
                bindHtml(data);
                window.setTimeout(function(){
                   bind();
                },500)//为了数据完全绑定成功之后,再去操作
            }


        }
    })

})();