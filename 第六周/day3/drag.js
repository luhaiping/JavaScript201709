function EventEmitter(){

}
EventEmitter.prototype.on = function(type,fn){
    if(!this["emitter"+type]){
        this['emitter'+type] = [];
    }
    var a = this['emitter'+type];
    for(var i = 0;i< a.length;i++){
        if(a[i]==fn){
            return;
        }
    }

    a.push(fn);
};
EventEmitter.prototype.fire = function(type,e){
    var a = this["emitter"+type];
    if(a&& a.length>0){
        for(var  i = 0;i< a.length;i++){
            if(typeof a[i]=="function"){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
};
EventEmitter.prototype.off = function(type,fn){
    var a = this["emitter"+type];
    if(a&& a.length>0){
        for(var i = 0;i< a.length;i++){
            if(a[i]==fn){
                a[i] = null;
            }
        }
    }
};

function Drag(ele){
    this.x = null;
    this.y = null;
    this.mx = null;
    this.my = null;
    this.ele = ele;
    var DOWN =  processThis(this.down,this);
    on(this.ele,"mousedown",DOWN);
}
Drag.prototype = new EventEmitter();
Drag.prototype.down = function(e){
    this.x  = this.ele.offsetLeft;
    this.y = this.ele.offsetTop;
    this.mx = e.clientX;
    this.my = e.clientY;
    this.MOVE = processThis(this.move,this);
    this.UP = processThis(this.up,this);
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,"mousemove",this.MOVE);
        on(this.ele,"mouseup", this.UP);
    }else{
        on(document,"mousemove",this.MOVE) ;
        on(document,"mouseup",this.UP);
    }
    e.preventDefault();
    this.fire("dragdown",e);
};
Drag.prototype.move = function(e){

    this.ele.style.left = this.x +(e.clientX-this.mx)+"px";
    this.ele.style.top = this.y+(e.clientY-this.my)+"px";
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
