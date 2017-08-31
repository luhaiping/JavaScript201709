var utils = (function(){
    /**
     *
     * @param likeAry  类数组
     * @returns {Array} 数组
     */
    function listToArray(likeAry){
        var ary = [];
        try{
            ary = [].slice.call(likeAry);
        }catch(e){
            for(var i = 0;i<likeAry.length;i++){
               ary[ary.length]=likeAry[i];
            }
        }
        return ary;
    }

    /**
     *
     * @param str JSON格式的字符串
     * @returns {Object}  JSON格式的对象
     */
    function toJSON(str){
       return "JSON" in window?JSON.parse(str) :eval("("+str+")");
    }

    /**
     *
     * @param ele  当前元素
     * @returns {{l:l,t:t}} 距离body的上偏移和距离body的左偏移
     */
    function offset(ele){
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while(p!=document.body&&p){//1.ele不是body 2.p不能是body
          //p标签到他的参照物的偏移
            if(navigator.userAgent.indexOf("MSIE 8.0")==-1){
                l+= p.clientLeft;
                t+= p.clientTop;
            }
            l+= p.offsetLeft;
            t+= p.offsetTop;
            p = p.offsetParent;
        }
        return {
            l:l,t:t
        }
    }

    /**
     *
     * @param ele 当前元素
     * @param attr css属性
     * @returns  css属性值
     */
    function getCss(ele,attr){
        var res = null;
        if(typeof getComputedStyle =="function"){
            res = window.getComputedStyle(ele,null)[attr];
        }else{
            if(attr=="opacity"){
                res = ele.currentStyle.filter;
                var reg = /^alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)$/;
                res = reg.test(res) ? RegExp.$1/100 : 1;

            }else{
                res =  ele.currentStyle[attr];
            }
        }
        var reg = /^[+-]?(?:\d+(?:\.\d+)?)(?:px|pt|rem|em)?$/i;
        return  reg.test(res)?parseFloat(res):res;
    }
    return {
        listToArray:listToArray,
        toJSON:toJSON,
        getCss:getCss
    }
})()
