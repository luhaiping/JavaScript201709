//交换数据
let x = 10;
let y = 20;
[x,y] = [y,x];
console.log(x,y);

//->对函数的返回值进行解构赋值
function offset(){
    return {l:5,t:6};
}
let {l,t} = offset();
console.log(l,t);

//往数组和对象里添加东西
let obj = {};
let ary = [];
({a:obj.c,b:ary[0]} = {a:10,b:20});//{}在es6表示块级作用域,单独表示对象得用()括起来
//({a:obj.c,b:ary[0]}) = ({a:10,b:20}); //非解构变量中用,否则会报错 ,等号左边不要用小括号
console.log(obj,ary);


//获取返回回来的数据
let json = {
    code:0,
    id:24,
    data:[{},{}]
}
let {code,id,data} = json;
console.log(code,id,data);


