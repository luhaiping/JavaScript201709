//1.获取数据
var resData = null;
var xhr = new XMLHttpRequest();
xhr.open("get", "json/product.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
        resData = utils.toJSON(xhr.responseText)
    }
}
xhr.send(null);

console.log(resData);

//2.绑定数据
var oUl = document.getElementById("list");
var str = "";
for (var i = 0; i < resData.length; i++) {
    //str+="<li><img src='"+resData[i]["img"]+"'><span>"+resData[i]["title"]+"</span><span>"+resData[i]["time"]+"</span><span>"+resData[i]["hot"]+"</span><span>"+resData[i]["price"]+"</span></li>";
    str += "<li>";
    str += "<img src='" + resData[i]["img"] + "'>";
    str += "<span>" + resData[i]["title"] + "</span>";
    str += "<span>" + resData[i]["time"] + "</span>";
    str += "<span>" + resData[i]["hot"] + "</span>";
    str += "<span>" + resData[i]["price"] + "</span>";
    str += "</li>";
}
oUl.innerHTML = str;


