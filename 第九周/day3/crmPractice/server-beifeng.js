let http = require('http'),
    url = require('url'),
    fs  = require('fs'),
    mime = require("mime");


let server = http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);
    if(pathname=="/favicon.ico") return;
    //获取
   if(pathname =="/getList"){
       let resObj = {
           "code":0,
           "msg":"",
           data:[]
       };
       let strs = fs.readFileSync("json/data.json");//模拟是从数据库里读取所有的数据
       let users = JSON.parse(strs);
        resObj.data = users;
        res.setHeader("content-type","application/json; charset=utf-8");
        res.end(JSON.stringify(resObj));
        return;
    }


    //1.处理静态资源文件
    if(pathname=="/"){
       let indexCon =  fs.readFileSync("./index.html");
       res.setHeader("content-type","text/html; charset=utf-8");
       res.end(indexCon);
        return;
    }
    fs.stat(__dirname+pathname,function(err,fileInfo){
        if(err){
            res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});
            res.end("文件不存在");
            return;
        }
        fs.readFile(__dirname+pathname,function(err,file){
            if(err) console.log(err);
            res.setHeader("content-type",`${mime.getType(pathname)}; charset=utf-8`);
            res.end(file);
        })



    })


    //2.处理接口




})
server.listen(8092,()=>{
    console.log("8092端口被启用")
})