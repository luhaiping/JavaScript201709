/*
 ~(function(){
 var utils = {
 listToArray:listToArray,
 a:a,
 b:b
 }
 function listToArray(arg){
 var ary = [];
 try{
 ary =  [].slice.call(arg);//标准浏览器转换的方式
 }catch(e){
 for(var  i = 0;i<arg.length;i++){//IE6~IE8处理的方式
 ary[i] = arg[i];
 }
 }
 return ary;
 }

 function a(){
 console.log('a');
 }

 function b(){
 console.log("b");
 }
 window.utils = utils;
 })();
 */

var utils = (function () {
    function listToArray(arg) {
        var ary = [];
        try {
            ary = [].slice.call(arg);//标准浏览器转换的方式
        } catch (e) {
            for (var i = 0; i < arg.length; i++) {//IE6~IE8处理的方式
                ary[i] = arg[i];
            }
        }
        return ary;
    }

    function toJSON(objStr) {
       /* var obj = null;
        try {
            obj = JSON.parse(objStr);
        } catch (e) {
            obj = eval("(" + objStr + ")");
        }
        return obj;*/
      return   "JSON" in window? JSON.parse(objStr):eval("(" + objStr + ")");
    }


    return {
        listToArray: listToArray,
        toJSON:toJSON
    }
})();



