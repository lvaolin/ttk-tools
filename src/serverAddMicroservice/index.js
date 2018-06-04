'use strict'

import chalk from 'chalk'
import { addServiceFromTemplate } from '../serverUtils'
import {
    mkdir, copyFile, haveFile, prompt,
    getInput, readDir, deleteFile, editAppName,
    editmock, editstyle, checkYarn
} from '../utils'
async function checkPath (path) {
    let result = path
    while (true) {
        const flag = await haveFile(result)
        if( flag && noExit ){
            return true
        }
        if( flag ){
            console.log(chalk.yellowBright('该路径下已经存在app!'))
            result = await prompt('请输入新的路径：')
        }else{
            return result
        }
    }
}

async function serverAddMicroservice (businessName,moduleName) {
     await checkYarn();
     if( typeof(businessName) != 'string' ){
         console.log(chalk.yellowBright('你没有输入业务线名称！'))
         businessName = await getInput('请输入业务线的名称(英文，首字母小写)：')
     }
     if( typeof(moduleName) != 'string' ){
         console.log(chalk.yellowBright('你没有输入模块名称！'))
         moduleName = await getInput('请输入模块名称(英文，首字母小写)：')
     }
     console.log('检查该服务是否已经存在...')
     var path = businessName+'-'+moduleName;
     path = await checkPath(path)
     if( path === true ){
         console.log(chalk.yellowBright(`${path}服务已经存在，跳过`))
         return true
     }
     console.log(path+'开始创建');
     addServiceFromTemplate(businessName,moduleName);
     //process.exit();
}
export default serverAddMicroservice