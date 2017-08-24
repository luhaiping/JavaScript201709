var utils = (function () {
    function listToArray(arg) {
        var ary = [];
        try {
            //标准浏览器
            ary = [].slice.call(arg);
        } catch (e) {
            //IE浏览器
            for (var i = 0; i < arg.length; i++) {
                ary[ary.length] = arg[i];
            }
        }
        return ary;
    }

    /**
     *
     * @param str json格式的字符串
     * @return  json格式的对象
     */
    function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }

    return {
        listToArray: listToArray,
        toJSON: toJSON
    }
})()
