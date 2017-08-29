
~(function(){
//1.获取数据
    var resData = null;
    var xhr = new XMLHttpRequest();
    xhr.open("get","json/product.json",false);
    xhr.onreadystatechange = function(){
        //请求状态码
        //网络状态码(http状态码)
        if(xhr.readyState == 4&&/^2\d{2}$/.test(xhr.status)){
            resData = utils.toJSON(xhr.responseText);
        }
    }
    xhr.send(null);

//2.绑定数据
    var oUl = document.getElementById("list");
    var str = '';
    for(var i = 0;i<resData.length;i++){
        str+='<li data-time="'+resData[i].time+'" data-price="'+resData[i].price+'"  data-hot="'+resData[i].hot+'">' ;
        str+= '<img src="'+resData[i].img+'" alt=""/>';
        str+= '<span>'+resData[i].title+'</span>';
        str+= '<span>'+resData[i].time+'</span>';
        str+= '<span>'+resData[i].hot+'</span>';
        str+= '<span>￥'+resData[i].price+'</span>';
        str+='</li>'
    }
    oUl.innerHTML = str;
})();




//绑定点击事件
var menu  = document.getElementById("menu");
var linkA  = menu.getElementsByTagName("a");
for(var i = 0;i<linkA.length;i++){
    linkA[i].index = i;
    linkA[i].flag = -1;//假设没点击之前是按照降序排列
    linkA[i].onclick = function(){
        for(var j = 0;j<linkA.length;j++){
            if(this!=linkA[j]){//不是当前点击元素,都变成默认的降序排列
                linkA[j].flag = -1;
            }
        }
        //this.flag*=-1;
        this.flag = this.flag*-1;//=右边this.flag指上次排列的方式 =左边指点击之后这次的排列方式
        //传进入去flag值是1还是-1,是由你之前是升序排列还是降序排列决定的
        //->解决办法是通过自定义属性的方式把你之前排列的方式保存下来
        //listSort(this.index,this.flag);
        //最后一步优化listSort()方法里this关键字,默认是window,现在要改成当前点击的元素
        listSort.call(this);
    }
}
var oUl = document.getElementById("list");
var oLis = oUl.getElementsByTagName("li");
var aryLis = utils.listToAry(oLis);
function listSort(){
    var that = this;
    //点击a标签的索引
    var ary = ["data-time","data-price","data-hot"];
    aryLis.sort(function(cur,next){
        cur = cur.getAttribute(ary[that.index]);
        next = next.getAttribute(ary[that.index]);
        cur = cur.replace(/-/g,"");
        next = next.replace(/-/g,"");
        //升序排列flag=1 降序排列flag =-1;
        return (cur-next)*that.flag;
    })

    //把数组里排序好的li重新添加到页面上去
    var frg = document.createDocumentFragment();
    for(var i = 0;i<aryLis.length;i++){
        frg.appendChild(aryLis[i]);
    }
    oUl.appendChild(frg);
}