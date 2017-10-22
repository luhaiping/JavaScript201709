function MyTab() {
    this.$bannerBox = $("#bannerBox");
    this.$oUl = this.$bannerBox.children("ul");
    this.$oLis = null;
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
    constructor: MyTab,
    init() {
        //1.获取数据
        this.getData();
        //2.绑定数据
         this.bindData();
        // //3.延迟加载
         this.showImg();
        // //4.自动轮播
        this.autoTimer = window.setInterval(()=>{
             this.autoMove();
         },2000);
        // //5.停止和启动轮播图
         this.overout();
        // //6.点击焦点切换轮播图
         this.clickTip();
        // //7.点击左右箭头
         this.handleChange()
    },
    getData(){
        $.ajax({
            type:"get",
            url:"json/banner.json",
            async:false,
            dataType:"json",
            success:(result)=>{
                this.resData = result;
            }
        })

    },
    bindData(){
       let strLi = "";
       let strTip = "";
       $.each(this.resData,function(index,item){
          strLi+= `<li><img src="" realImg="${item.img}" alt=""/></li>`;
          strTip+= index == 0?'<a href="javascript:void(0)" class="bg"></a>':'<a href="javascript:void(0)"></a>';
       })
       this.$oUl.html(strLi);
       this.$bannerTip.html(strTip);
    },
    showImg(){
        this.$oLis = this.$oUl.children("li");
        this.$oImgs = this.$oUl.find("img");
        this.$oImgs.each(function(index,item){
            let  tempImg = new Image();
            tempImg.src =$(item).attr("realImg");
            tempImg.onload = function(){
                item.src = this.src;
                if(index==0){
                   $(item).parent().css("zIndex",1).animate({opacity:1},1000);
                }
            }
        })
    },
    autoMove(){
        this.step++;
        if(this.step == this.$oLis.length){
            this.step = 0;
        }
        this.setBanner();
    },
    setBanner(){
        this.$oLis.each((index,item)=>{
            if(this.step == index){
                $(item).css("zIndex",1).animate({opacity:1},1000).siblings("li").css({zIndex:0}).animate({opacity:0},1000);
            }
        })
        this.changeTip();
    },
    changeTip(){
        this.$tipAs = this.$bannerTip.children("a");
        this.$tipAs.each((index,item)=>{
            if(index == this.step){
              $(item).addClass("bg").siblings("a").removeClass("bg");
            }
        })
    },
    overout(){
        this.$bannerBox.on("mouseover",()=>{
            window.clearInterval(this.autoTimer);
            this.$btnLeft.show();
            this.$btnRight.show();
        });
        this.$bannerBox.on("mouseout",()=>{
            this.$btnLeft.hide();
            this.$btnRight.hide();
            this.autoTimer = setInterval(()=>{
                this.autoMove();
            },2000)
        })
    },
    clickTip(){
        let _that = this;
        this.$tipAs = this.$bannerTip.children("a");
        this.$tipAs.on("click",function(){
           let index = $(this).index();
            _that.step = index;
            _that.setBanner();
        });
    },
    handleChange(){
        this.$btnRight.on("click",()=>{
            this.autoMove();
        });
        this.$btnLeft.on("click",()=>{
            this.step--;
            if(this.step<0){
                this.step = this.$oLis.length-1;
            }
            this.setBanner();
        })
    }
};
