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
        str+="<li>";
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
        linkA[i].onclick = function(){
            //点击时做的事情是商品排序
            //传个点击的a标签的索引,让listSort()方法知道按照谁去排序
            listSort(this.index);
        }
    }

//->商品排序
    //1.获取元素,把类数组转换成数组
    //2.通过sort方法排序
    //3.在页面上排序好(把数组里的内容重新添加到页面上去)
    var oLis = oUl.getElementsByTagName("li");
    var ary = utils.listToArray(oLis);
    console.log(ary);
    function listSort(n){
        n = 2;//按照热度进行排序
        ary.sort(function(cur,next){
            cur = cur.getElementsByTagName("span")[2].innerHTML;
            next =  next.getElementsByTagName("span")[2].innerHTML;
            return cur-next;
        })
        var frg = document.createDocumentFragment();
        for(var i = 0;i<ary.length;i++){
            frg.appendChild(ary[i]);
        }
        oUl.appendChild(frg);
    }