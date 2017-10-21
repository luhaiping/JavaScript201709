/*
require("")
* 内置模块 http fs url
* 第三方模块 mime模块(根据文件后缀名解析出相应mime类型) npmjs.com  npm
* npm init -y package.json
* 自定义模块
* */
let http  = require("http");
let mime = require('mime');
let b = require('./b');
console.log(__dirname);
//模块查找的机制
//C:\Users\银鹏\Desktop\day4
//C:\Users\银鹏\Desktop
//C:\Users\银鹏
//C:\Users
//C: