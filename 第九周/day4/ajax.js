let extend = (_default, options) => {
    let obj = {};//合并后的对象
    for (let attr in _default) {
        if (!_default.hasOwnProperty(attr)) continue;
        obj[attr] = attr in options ? options[attr] : _default[attr]
    }
    return obj;
}

//{name:1,age:2} ->'name=1&age=2'
//转换成编码格式  encodeURI encodeURIComponent
let encodeObjectURI = (obj) => {
    //把obj每个属性名和属性值拿到,并且拼接成URI格式的
    let str = "";
    for (let attr in obj) {
        if (!obj.hasOwnProperty(attr)) continue;
        str += `${attr}=${encodeURIComponent(obj[attr])}&`;
    }
    str = str.slice(0, str.length - 1);
    return str;
};
let hasSearch = (url) => url.indexOf("?") > -1 ? "&" : "?";

let ajax = options => {
    let _default = {
        type: "get",
        url: null,
        async: true,
        cache: true,//true 走缓存 false 不走缓存
        data: null,
        dataType: "text",
        success: null,
        error: null
    }
    _default = extend(_default, options);
    let {type, url, async, cache, data, dataType, success, error} = _default;

    let xhr = new XMLHttpRequest();
    let regGet = /^(get|delete|head)$/i;
    let regPost = /^(post|put)$/i;
    if (!regGet.test(type) && !regPost.test(type)) return;
    if (data && regGet.test(type)) {
        if (Object.prototype.toString.call(data) == "[object Object]") {
            data = encodeObjectURI(data);
        }
        //把data放到url后面,放之前判断下url里是否有?,没有则?,有则加&
        url += `${hasSearch(url)}${data}`;
    }
    //若不走缓存,得在url地址后面加个随机数
    if (regGet.test(type) && cache == false) {
        url += `${hasSearch(url)}_=${Math.random()}`;
    }
    xhr.open(type, url, async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            let result = xhr.responseText;//json格式字符串
            switch (dataType) {
                case "json" :
                    result = "JSON" in window ? JSON.parse(result) : eval("(" + result + ")");
                    break;
                case "xml" :
                    result = xhr.responseXML;
                    break;
            }
            success && success(result);
        }
        if(xhr.readyState == 4&&/^(4|5)\d{2}$/.test(xhr.status)){
            error && error(xhr);
        }
    };
    if(regGet.test(type)){
        xhr.send(null)
    }else{
        xhr.send(JSON.stringify(data));
    }
}