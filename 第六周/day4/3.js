//函数

//1.形参可以设置默认值
//function fn(x,y=5){
//    console.log(y);
//}
//fn(10)

//2.通过数组解构赋值或者对象解构赋值来传参
//数组
//function fn([x=8,y=8]){
//    console.log(x+y);
//}
//fn([10,5]);
//fn([]);

//对象
//function fn({x,y=10}){
//    console.log(x+y);
//}
//fn({x:6,y:7});
//fn();//报错
//fn({y:7});


//形参的问题
//let x = 10;
//function fn(x,y=x){
//    console.log(y);
//}

//function fn(x,y=x){//形参是私有变量,不能重复声明
//    let x = 10;
//    console.log(y);
//}

//let x = 10;
//function fn(y=x){
//    console.log(y);
//}
//fn();

//rest参数
//function fn(...arr){//参数序列,是一个数组 箭头函数里获取参数的集合只能通过rest不能用arguments
//    console.log(arr);
//}
//fn(1,2,4);

//箭头函数

//let fn = v=>v;
//function fn(v){
//    return v;
//}
//若有多个参数用()括起来 若有多条语句用{}括起来,注意返回结果是个对象,用()把{}包起来

//let fn = (x,y)=>{
//    console.log(x+y);
//    return x+y;
//}
//
//let fn = (x,y)=>({x,y});//{x:x,y:y}

//1.箭头函数里没有this,this是指定义阶段作用域里的this,外层的this
//2.不能用arguments
//3.call,apply,bind都抛弃
//4.不能当成构造函数,用new去运行

//function  fn(){
//    window.setTimeout(()=>{
//        console.log(this);
//        return {id:this.id}
//    },1000);
//}
//var obj = {id:5};
//fn.call(obj);

//function Fn(){
//    this.x = 10;
//    this.y = 20;
//}
//Fn.prototype.a = function(){
//    console.log(this.x);
//}
//var f = new Fn();
//f.a();

class Father {  //通过class定义一个类
    constructor(x,y){//constructor写构造函数里的内容,私有的属性
       this.x = x;
       this.y = y;
    }
    a(){//原型上的内容
        console.log(this.x);
    }
}
var f = new Father(10,20);
f.a();

//Son类要继承与Father
class Son extends Father{//extends是es6这边实现继承的关键
    constructor(x,y,z){
        super(x,y);//super代码父类的构造函数,但是运行时,会把父类构造函数里的this改成子类的this,最终返回一个子类的实例
        //console.log(this.x);
        this.z = z;
    }
    b(){
        console.log("b");
    }
}
var s = new Son(10,20,30);
//console.log(s.x);
//s.a();
console.log(Son.prototype.__proto__ == Father.prototype);
//Son.prototype = Object.create(Father.prototype);




