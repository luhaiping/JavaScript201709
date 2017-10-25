let http = require('http'),
    fs = require('fs'),
    url = require("url"),
    mime = require("mime");
http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);
    //处理静态资源文件
    if(pathname=="/favicon.ico") return;
    let flag = fs.existsSync(__dirname+pathname);
    if(flag){
        fs.readFile(__dirname+pathname,function(err,file){
            if(err){
                res.writeHead(404,{"content-type":"text/plain; charset=utf-8"});
                res.end("读取文件失败~");
                return;
            }
            //设置响应头的content-type值
            res.setHeader("content-type",`${mime.getType(pathname)}; charset=utf-8`);
            res.end(file);
            return;
        })
    }


    //处理接口部分
    if(pathname == "/getList"){
        //获取客户端传过来的函数名
       let funcName = query['cb'];

       //获取到数据
        let dataCon = fs.readFileSync(__dirname+"/data.json");

       //拼接函数名+需要返回的json格式的数据
        res.setHeader("content-type","text/javascript; charset=utf-8");
        res.end(funcName+"("+dataCon+")");
        return ;
    }







}).listen(9091,()=>{
    console.log('9091端口号被启用~');
})
