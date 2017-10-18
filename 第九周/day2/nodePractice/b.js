
let mime =require('mime');/*第三方模块*/
//console.log(mime.getType("index.html"));
let a  = require('./a'); /*自定义模块*/
//console.log(a.plus(10, 20));
//console.log(a.sum(20, 30, 40));
let http = require('http');/*内置模块*/
let fs = require('fs');
let url = require('url');
console.log(http);
//console.log(global);
//console.log(__dirname); //当前文件所在目录的绝对路径
//console.log(__filename); //当前文件所在的绝对路径

