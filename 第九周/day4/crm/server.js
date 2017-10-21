let http = require('http'),
    url = require('url'),
    fs = require('fs'),
    mime = require("mime");
http.createServer(function (req, res) {
    //解析请求的url req.url
    let {pathname, query} = url.parse(req.url, true);
    //处理页面所有的静态资源文件
    if (pathname == "/favicon.ico") return;
    if (pathname == "/") {
        let indexCon = fs.readFileSync(__dirname + "/index.html");
        res.setHeader("content-type", "text/html; charset=utf-8");
        res.end(indexCon);
        return;
    }
    let flag = fs.existsSync(__dirname + pathname);
    if (flag) {
        fs.readFile(__dirname + pathname, function (err, file) {
            if (err) {
                res.writeHead(404, {"content-type": "text/plain; charset=utf-8"});
                res.end("文件不存在");
                return;
            }
            res.setHeader("content-type", `${mime.getType(pathname)}; charset=utf-8`);
            res.end(file);
        })
        return;
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`接口部分~~~~~~~~~~~~~~~~~`
    let resObj = {
        "code": 0,
        "msg": "",
        data: []
    };
    let users = fs.readFileSync(__dirname + "/json/data.json");
    users = JSON.parse(users);
    res.setHeader("content-type", "application/json; charset=utf-8");
    if (pathname == "/getList") {
        if(query.id){
            let user = users.find((item)=>{
                return item.id == query.id;
            })
            resObj.data = user;
            res.end(JSON.stringify(resObj));
        }else{
            resObj.data= users;
            res.end(JSON.stringify(resObj));
        }
    }

    //添加客户信息
    if(pathname=="/addInfo"&&req.method == "POST"){
        let str = "";
        req.on("data",function(chunck){
            str+=chunck;
        });
        req.on("end",function(){
            //console.log(str);//'{"name":"lily","tel":"123456"}'
            let user = JSON.parse(str);
            user.id = users.length>0?users[users.length-1].id*1+1:1;
            //{id:12,"name":"lily","tel":"123456"}
            users.push(user);
            fs.writeFileSync(__dirname+"/json/data.json",JSON.stringify(users));
            resObj.msg = "添加成功";
            resObj.data = users;
            res.end(JSON.stringify(resObj));
        })
    }

    //修改客户信息
    if(pathname=="/updateInfo" && req.method =="POST"){
        let str = "";
        req.on("data",function(chunck){
            str+=chunck;
        });
        req.on("end",function(){
            //'{id:12,"name":"lily","tel":"123456"}'
            let user = JSON.parse(str);//{id:12,"name":"lily","tel":"123456"}
            users = users.map((item)=>{
                if(item.id == user.id){
                    return user;
                }
                return item;
            });
            resObj.data = users;
            fs.writeFileSync(__dirname+"/json/data.json",JSON.stringify(users));
            resObj.msg = "修改成功";
            res.end(JSON.stringify(resObj));
        })
    }

    //删除客户信息
    if(pathname=="/removeInfo"&& req.method=="DELETE"){
        //{id:10};
        //query.id
        users = users.filter((item)=>{
            return item.id!=query.id;
        });
        fs.writeFileSync(__dirname+"/json/data.json",JSON.stringify(users));
        resObj.msg = "删除成功";
        resObj.data = users;
        res.end(JSON.stringify(resObj));
    }




}).listen(9091, () => {
    console.log("9091端口被启用");
});