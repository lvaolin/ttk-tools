'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var gulpSequence = require('gulp-sequence');
var fs = require('fs');

var BusinessName = "Businessline"; //业务线名称
var businessName = "businessline";
var moduleName = "modulename"; //模块名称
var serviceName = "businessline-modulename"; //微服务名称


var path1 = "src/ttk-build/tax-sb";
var path1_replace = "src/ttk-build/" + serviceName;
var path2 = path1_replace + "/tax-sb-interface";
var path2_replace = path1_replace + "/" + serviceName + "-interface";
var path3 = path2_replace + "/src/main/java/com/ttk/tax";
var path3_replace = path2_replace + "/src/main/java/com/ttk/" + businessName;
var path4 = path3_replace + "/sb";
var path4_replace = path3_replace + "/" + moduleName;

console.log("正在进行文件内容替换。");
gulp.src('src/ttk/**/*').pipe(replace('sb', moduleName)) //替换文件中的模块占位符
.pipe(replace('tax', businessName)) //替换文件中的业务线占位符
.pipe(replace('Tax', BusinessName)) //替换文件中的业务线占位符
.pipe(gulp.dest('src/ttk-build/'));

//重命名微服务顶级目录
//fs.rename(path1,path1_replace);
//重命名微服务接口目录
//fs.rename(path2,path2_replace);
//重命名微服务接口中的包名
//fs.rename(path3,path3_replace);
//fs.rename(path4,path4_replace);
//fs.rename("src/ttk-build/"+serviceName+"/tax-sb-service","src/ttk-build/"+serviceName+"/"+serviceName+"-service");