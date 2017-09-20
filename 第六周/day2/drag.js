function EventEmitter(){

}
EventEmitter.prototype.on = function(type,fn){
    if(!this["emitter"+type]){
        this['emitter'+type] = [];
    }
    var a = this['emitter'+type];
    for(var  i = 0;i< a.length;i++){
        if(a[i]==fn){
            return;
        }
    }
    a.push(fn);
    return this;
}
EventEmitter.prototype.fire = function(type,e){
    var a = this["emitter"+type];
    if(a){
        for(var i = 0;i< a.length;i++){
            if(typeof  a[i]=="function"){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
    return this;
}
EventEmitter.prototype.off = function(type,fn){
    var a = this["emitter"+type];
    if(a){
        for(var i = 0;i< a.length;i++){
            if(a[i]==fn){
                a[i] = null;
            }
        }
    }
    return this;
}

function Drag(ele){
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;
    this.MOVE = null;
    this.UP = null;
    this.ele = ele;
    this.DOWN = processThis(this.down,this);
    on(this.ele,"mousedown",this.DOWN);
}
Drag.prototype = new EventEmitter();//Drag类继承于EventEmitter类
Drag.prototype.down = function(e){
    this.x = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx  = e.clientX;
    this.my = e.clientY;
    this.MOVE = processThis(this.move,this);
    this.UP = processThis(this.up,this);
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,"mouseup",this.UP);
    }else{
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
    this.fire("dragdown",e);

};
Drag.prototype.move = function(e){
    this.ele.style.left = this.x+(e.clientX-this.mx)+"px";
    this.ele.style.top = this.y +(e.clientY-this.my)+"px";
    this.fire("dragmove",e);

};
Drag.prototype.up = function(e){
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,"mousemove",this.MOVE);
        off(this.ele,"mouseup",this.UP);
    }else{
        off(document,"mousemove",this.MOVE);
        off(document,"mouseup",this.UP);
    }
    this.fire("dragup",e);

};
//1.drag类继承EventEmitter类,这样才能调用EventEmitter类的on(订阅)和fire(发布)
//2.按下时要执行事件标识"dragdown"上面列的所有的计划
//3.移动时要执行事件标识"dragmove"上面列的所有的计划
//4.松开鼠标时要执行事件标识"dragup"上面列的所有的计划