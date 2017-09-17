//全局作用域和私有作用域 es6增加块级作用域 {}相当于一个闭包(function(){})()
//for(let  i = 0;i<10;i++){
// console.log(i);
//}
var oLis = document.getElementsByTagName("li");
for(let i = 0;i<oLis.length;i++){//每次循环都会创建一个私有的作用域
  oLis[i].onclick = function(){
     alert(i);
  }
}

if(true){
 //let c = 10;
 const PI = 3.14159265358;
 console.log(PI);
}









