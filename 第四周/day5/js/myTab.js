function MyTab(){
    this.$bannerBox = $("#bannerBox");
    this.$oUl = this.$bannerBox.children("ul");
    this.$oLis = null;//jquery中不存在映射关系
    this.$oImgs = null;
    this.$bannerTip = $('.bannerTip');
    this.$tipAs = null;
    this.$btnLeft = $(".btnLeft");
    this.$btnRight = $(".btnRight");
    this.resData = null;
    this.step = 0;
    this.autoTimer = null;
    this.init();
}
MyTab.prototype = {
    constructor:MyTab,
    init(){
       //1.获取数据
        this.getData();
       //2.绑定数据
        this.bindData();
       //3.延迟加载
        this.showImg();
       //4.自动轮播
        this.autoTimer = window.setInterval(()=>{
            this.autoMove();
        },2000);
       // //5.启动和停止轮播图
        this.overout();
       // //6.点击焦点切换
        this.clickTip();
       // //7.左右切换
      this.handleChange();
    },
    getData(){
        $.ajax({
            type: "get",
            url: "json/banner.json",
            async: false,
            dataType: "json",
            success: (res)=>{
                this.resData = res;
            }
        });
    },
    bindData(){
        let strLi = '';
        let strTip = '';
        $.each(this.resData,(index,item)=>{
            strLi+=`<li><img src="${item.img}" realImg = "${item.img}"/></li>`;
            strTip+= index==0?"<a href='javascript:void(0)'  class='bg'></a>":"<a href='javascript:void(0)' ></a>"
        })
        this.$oUl.html(strLi);
        this.$bannerTip.html(strTip);
    },
    showImg(){
        this.$oLis = this.$oUl.children('li');
        this.$oImgs = this.$oUl.find("img");
        this.$oImgs.each((index,item)=>{
            let tempImg = new Image();
            tempImg.src = $(item).attr('realImg');
            tempImg.onload = function(){
                item.src = this.src;
                if(index == 0){
                    $(item).parent().css({zIndex:1}).animate({"opacity":1},1000);
                }
            }
        })
    },
    autoMove(){
        this.step++;
        if(this.step ==this.$oLis.length){
            this.step = 0;
        }
        this.setBanner();
    },
    setBanner(){
        //让当前li的zIndex,opacity变为1,其他变为0
        this.$oLis.each((index,item)=>{
            if(index == this.step){
                $(item).css('zIndex',1).animate({opacity:1},1000).siblings("li").css({zIndex:0,opacity:0});
            }
        });
        this.changeTip();
    },
    changeTip(){
        this.$tipAs = this.$bannerTip.find("a");
        this.$tipAs.each((index,item)=>{
            index==this.step?$(item).addClass("bg"):$(item).removeClass("bg");
        })
    },
    overout(){
        this.$bannerBox.on("mouseover",()=>{
            clearInterval(this.autoTimer);
            this.$btnLeft.show();
            this.$btnRight.show();
        })
        this.$bannerBox.on("mouseout",()=>{
            this.autoTimer = setInterval(()=>{
                this.autoMove();
            },2000);
            this.$btnLeft.hide();
            this.$btnRight.hide();
        })

    },
    clickTip(){
        //点击焦点切换
        this.$tipAs = this.$bannerTip.find("a");
        let _that = this;
        this.$tipAs.on("click",function(){
            // if(this.$oLis.is(":animated")) return;
            let index = $(this).index();
            _that.step = index;
            _that.setBanner();
        });
    },
    handleChange(){
        this.$btnRight.on("click",()=>{
            // if(this.$oLis.is(":animated")) return;
            this.autoMove();
        })
        this.$btnLeft.on("click",()=>{
            // if(this.$oLis.is(":animated")) return;
            this.step--;
            this.step<0?this.step = this.$oLis.length-1:null;
            this.setBanner();
        })
    }




}