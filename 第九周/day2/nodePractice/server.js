let http  = require('http');
let url  = require("url");
let fs = require('fs');
let mime = require("mime");
//处理静态资源请求 html,css,js
http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);
    if(pathname=="/favicon.ico")return;//自动请求title小图标
    //1.先判断请求的文件是否存在
    //pathname  /index.html  /index.css /index.js
    if(pathname=="/"){
       let indexCon =  fs.readFileSync(__dirname+"/index.html");
        res.setHeader("content-type","text/html; charset=utf-8");
        res.end(indexCon);
        return;
    }
    let flag = fs.statSync(__dirname+pathname).isFile();
    if(flag){
        let fileCon = fs.readFileSync(__dirname+pathname);
        //mime.getType(pathname);//通过文件的后缀名获取到对应的mime类型
        res.setHeader("content-type",`${mime.getType(pathname)}; charset=utf-8`);
        res.end(fileCon);//把fileCon返回给浏览器,并且终止这条请求
    }
}).listen(8090,()=>{//listen 监听的端口 0~65535
    console.log('8090端口被启用了!');
});
