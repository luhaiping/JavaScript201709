//console.log(a);
//let a = 10;
//let a = 20;

//if(true){
//   let a =10;
//}
//({"a":10}) //{}想要表示对象,则用()括起来
//console.log(a);

//let a = 10;
//let b = 15;
//let c = 20;
//let [a,b,c] = [10,20,30];
//let [a,[b,c]] = [10,[20],30];
//let [a,b = 10] =[20,];//解构赋值中变量可以设置默认值,不传,空项,undefined都会让默认值起作用

//数组解构赋值中,变量的值取决于后面的数组的位置,因为它是有序的
//对象它是无序的,变量名要跟属性名相等
//let {a,b} = {a:10,b:20};
//变量和属性是相匹配的,是一样的,1.先看是否相匹配,2.若匹配则把对应的属性值赋给变量,若不匹配则undefined
///console.log(a,b);

//适合于变量名和属性名 不相同的情况
//let {a:c,b:d} = {a:10,b:20};
//c,d代表变量 a,b表示匹配的属性
//console.log(c,d);
// let {aa:c} = {a:10};
//console.log(c);undefined

//复合的解构赋值
//let obj = {a:10,b:[2,{"aa":20}]};
//let {a,b,b:[x,{aa}]} = obj;
//console.log(a,b,aa);

//对对象设置属性和值,一些简写的写法 ,把变量或方法作为对象的属性和方法
//let foo = "boo";
//把foo变量作为对象的属性名,"boo"值作为对象的属性值
//let o = {foo};//{foo:"boo"}

//字符串的解构赋值
//let [a,b,c] = "hel";
//console.log(a,b,c);
//定义多个闭包,把所有的代码写在{}里就行
//{
//    let a = 10;
//    console.log(a);
//}
//
//{
//   let b = 10;
//    console.log(b);
//}
//
//for (let i = 0; i < 2; i++){
//    //console.log('inner',i);
//    let i = 100;
//}

//let [a,b , x] = [, , 3];
//console.log(a,b,x);
////模板字符串 `` 把变量包在${}里
//var name = 'zfpx',age = 8;
//let desc = `${name} is ${age} year old!`;
//console.log(desc);


/*
* 字符串方法
* includes() 这个字符串中是否包含这个字符串(一个或多个字符)
* startsWith() 在查找范围内,是否以这个字符串开头
* endsWith() 在查找范围内,是否以这个字符串结尾
* 这三个方法都可以设置第二个参数(n),表示查找的位置 includes和startsWith表示从索引n开始查找
* endsWith() 在索引n之前查找
* repeat() 返回一个新的字符串 将某个字符串重复n次
* */
//let str  = "hello world!";
//let res = str.includes("o",7);
//console.log(res);

//console.log(str.startsWith("world",6));
//console.log(str.endsWith("hello ",6));//在索引6之前是否以这个字符串结尾

//let str = "zf";
//let res = str.repeat(-0.9); //NaN,0到-1(不包含-1)之间的数是"",不是数字也会是""
//let res = str.repeat(2.8);//小数会向下取整
//console.log(res);





