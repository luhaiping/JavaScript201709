let http = require('http'),
    url = require('url'),
    fs  = require('fs'),
    mime = require("mime");

let server = http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);
    if(pathname=="/favicon.ico") return;

    //1.处理静态资源文件
    if(pathname=="/"){
       let indexCon =  fs.readFileSync(__dirname+"/index.html");
       res.setHeader("content-type","text/html; charset=utf-8");
       res.end(indexCon);
        return;
    }

    let flag = fs.existsSync(__dirname+pathname);
    if(flag){
        fs.readFile(__dirname+pathname,function(err,file){
            if(err){
                res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});
                res.end("文件不存在");
                return;
            }
            res.setHeader("content-type",`${mime.getType(pathname)}; charset=utf-8`);
            res.end(file);
        });
        return;
    }
    //2.处理接口
    let resObj = {
        "code":0,//0成功 1失败
        "msg":"",
        "data":[]
    };
    let strs = fs.readFileSync(__dirname+"/json/data.json");//模拟是从数据库里读取所有的数据
    let users = JSON.parse(strs);
    res.setHeader("content-type","application/json; charset=utf-8");

    //->获得所有的数据
    if(pathname =="/getList"){
    if(query.id){
         let user = users.find((item)=>{
             return item.id == query.id;
         })
        resObj.data = user;
        res.end(JSON.stringify(resObj));
    }else{
        resObj.data = users;
        res.end(JSON.stringify(resObj));
        return;
    }

    }

    //->添加客户信息

    if(pathname =="/addInfo"&&req.method =="POST"){
        let str = '';
        req.on("data",function(chunk){
          str+=chunk;
        });
        req.on("end",function(){
            //console.log(str);//'{"name":"555","tel":"666"}'
            let strObj = JSON.parse(str);
            strObj.id = users.length>0?users[users.length-1].id*1+1:1;
            users.push(strObj);
            fs.writeFileSync(__dirname+"/json/data.json",JSON.stringify(users));
            resObj.data = users;
            resObj.msg = "添加成功";
            res.end(JSON.stringify(resObj));
        })
    }

    //修改客户信息
    if(pathname=="/updateInfo"&&req.method =="POST"){
        let str = "";
        req.on("data",function(chunk){
            str+=chunk;
        })
        req.on("end",function(){
            let strObj = JSON.parse(str);//{"id":"3","name":"林维帅234","tel":"123456783432"}
            users = users.map((item)=>{
                if(item.id ==strObj.id){
                    return strObj;
                }
                return item;
            });
            resObj.data = users;
            fs.writeFileSync(__dirname+"/json/data.json",JSON.stringify(users));
            resObj.msg ="修改成功";
            res.end(JSON.stringify(resObj));
        })
    }

    //删除信息
    if(pathname=="/removeInfo"){
        users = users.filter((item)=>{
            return item.id!=query.id;
        })
        resObj.data = users;
        fs.writeFileSync(__dirname+"/json/data.json",JSON.stringify(users));
        resObj.msg = "删除成功";
        res.end(JSON.stringify(resObj));
        return;
    }


});
server.listen(8092,()=>{
    console.log("8092端口被启用")
})