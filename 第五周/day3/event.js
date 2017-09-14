function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
    }else{
        if(!ele["myBind"+type]){
            ele["myBind"+type] = [];
            ele.attachEvent("on"+type,function(){
                var e = window.event;
                run.call(ele,e)
            });
        }
        var a = ele["myBind"+type];
        for(var i = 0;i< a.length;i++){
            if(a[i]==fn){
                return;
            }
        }
        a.push(fn);

    }
}
function run(e){
    e.target = e.srcElement;
    e.pageX = e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
    e.pageY = e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
    e.preventDefault = function(){
        e.returnValue = false;
    };
    e.stopPropagation = function(){
        e.cancelBubble = true;
    };

    var type = e.type;
    var a = this["myBind"+type];
    for(var i = 0;i< a.length;i++){
        if(typeof a[i]=="function"){
            a[i].call(this,e);
        }else{
            a.splice(i,1);
            i--;
        }
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);

    }else{
        var a = ele["myBind"+type];
        for(var i = 0;i< a.length;i++){
            if(a[i]==fn){
                a[i]=null;
            }
        }
    }
}