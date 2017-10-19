let http = require('http'),
    fs = require('fs'),
    url = require('url'),
    mime = require("mime");

http.createServer(function(req,res){
    //客户端向服务器端请求的url ->req.url
    let {pathname,query} = url.parse(req.url,true);
    //通过pathname判断资源文件是否存在
    if(pathname=="/favicon.ico") return;
    // console.log(fs.statSync(__dirname + pathname).isFile());
    if(pathname=="/"){
       let fileCon =  fs.readFileSync("./index.html");
       res.setHeader("content-type","text/html; charset=utf-8");
       res.end(fileCon);
       return;
    }
    fs.stat(__dirname + pathname,function(err,fileInfo){
        if(err){
            res.statusCode = 404;
            res.setHeader("content-type","text/plain; charset=utf-8");
            res.end("文件不存在");
            return;
        }
        //fs.stat获取文件成功
        fs.readFile(__dirname+pathname,function(err,file){
            if(err) console.log(err);
            res.setHeader("content-type",`${mime.getType(pathname)}; charset=utf-8`);
            res.end(file);
        });
    })



}).listen(8091,()=>{
    console.log("8091端口号已启动")
})