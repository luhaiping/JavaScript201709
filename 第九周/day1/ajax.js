~(function(){
    let extend = (_default,options)=>{
        let  o = {};
        for(let n in _default){
            if(!_default.hasOwnProperty(n)) continue;
            if(!/^(cache|async)$/.test(n)){
                o[n] = options[n]||_default[n];
            }else{
                o[n] = n in options ?options[n]:_default[n];
            }
        }
        return o;
    };

let hasSearch = (url)=>url.indexOf("?")>-1?"&":"?";

//把对象{name:"zf",age:8}转换成uri格式的字符串  'name="zf"&age=8'
let encodeObjUri = (data)=>{
    let str = '';
    for(let key in data){
       str+= `${key}=${encodeURIComponent(data[key])}&`;
    }
    str = str.slice(0,str.length-1);
    return str;
};
//传进来的值作为uri进行编码
//encodeuri() /?#&..这些字符不进行编码
//encodeURIComponent() 对大部分所有的字符都进行编码

let ajax = (options) => {
    let  _default = {
        type:"get",
        url:null,
        async:true,
        cache:true,
        data:null,
        dataType:"text",
        success:null,
        error:null
    };
   _default = extend(_default,options);
   let {type,url,async,cache,data,dataType,success,error} = _default;

   //1.->创建Ajax对象
    let xhr = new XMLHttpRequest();
    //对get系列方式的判断   get |delete|head
    let regGet = /^(get|delete|head)$/i;
    let regPos = /^(post|put)$/i;
    if(!regGet.test(type) && !regPos.test(type)){
        return ;
    }
    //数据存在,则把发送数据放在url后面
    if(data){
        if(Object.prototype.toString.call(data)=="[object Object]"){
            data = encodeObjUri(data);//对象转换成uri字符串
        }
       if(regGet.test(type)){
           //url = "http://www.baidu.com?name='a'&age=8";
        url+=`${hasSearch(url)}${data}`;
        data = null;
       }
    }
    //->处理缓存,若是get方式并且不需要缓存 cache=false
    if(regGet.test(type)&& cache === false){
        url+=`${hasSearch(url)}_=${Math.random()}`;
    }

    //2.打开一个链接地址
    xhr.open(type,url,async);

    //3.监听请求
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            let result = xhr.responseText;//JSON格式的字符串
            switch (dataType){
                case "json":
                    result = "JSON" in window?JSON.parse(result):eval("("+result+")");
                    break;
                case "xml":
                    result = xhr.responseXML;
                    break;
            }
           success&&success(result);
        }
        if(/^(4|5)\d{2}$/.test(xhr.status)){
            error&&error(xhr);
        }
    }
   //4.发送数据

   xhr.send(data);//get方式不通过send传输数据 data得是null,post方式才把数据放在请求体发送给服务器
}
window.ajax = ajax;
})();