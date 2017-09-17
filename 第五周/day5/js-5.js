//let foo = "hello";
////{foo:"hello"}
//let bar = {foo};
//console.log(bar);
//
// function fn(){
//     var x = 1;
//     var y = 10; //{x:1,y:10};
//     return {x,y};
// }
//let {x,y}  =fn();
//console.log(x,y);

    //let obj = {
    //    a:"aa",
    //    fn:function(x){
    //        return x*x;
    //    }
    //}
    let type="click";
    let obj = {
        a:"aa",
        fn(x){
            return x*x;
        },
        ["my"+type](){//方法名还可以是个表达式
            console.log(111);
        }
    };

    //console.log(obj.fn(5));
    //obj["myclick"]();

    //function sum(){
    //    return 5;
    //}
    //let sum = ()=>5
