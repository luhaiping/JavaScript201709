//->1.获取数据
var resData = null;//用来保存json格式对象
//1.创建ajax对象
var xhr = new XMLHttpRequest();
//2.打开一个链接地址
xhr.open("get","json/product.json",false);
//3.监听请求的数据
xhr.onreadystatechange = function(){
    //1.请求状态码(xhr.readyState)  网络状态码(xhr.status)
    if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
        resData =  utils.toJson(xhr.responseText)
    }
}
//4.发送请求
xhr.send(null);


//->2.绑定数据
    var oUl = document.getElementById("list");
    var str = "";
    for(var i = 0;i<resData.length;i++){
        //把所需要的DOM元素的内容作为li自定义属性的值保存下来 自定义属性名用data-xxx
        str+="<li data-time='"+resData[i].time+"'  data-price='"+resData[i].price+"' data-hot='"+resData[i].hot+"' >";
        str+="<img src='"+resData[i].img+"'/>";
        str+="<span>"+resData[i].title+"</span>";
        str+="<span>"+resData[i].time+"</span>";
        str+="<span>"+resData[i].hot+"</span>";
        str+="<span>￥"+resData[i].price+"</span>";
        str+="</li>";
    }
    oUl.innerHTML = str;

//->3.绑定点击事件
    var menu = document.getElementById("menu");
    var linkA = menu.getElementsByTagName("a");//集合
    for(var i = 0;i<linkA.length;i++){
        linkA[i].index = i;
        linkA[i].flag = -1;//没点之前默认是降序
        linkA[i].onclick = function(){
             this.flag=this.flag*-1;//->this.flag*=-1
            //点击时做的事情是商品排序
            //传个点击的a标签的索引,让listSort()方法知道按照谁去排序
            //listSort(this.index,this.flag);
            listSort.call(this);
        }
    }
    /*
     如果a.flag = -1降序 a.flag = 1 升序
     return (curItem-nextItem)*1
     return (curItem-nextItem)*-1
     //listSort方法运行时 flag要么是1,要么是-1
      //传进来flag 是1 表示按照升序排序
     //传进来flag 是-1 表示按照降序排序

     //得知道之前是按升序排列还是按降序排序
     假设没点之前所有的按降序排序 a标签通过a.flag = -1;
     //第一次点击a   a.flag*=-1  ->a.flag = 1
     //第二次点击a   a.flag*=-1  ->a.flag = -1
     //第三次点击a   a.flag*=-1 ->a.flag = 1
    * */


//->商品排序
    var oLis = oUl.getElementsByTagName("li");
    var ary = utils.listToArray(oLis);

    //升序 从小到大排列
    //降序 从大到小排序
    function listSort(){
        //console.log(this);
        var that = this;
        var dataAry = ["data-time","data-price","data-hot"];
        //dataAry[n];//相对应的自定义属性名
        ary.sort(function(cur,next){
            var curItem =  cur.getAttribute(dataAry[that.index]);
            var nextItem = next.getAttribute(dataAry[that.index]);
            curItem = curItem.replace(/-/g,"");
            nextItem = nextItem.replace(/-/g,"");
            return (curItem-nextItem)*that.flag;
        });

        var frg = document.createDocumentFragment();
        for(var i = 0;i<ary.length;i++){
            frg.appendChild(ary[i]);
        }
        oUl.appendChild(frg);
    }

/*
商品排序的逻辑:
1.获取数据
2.绑定数据
3.绑定点击事件
    ->1.获取点击a的索引
    ->2.通过自定义属性方式保存下没点击前排序是按降序排列(难点,是一种技巧)
4.商品排序(不是操作DOM元素的值,而是操作的是自定义属性值)
    ->1.获取要排序内容的自定义属性名
    ->2.根据属性名获取到自定义属性值,然后进行排序
    ->3.把数组中排序好的li重新添加到页面上去
* */




