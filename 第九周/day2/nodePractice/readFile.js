let fs = require('fs');
// fs.readFile("./test",'utf-8',function(err,file){
//     if(err){console.log("err")}
//     console.log(file);
// })
// console.log(fs.readFileSync("./test","utf-8"));

fs.writeFileSync("./test2","hello world",'utf-8');
fs.writeFile("./test2","wwwwwwwzf","utf-8",function(){
    console.log(arguments);

});
//读取目录 readdir 异步
fs.readdir("../nodePractice",function(err,fileAry){
    //console.log(fileAry);//把当前目录下所有的文件放在数组里返回
});
//判断文件是否存在  fs.existsSync()  fs.exists()

//console.log(fs.statSync("./a.js"))//true
// fs.stat("./a.js",function(err,stat){ //文件信息
//     // 是否是文件:
//     console.log('isFile: ' + stat.isFile());
//     // 是否是目录:
//     console.log('isDirectory: ' + stat.isDirectory());
// })
console.log(fs.statSync("./a.js").isFile());//true
