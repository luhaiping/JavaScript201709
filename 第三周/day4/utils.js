var utils = (function () {
    /**
     * 类数组转换成数组
     * @param likeAry
     */
    function listToArray(likeAry) {
        var ary = [];
        try {
            ary = [].slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
    }

    /**
     * 将JSON格式的字符串转换成JSON格式的对象
     * @param str JSON格式的字符串
     */
    function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")")
    }

    /**
     * 获取某个元素到body的上偏移和左偏移
     * @param ele 当前的元素
     */
    function offset(ele) {
        var l = ele.offsetLeft;//偏移的距离:ele的外边框到参照物的内边框
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p != document.body && p) {//若ele.offsetParent是body则退出while ,或者ele就是body也得退出while
            if (!/MSIE 8\.0/.test(navigator.userAgent)) {
                //不是ie8得把参照物的边框累加起来
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;

        }

        return {
            l: l,
            t: t
        }
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
            //opacity:0.5;
            //filter:alpha(opacity = 50);
            if(attr =="opacity"){
                res = ele.currentStyle.filter;//"alpha(opacity = 50)"
                var reg = /^alpha\(opacity\s*=\s*(\d+(?:\.\d+)?)\)$/;
                //reg.exec(res)[1] RegExp.$1
                res = reg.test(res)?RegExp.$1/100:1;

            }else{
                res = ele.currentStyle[attr];
            }

        }
        //1.对单位的处理
        //若获取值是->左边是数值,右边是单位,则把单位去掉并转化成数类型
        var reg = /^[+-]?(?:\d+(?:\.\d+)?)(?:px|rem|pt|em)?$/i;
        return reg.test(res)?parseFloat(res):res;
    }

    /**
     * 获取client系列,offset系列,scroll系列的值
     * 当前这个元素是文档(body)某个属性值->document.documentElement[xxx]||document.body[xxx];
     * @param attr 属性名,例如:clientHeight,scrollHeight
     * @param value 属性值->scrollLeft和scrollTop  11个属性是可读的 ,这两个还可写
     */
    function win(attr,value){
       if(typeof value =="undefined"){
           return document.documentElement[attr]||document.body[attr];
       }else{
           document.documentElement[attr]  = value;
           document.body[attr] = value;
       }
    }

    /**
     * 获取某个区间(n-m)之间的随机数
     * @param n
     * @param m
     */
    function rnd(n,m){
        //1.对传进来的参数做处理,参数得是数值
        n = Number(n);
        m = Number(m);
        if(isNaN(n)||isNaN(m)){
            return Math.random();
        }
        //2.若n>m,则让他两交换位置
        if(n>m){
            //var temp = n;
            //n = m;
            //m = temp;
            n = n+m;
            m = n - m;
            n = n - m;
        }
        return Math.round(Math.random()*(m-n)+n);
    }
    return {
        listToArray: listToArray,
        toJSON: toJSON,
        offset:offset,
        getCss:getCss,
        win:win,
        rnd:rnd
    }

})()
