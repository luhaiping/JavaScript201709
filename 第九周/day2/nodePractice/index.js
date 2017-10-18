let oUl = document.getElementById("oUl");
let oLis = oUl.getElementsByTagName("li");
[].forEach.call(oLis,function(item,index){
    item.style.background="pink";
});