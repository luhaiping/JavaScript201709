var utils = (function () {
    /**
     * 类数组转换成数组
     * @param likeAry
     */
    function listToArray(likeAry) {

    }

    /**
     * 将JSON格式的字符串转换成JSON格式的对象
     * @param str JSON格式的字符串
     */
    function toJSON(str) {

    }

    /**
     * 获取某个元素到body的上偏移和左偏移
     * @param ele 当前的元素
     */
    function offset(ele) {

    }

    /**
     * 获取任意css样式
     * @param ele 当前元素
     * @param attr css属性
     */
    function getCss(ele,attr){
        var res = null;
        if(typeof getComputedStyle =="function"){
            res = window.getComputedStyle(ele,null)[attr];
        }else{

            if(attr =="opacity"){
                res = ele.currentStyle.filter;//"alpha(opacity = 50)"
                var reg = /^alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)$/;
                res = reg.test(res)?RegExp.$1/100:1;
            }else{
                res = ele.currentStyle[attr];
            }
        }

        var reg = /^[+-]?(?:\d+(?:\.\d+)?)(?:px|rem|pt|em)?$/i;
        return reg.test(res)?parseFloat(res):res;
    }

    /**
     *
     * @param ele 当前元素
     * @param attr css属性
     * @param value css属性值
     */
    function setCss(ele,attr,value){

    }

    /**
     * 批量设置css样式
     * @param ele 当前元素
     * @param opt 对象类型 -每一项是css属性和css属性值
     */
    function setGroup(ele,opt){

    }

    /**
     *通过参数确定是调用哪个方法(getCss,setCss,setGroup)
     */

    function css(){

    }



    /**
     * 获取client系列,offset系列,scroll系列的值
     * 当前这个元素是文档(body)某个属性值->document.documentElement[xxx]||document.body[xxx];
     * @param attr 属性名,例如:clientHeight,scrollHeight
     * @param value 属性值->scrollLeft和scrollTop  11个属性是可读的 ,这两个还可写
     */
    function win(attr,value){

    }

    /**
     * 获取某个区间(n-m)之间的随机数
     * @param n
     * @param m
     */
    function rnd(n,m){

    }

    /**
     * 通过类名查找元素
     * @param strClass 一个或多个类名
     * @param context 上下文 范围(可选) 默认是document
     */

    function getByClass(strClass,context){
        context = context||document;
        if(document.getElementsByClassName){
           return listToArray(context.getElementsByClassName(strClass));
        }
        var eles = context.getElementsByTagName("*");
        var aryClass = strClass.replace(/(^ +)|( +$)/g,"").split(/ +/g);
        for(var i = 0;i<aryClass.length;i++){
            var curClass  = aryClass[i];
            var reg = new RegExp("(^| +)"+curClass+"( +|$)");
            var ary = [];
            for(var k = 0;k<eles.length;k++){
                var ele = eles[k];
                if(reg.test(ele.className)){
                    ary.push(ele);
                }
            }
            eles = ary;
        }
        return eles;

    }

    /**
     *
     * @param ele 当前元素
     * @param strClass  单个类名
     * @return true|false
     */
    function hasClass(ele,strClass){

    }

    /**
     * 添加类名
     * @param ele  当前的元素
     * @param strClass 一个类名或多个类名
     */
    function addClass(ele,strClass){

    }

    /**
     * 删除类名
     * @param ele  当前元素
     * @param strClass 一个类名或多个类名
     */
    function removeClass(ele,strClass){


    }

    /**
     * 获取到指定标记名的子元素
     * @param context 上下文
     * @param tagName 标记名 (字符串)
     */
    function children(context,tagName){

    }

    return {
        listToArray: listToArray,
        toJSON: toJSON,
        offset:offset,
        getCss:getCss,
        win:win,
        rnd:rnd,
        getByClass:getByClass,
        hasClass:hasClass,
        addClass:addClass,
        removeClass:removeClass,
        children:children,
        setCss:setCss,
        setGroup:setGroup,
        css:css
    }

})();
