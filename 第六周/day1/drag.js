function down(e){
    this.x = this.offsetLeft;
    this.y  = this.offsetTop;
    this.mx = e.clientX;
    this.my = e.clientY;
    if(this.setCapture){
        this.setCapture();
        on(this,"mousemove",move);
        on(this,"mouseup",up);
    }else{
        this.MOVE = processThis(move,this);
        this.UP = processThis(up,this);
        on(document,"mousemove",this.MOVE);
        on(document,"mouseup",this.UP );
    }
    fire.call(this,"selfDragDown",e);
}
function move(e){
    this.style.left = this.x+ (e.clientX-this.mx)+"px";
    this.style.top = this.y + (e.clientY-this.my)+"px";
    fire.call(this,"selfDragMove",e);
}
function up(e){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,"mousemove",move);
        off(this,"mouseup",up);
    }else{
        off(document,'mousemove',this.MOVE);
        off(document,"mouseup",this.UP);
    }
    fire.call(this,"selfDragUp",e);
}
