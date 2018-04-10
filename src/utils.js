'use strict'

import vfs from 'vinyl-fs'
import { exec } from 'child_process'
import spawn from 'cross-spawn'
import chalk from 'chalk'
import fs from 'fs'
import through from 'through2'
import readline from 'readline'

export function CMD(cmdStr, option) {
    return new Promise(function (resolve, reject) {
        console.log('ttk: 操作路径=====>' + option.cwd)
        let build
        build = exec(cmdStr, option, (err, stdout, stderr) => {
            if (err) {
                console.log(chalk.redBright(err))
                reject(err)
            }
            console.log('ttk: ' + stdout)
            console.log('ttk: ' + stderr)
            resolve()
        })
        build.stdout.on('data', (data) => {
            console.log(`ttk: ${data}`)
        })
    })
}

export function copyFile(projectName, path) {
    return new Promise(function (resolve, reject) {
        vfs.src(path)
            .pipe(through.obj(function (file, enc, cb) {
                this.push(file)
                cb()
            }))
            .pipe(vfs.dest(`./${projectName}`))
            .on('end', function (err) {
                resolve()
            })
            .resume()
    })
}


export function mkdir(name) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(name, (err) => {
            if (err) {
                console.log(chalk.redBright(err))
                resolve(err)
            } else {
                resolve()
            }
        })
    })
}

export function rename(oldName, newName) {
    return new Promise(function (resolve, reject) {
        console.log('重命名')
        fs.rename(oldName, newName, (err) => {
            console.log(err, '>>>>>>>>>>')
            if (err) {
                console.log(chalk.redBright(err))
                resolve(err)
            } else {
                resolve()
            }
        })
    })
}


export function deleteFile(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file
            console.log(chalk.yellowBright(`正在删除${curPath}`))
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFile(curPath)
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

export function haveFile(path) {
    return new Promise(function (resolve, reject) {
        fs.stat(`./${path}`, (err, stats) => {
            if (stats) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

export function prompt(question) {
    return new Promise(function (resolve, reject) {
        const res = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        res.question(question, (ans) => {
            resolve(ans)
            res.close()
        })
    })
}

export async function getInput(warn) {
    while (true) {
        console.log(chalk.yellowBright('你的输入为空!'))
        const res = await prompt(warn)
        if (res) {
            return res
        }
    }
}

export function readDir(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, (err, data) => {
            if (err) {
                console.log(err)
                resolve([])
            } else {
                console.log(data)
                resolve(data)
            }
        })
    })
}

export function edit(path) {
    return new Promise(function (resolve, reject) {
        const namearr = path.split('/')
        const name = namearr[namearr.length - 1]
        const nameStr = name.replace(/-/g, '_')
        fs.readFile('./index.js', (err, data) => {
            const str = data.toString()
            const index = str.replace(/const.*app.*=.*{/g, function (a) {
                const str =
                    `import ${nameStr} from './${path}' 
${a}
    [${nameStr}.name]: ${nameStr},`
                return str
            })
            fs.createWriteStream('./index.js').write(index, 'utf8', (err) => {
                resolve()
            })
        });
    })
}


export function editAppName(path) {
    return new Promise(function (resolve, reject) {
        const namearr = path.split('/')
        const name = namearr[namearr.length - 1]
        const nameStr = name
        fs.readFile(`./${path}/index.js`, (err, data) => {
            const str = data.toString()
            const editStr = str.replace(/name:.*,/, function (a) {
                console.log(a)
                return `name: '${nameStr}',`
            })
            fs.createWriteStream(`./${path}/index.js`).write(editStr, 'utf8', (err) => {
                resolve(true)
            })
        });
    })
}

export function editmock(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile('./mock.js', (err, data) => {
            if (err) {
                console.log(chalk.redBright('没有发现./mock.js'))
            }
            const str = data.toString()
            const resultStr = str + `
import './${path}/mock.js';
`
            fs.createWriteStream('./mock.js').write(resultStr, 'utf8', (err) => {
                if (err) {
                    resolve(false)
                    console.log(chalk.redBright('修改./mock.js失败'))
                    return
                }
                resolve(true)
            })
        });
    })
}

export function editstyle(path) {
    return new Promise(function (resolve, reject) {
        fs.readFile('./assets/styles/apps.less', (err, data) => {
            if (err) {
                console.log(chalk.redBright('没有发现./assets/styles/apps.less'))
            }
            const str = data.toString()
            const resultStr = str + `
@import '../../${path}/style.less';
`
            fs.createWriteStream('./assets/styles/apps.less').write(resultStr, 'utf8', (err) => {
                if (err) {
                    resolve(false)
                    console.log(chalk.redBright('修改./assets/styles/apps.less失败'))
                }
                resolve(true)
            })
        });
    })
}