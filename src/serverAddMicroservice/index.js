


import { addServiceFromTemplate } from '../serverUtils'



async function serverAddMicroservice (projectName) {
    console.log('开始创建')

    await addServiceFromTemplate("yewuxianmingcheng","mokuaimingcheng");
    
   //占位符替换

    process.exit()
}
export default serverAddMicroservice