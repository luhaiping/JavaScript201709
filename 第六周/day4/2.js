//扩展运算符...
//let a1 = [1,2];
//let b1 = [3,4];
//let ary = [...a1,...b1];//合并数组
//let ary1 =[10,20,...a1];
//console.log(ary1);
//let max = [10,20,5,7,13,26];
//es5
//console.log(Math.max.apply(null, max));
//console.log(Math.max(...max));//可以替代apply方法

/*
* 数组的方法
* Array.from  把类数组(arguments或元素集合)转换成数组
* Array.of  把一组数转换成数组
*
*
* */
//function fn(){
//    return Array.from(arguments);
//}
//console.log(fn(1, 2, 3));
//var oLis = document.getElementsByTagName("li");
//var aLis = Array.from(oLis);

//var ary = Array(3);//数组长度是3项 Array(3)
//var ary = Array(NaN);//报错

//console.log(ary);
console.log(Array.of(3));//[3];
console.log(Array.of(NaN));//[NaN]
console.log(Array.of(10, 30));//[10,30] //替换Array或者new Array()这种方式创建数组

//copyWithin(target,start,end) 把数组的某些项复制到数组中(会覆盖数组中原来项);
//target 从目标位置替换
//start  从这个位置开始读取
//end    从这个位置结束读取 超出长度或者没写,都表示读取到最后

//var ary = [10,4,15,3,7];
//var res  = ary.copyWithin(1,2,4);//[10,15,3,3,7]
//var res = ary.copyWithin(1,-3,-1);//负数表示倒数第几个
//console.log(res);

//find 返回匹配的这一项
//findIndex 返回匹配这一项的索引
//let res = ary.find(function(item,index,ary){
//    return item<10;
//});
//let res = ary.find((...arr)=>{console.log(arr)});

//let res = ary.findIndex((item)=>item<2);//替换indexof()
//console.log(res);

//let arr = [1, 2 ,3, 3, 4, 5];
//let findIndex = arr.findIndex((item, index, arr) => {
//    return item === 3;
//});
//
//console.log(findIndex);

//fill按照指定值来填充数组,第二个参数和第三个参数 起始填空位置和结束填充位置
//var res = Array(3).fill(7);
//let ary = [5,"a",7,3,4];
//let res = ary.fill(10,1,3);
//console.log(res);

//for....of.... 遍历数组或类数组

var ary = [5,"a",7,3,4];
//for(var value of ary){
//    console.log(value);//把每一项遍历出来
//}

//for(var index of ary.keys()){
//    console.log(index);//把每一项的索引遍历出来
//}

//for(var ele of ary.entries()){
//    console.log(ele);//[索引,数组的成员]
//}

//对象的方法
//==会自动类型转换,=== 中NaN不相当,js中缺少一种判断只要是值相等,就该返回为true
//console.log(Object.is(NaN, NaN));//对比两个值是否相等

//Object.assign(target,source1,source2)//第一个参数是目标对象,第二个参数开始是源对象
var oTarget = {c:3};
var obj1 = {a:1};
var obj2 = {b:2};
//console.log(Object.assign(oTarget, obj1, obj2));//合并对象
let obj = {...oTarget,...obj1,...obj2};//对象扩展运算符的用法
console.log(obj);

//注意若只有一个参数,返回的是原对象
console.log(Object.assign(oTarget)==oTarget);//true
Object.assign({}, oTarget);//克隆对象


