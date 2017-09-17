//1.形参可以设置默认值
//function fn(x,y){
//    //默认值处理
//    x = x||10;
//    y = y||5;
//    console.log(x+y);
//}
//fn()

   //形参直接设置默认值,若传参,实参的值会覆盖形参的默认值
   // function fn(x=10,y=5){
   //     console.log(x+y);
   // }
   // fn();
   // fn(20,40);
   // fn(6)

//    let x = 20;
//    function fn(x,y = x){//形参是私有的变量
//    // let x = 40;//报错不能重复声明
//    console.log(y);
//}
//    fn(10);

//    let x = 20;
//    function fn(y=x){//es6中没有变量提升 ,这会x是全局下的x,不是私有的x
//        let x = 10;
//        console.log(y);
//    }
//    fn();

    //对象解构赋值的方式给形参赋值(是以对象的方法传参)
    //function fn({x=5,y=6}){//对象解构赋值也可以设置默认值
    //    console.log(x+y);
    //}
    //fn({});//用默认值
    //fn({x:10,y:7});
    //fn({y:20});
    //fn();//不行,左右两边都必须有值

     //rest参数代替arguments ,rest参数是数组类型.是个参数序列
     // function fn(...arr){
     //     console.log(arguments);//类数组还得转换成数组
     //     console.log(arr instanceof  Array);
     //     Math.max.apply(null,arguments);
     //     console.log(arr);数组
     //     console.log(Math.max(...arr));//Math.max(10,5,6);
     // }
      // fn(10,5,6);

     //es6里允许用"箭头"来表示函数
    /*function sum(x,t){
        console.log(x+y);
        return x+y;
    }*/
    //有一个形参
    //let sum = x=>x;
    //没有形参用()表示
    //let sum = ()=> x
    //多个形参
    //let sum  = (x,y)=>x+y;
    //代码块有多行代码 ,拿一个{}把这些代码包起来
    //  let sum = (x,y)=>{
    //      console.log(x+y);
    //      return x+y;
    //  }
    //   sum(10,5);
    //若返回的是对象
    //let sum = (x,y)=>({x:10,y:20});
    //相当于如下写法:
    //function sum(x,y){
    //    return {x:10,y:20};
    //}

    // let res = [1,2,3].map((x)=>x*x);
    //[1,2,3].map(function(x){
    //    return x*x;
    //})

     //let res = [1,3,2].sort((a,b)=> a-b);
     //console.log(res);
    let obj = {
        id:5,
        fn:fn
    };
    function fn(){
        setTimeout(()=>{
            return {id:this.id};
        },100);
    }
     obj.fn();
      fn.call({id:40});
    //箭头函数注意事项:
    //1.箭头函数里没有this关键字,this是外层方法的this或者说是函数定义所在的作用域里的this,跟函数的执行无关
    //2.箭头没有arguments,用rest参数
    //3.没有this,所以不能被当成构造函数,不能通过new去运行
    //4.没有this,apply,call,bind这些方法就没用了










