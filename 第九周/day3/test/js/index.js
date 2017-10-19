let oLis = document.querySelectorAll("#list>li");
let oLisAry = Array.from(oLis);
oLisAry.forEach(function(item,index){
    item.style.backgroundColor="pink";
});

