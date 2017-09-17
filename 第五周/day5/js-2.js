//let a = 1;
//let b = 2;
//let c = 3;

//提取对象或数组的值,赋值给相应的变量,这叫解构

//数组解构赋值,数组是按次序排列的,变量的值取决于数组成员的位置
//let [a,b,c] = [1,3,2];
//let [a,[b,c],d] = [1,[3],5];// 变量解构失败时,c的值为undefined  不完全解构
//let [a,b,c] = [,,1];
//console.log(a,b,c);//undefined,undefined,1
//对变量设置默认值,右边值为undefined时,变量的默认值起作用
//let [a,b = 10,c] = [2,undefined,5];
//console.log(a,b,c);

//->对象的解构赋值,对象是无次序的,变量必须得跟属性名一样才能得到相应的值
//->变量名和属性名相同
//let {a,c} = {a:10,c:20};
//console.log(a,c);//10 20

//->变量名和属性名不一样?
//let {a:e,c:f,a,c} = {a:10,c:20};//把属性名复制放到左边,再把属性值赋值给变量
//console.log(e,f); //a,c 匹配模式(属性名) e,f才是变量
//console.log(a,c);

//嵌套的解构赋值
//let obj = {a:"hello", p:["world",{"c":11,"d":22}]};
////a p c d
//let {a:a,p,p:[e,{c,d}]} = obj;
//console.log(a,e,c,d);

//let person = {name:'zfpx',address:{province:'江苏',city:'南京'}};
//let {name,address:{province,city}} = person;
//console.log(name,province,city);

//字符串的解构赋值
//let [a,b,c,d,e] = "hello";
//console.log(a,b,c,d,e);

//函数解构赋值
function fn([x,y]){
    console.log(x+y);
}
fn([10,20]);






