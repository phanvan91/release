const fs = require('fs')
const {log} = require('./../helpers')

const makeModel = (module, model) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!fs.existsSync('./modules/'+module)) {
                log.error('Module name is invalid')
                reject(false)
            } else {
                if(!fs.existsSync(`./modules/${module}/models/${model}.js`)) {
                    await fs.writeFileSync(`./modules/${module}/models/${model}.js`, `const { DataTypes } = require('sequelize');
const DB = require('./../../../commons/db')

const ${model} = DB.instance.define('${model}', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    tableName: '${model.toLowerCase()}',
    timestamps: false
});

module.exports = ${model}`)
                    log.success(`Model [${module}/Models/${model}.js] has been created`)
                    resolve(true)
                }else{
                    log.error('Model name is invalid')
                }
            }
        }catch (e) {
            log.error(e)
            reject(e)
        }
    })
}

const makeController = (module, controller) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!fs.existsSync('./modules/'+module)) {
                log.error('Module name is invalid')
                reject(false)
            } else {
                if(!fs.existsSync(`./modules/${module}/controllers/${controller}.js`)) {
                    await fs.writeFileSync(`./modules/${module}/controllers/${controller}.js`, `const {log} = require("../../../commons/helpers");
                
//Action declare
                
const ${controller} = {
    //action
}

module.exports = ${controller}`)
                    log.success(`Controller [${module}/Controllers/${controller}.js] has been created`)
                    resolve(true)
                }else{
                    log.error('Controller name is invalid')
                }
            }
        }catch (e) {
            log.error(e)
            reject(e)
        }
    })
}

const makeModule = (name) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!name) {
                log.error('Module name is invalid')
                reject(false)
            }else{
                if (fs.existsSync('./modules/'+name)) {
                    log.error(`Directory ${name} exists!`);
                } else {
                    await fs.mkdirSync('./modules/'+name)
                    await fs.mkdirSync('./modules/'+name+'/configs')
                    await fs.writeFileSync('./modules/'+name+'/configs/.gitkeep', '')
                    await fs.mkdirSync('./modules/'+name+'/controllers')
                    await fs.writeFileSync('./modules/'+name+'/controllers/.gitkeep', '')
                    await fs.mkdirSync('./modules/'+name+'/jobs')
                    await fs.writeFileSync('./modules/'+name+'/jobs/.gitkeep', '')
                    await fs.mkdirSync('./modules/'+name+'/mails')
                    await fs.writeFileSync('./modules/'+name+'/mails/.gitkeep', '')
                    await fs.mkdirSync('./modules/'+name+'/middlewares')
                    await fs.writeFileSync('./modules/'+name+'/middlewares/.gitkeep', '')
                    await fs.mkdirSync('./modules/'+name+'/models')
                    await fs.writeFileSync('./modules/'+name+'/models/.gitkeep', '')
                    await fs.mkdirSync('./modules/'+name+'/requests')
                    await fs.writeFileSync('./modules/'+name+'/requests/.gitkeep', '')
                    await fs.mkdirSync('./modules/'+name+'/routers')
                    await fs.writeFileSync('./modules/'+name+'/routers/.gitkeep', '')
                    await fs.writeFileSync('./modules/'+name+'/routers/apiRouter.js', `const express = require('express');
const router = express.Router();

//Router List

module.exports = router`)
                    await fs.writeFileSync('./modules/'+name+'/routers/webRouter.js', `const express = require('express');
const router = express.Router();

//Router List

module.exports = router`)
                    await fs.mkdirSync('./modules/'+name+'/services')
                    await fs.writeFileSync('./modules/'+name+'/services/.gitkeep', '')
                    log.success(`Module [${name}] has been created`)
                    resolve(true)
                }
            }

        } catch (e) {
            log.error(e)
            reject(e)
        }
    })
}

const makeRequest = (module, request) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!fs.existsSync('./modules/'+module)) {
                log.error('Module name is invalid')
                reject(false)
            } else {
                if(!fs.existsSync(`./modules/${module}/requests/${request}.js`)) {
                    await fs.writeFileSync(`./modules/${module}/requests/${request}.js`, `const {log} = require("../../../commons/helpers");
                
//Action declare
                
const ${request} = async (req, res, next) => {
    //action
}

module.exports = ${request}`)
                    log.success(`request [${module}/requests/${request}.js] has been created`)
                    resolve(true)
                }else{
                    log.error('request name is invalid')
                }
            }
        }catch (e) {
            log.error(e)
            reject(e)
        }
    })
}

const makeService = (module, service) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!fs.existsSync('./modules/'+module)) {
                log.error('Module name is invalid')
                reject(false)
            } else {
                if(!fs.existsSync(`./modules/${module}/services/${service}.js`)) {
                    await fs.writeFileSync(`./modules/${module}/services/${service}.js`, `const {log} = require("../../../commons/helpers");
                
//Action declare
                
const ${service} = {
   
}

module.exports = ${service}`)
                    log.success(`request [${module}/services/${service}.js] has been created`)
                    resolve(true)
                }else{
                    log.error('request name is invalid')
                }
            }
        }catch (e) {
            log.error(e)
            reject(e)
        }
    })
}

const Maker = {
    makeModule,
    makeController,
    makeModel,
    makeRequest,
    makeService
}
module.exports = Maker
