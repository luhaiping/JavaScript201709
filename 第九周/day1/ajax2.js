/**
 *
 * @param _default  设置默认值
 * @param options   传进来的对象
 */
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

//判断请求的url里是否有?,若有说明已经有传输的数据,再添加时得以&隔开,若没有?,则要添加?
let hasSearch = (url)=> url.indexOf("?")>-1?"&":"?";


//把对象转换成URI格式的字符串
//{name:"zf",age:8} ->'name="zf"&age=8'
let encodeObjURI = (obj)=>{
    let str = "";
    for(let key in obj){
        if(!obj.hasOwnProperty(key)) continue;
        str+=`${key}=${encodeURIComponent(obj[key])}&`;
    }
    str = str.slice(0,str.length-1);
    return str;
}

let ajax = (options) =>{
    let _default = {
        type:"get",
        url:null,
        async:true,
        cache:true,
        data:null,
        dataType:'text',
        success:null,
        error:null
    }
    _default = extend(_default,options);
    let {type,url,async,cache,data,dataType,success,error} = _default;

    //1第一步 创建ajax对象
    let xhr = new XMLHttpRequest();
    let regGet = /^(get|delete|head)$/i;
    let regPost = /^(post|put)$/i;
    if(!regGet.test(type) && !regPost.test(type)){
        return;
    }
    if(data){
        if(Object.prototype.toString.call(data)=="[object Object]"){
            data = encodeObjURI(data);
        }
        if(regGet.test(type)){
            url+=`${hasSearch(url)}${data}`;
            data = null;
        }
        //->不走缓存 cache==false
        if(regGet.test(type)&& cache===false){
            url+=`${hasSearch(url)}_=${Math.random()}`;
        }
    }

    //2.打开一个链接地址
    xhr.open(type,url,async);

    //3.监听请求
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            let result = xhr.responseText;
            switch (dataType){
                case "json":
                    result = "JSON" in window?JSON.parse(result):eval("("+result+")");
                    break;
                case "xml":
                    result = xhr.responseXML;
                    break
            }
            success&&success(result);
        }
        if(/^(4|5)\d{2}$/.test(xhr.status)){
            error&&error(xhr);
        }
    }
    //4.发送请求体里的内容
    xhr.send(data);
}




