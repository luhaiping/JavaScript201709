let http  = require('http');
http.createServer(function(req,res){
    //request(req) 客户端请求的信息
    //response(res) 服务端响应的信息
    //res.setHeader("content-type","text/plain; charset=utf-8");
    res.writeHead(200,{"content-type":"text/plain; charset=utf-8"});
    res.end("我来了~~~~");

}).listen("8090",()=>{//listen 监听的端口 0~65535
    console.log('8090端口被启用了!');
});
