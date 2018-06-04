var gulp = require('gulp');
var replace = require('gulp-replace');
const fs = require('fs');


var BusinessName = "Businessline"; //业务线名称
var businessName = "businessline";
var moduleName="modulename"; //模块名称
var serviceName="businessline-modulename"; //微服务名称


var path1 = "src/ttk/tax-sb";
var path1_replace = "src/ttk/service/"+serviceName;
var path2 = path1_replace+"/tax-sb-interface";
var path2_replace = path1_replace+"/"+serviceName+"-interface";
var path3 = path2_replace+"/src/main/java/com/ttk/tax";
var path3_replace = path2_replace+"/src/main/java/com/ttk/"+businessName;
var path4 = path3_replace+"/sb";
var path4_replace = path3_replace+"/"+moduleName;


var path2_service = path1_replace+"/tax-sb-service";
var path2_service_replace = path1_replace+"/"+serviceName+"-service";
var path3_service = path2_service_replace+"/src/main/java/com/ttk/tax";
var path3_service_replace = path2_service_replace+"/src/main/java/com/ttk/"+businessName;
var path4_service = path3_service_replace+"/sb";
var path4_service_replace = path3_service_replace+"/"+moduleName;

replaceFile();

function replaceFile(){
    console.log("正在进行文件复制和文件内容占位符替换。");
    gulp.src('src/microservice-template/**/*')
        .pipe(replace('sb', moduleName))//替换文件中的模块占位符
        .pipe(replace('tax', businessName))//替换文件中的业务线占位符
        .pipe(replace('Tax', BusinessName))//替换文件中的业务线占位符
        .pipe(gulp.dest('src/ttk/'))
        .on('end', callback);


}

function callback(){
    console.log("正在进行interfce包名替换。");
    fs.renameSync(path1,path1_replace);
    fs.renameSync(path2,path2_replace);
    fs.renameSync(path3,path3_replace);
    fs.renameSync(path4,path4_replace);
    fs.renameSync(path4_replace+"/itf/ITaxDiscoveryService.java",path4_replace+"/itf/I"+BusinessName+"DiscoveryService.java");
    fs.renameSync(path4_replace+"/itf/ITaxHealthCheckService.java",path4_replace+"/itf/I"+BusinessName+"HealthCheckService.java");

    console.log("正在进行service包名替换。");
    fs.renameSync(path2_service,path2_service_replace);
    fs.renameSync(path3_service,path3_service_replace);
    fs.renameSync(path4_service,path4_service_replace);
    console.log("正在进行service类名替换。");
    fs.renameSync(path4_service_replace+"/impl/TaxDiscoveryServiceImpl.java",path4_service_replace+"/impl/"+BusinessName+"DiscoveryServiceImpl.java");
    fs.renameSync(path4_service_replace+"/impl/TaxHealthCheckServiceImpl.java",path4_service_replace+"/impl/"+BusinessName+"HealthCheckServiceImpl.java");
}
