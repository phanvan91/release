const {readdirSync} = require('fs');
const fs = require('fs');
const path = require('path');
const time = new Date();
const moment = require('moment')
const User = require("../modules/User/models/User");



const Helpers =  {
    log: {
        success: (obj, pos = '') => {
            console.log("\x1b[32m", '✅ ',obj, pos ?? `\n${pos}`, "\x1b[0m")
        },
        error: (obj, pos = '') => {
            console.error("\x1b[41m", obj, pos ?? `\n${pos}`, "\x1b[0m")
        },
        info: (obj, pos = '') => {
            console.error("\x1b[34m", obj, pos ?? `\n${pos}`, "\x1b[0m")
        },
        warning: (obj, pos = '') => {
            console.error("\x1b[33m", obj, pos ?? `\n${pos}`, "\x1b[0m")
        },
        file: async (obj, file = '../logs/logs') => {
            console.error(obj)
            await fs.appendFile(path.resolve(__dirname + `./${file}_${time.getFullYear()}${time.getMonth() + 1}${time.getDate()}_${time.getHours()}.log`), "\n"+JSON.stringify(obj)+"\n", (err) => {
                if(err) {
                    return console.log(err);
                }
            });
        }
    },
    scanDir: (source) => {
        return readdirSync(source, {
            withFileTypes: true
        })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
    },
    sleep: (ms)=>{
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    removeTrailingSlash: (str) => {
        return str.replace(/\/+$/, '');
    },
    convertToSlug: (Text, char = '-') => {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, char);
    },
    Filter: {
        page: 1,
        per_page: 20,
        offset: 0
    },
    parsePaginationData: (data, filter) => {
        let total_page = Math.ceil(data.count/filter.per_page)
        return {
            total: data.count,
            rows: data.rows.length,
            data: data.rows,
            current_page: filter.page,
            per_page: filter.per_page,
            total_page: total_page,
            offset: filter.offset
        }
    },
    UploadFile : (file, path, id) => {
        return new Promise(async (resolve) => {
            console.log(file,'file')
            var dir_path = _configs.publicPath+'/'+path;
            var dir_path_exist = fs.existsSync(dir_path);
            if(!dir_path_exist){
                fs.mkdirSync(dir_path);
                fs.chmodSync(dir_path, '0777')
            }
            var dir_path_id = _configs.publicPath+'/'+path+'/'+id;
            var dir_path_id_exist = fs.existsSync(dir_path_id);
            if(!dir_path_id_exist){
                fs.mkdirSync(dir_path_id);
                fs.chmodSync(dir_path_id, '0777')
            }

            fs.renameSync(file.path,dir_path_id+'/'+file.originalFilename);

            // fs.readFileSync(file)
            resolve('/'+path+'/'+id+'/'+file.originalFilename)


            console.log(dir_path,'dir_path')
        })
    },
    replaceFileContent : async (src, dist, filter) => {
        return new Promise((resolve, reject) => {
            fs.readFile(src, 'utf8', function (err,data) {
                if (err) {
                    reject(err)
                    return console.log(err);
                }

                let result = data;
                filter.map(item=>{

                    result = result.replace(new RegExp(item[0], 'g'), item[1]);
                })

                fs.writeFile(dist, result, 'utf8', function (err) {
                    if (err) {
                        reject(err);
                        return console.log(err);
                    }
                    resolve(true)
                });
            });
        })
    },
    getListIsModel : async (model,credentials = {}) => {
        /**
         * credentials = {
         * per_page : 10,
         * page : 1,
         * operators : {},
         * attributes : {},
         * include : [],
         * order_by : [],
         * }*/
        let result = null;
        let operators = credentials.operators ?? {};
        let include = credentials.include ?? [];
        let order_by = credentials.order_by ?? [];
        let attributes = credentials.attributes ?? {};

        if(credentials.per_page && credentials.per_page > 0) {

            let total = await model.count({
                where : operators
            });

            let per_page = parseInt(credentials.per_page) ?? 10;
            let last_page =  Math.ceil(total / per_page) ;
            let current_page  = parseInt(credentials.page) ?? 1;
            let limit = per_page;
            let offset = (current_page - 1) * per_page;

            result = await model.findAll({
                limit : limit,
                offset : offset,
                include : include,
                attributes: attributes,
                where : operators,
                order : order_by,
            });

            return {
                total,
                per_page,
                last_page,
                current_page,
                data : result
            }
        }

        result = await model.findAll({
            where : operators,
            order : order_by,
            attributes: attributes,
            include : include,
        });

        return result;

    }
}

module.exports = Helpers
