const Password = require("node-php-password");
const moment = require("moment");
const Release = require('../models/Release');
const { Op,QueryTypes } = require("sequelize");
const {UploadFile, replaceFileContent} = require("../../../commons/helpers");
const {instance} = require('./../../../commons/db');
const Helpers = require('./../../../commons/helpers');
const Environment = require("../../Environment/models/Environment");
const DB = require('./../../../commons/db')

const createRelease = async (credentials) => {
    const t = await instance.transaction();
    try {
        let data = {
            ...credentials,
        }
        const create_release = await Release.create(data);

        let bundle = {};
        if(credentials.platform === 'android' && credentials.files['apk'] && credentials.files['apk'].size){
            bundle.apk = await UploadFile(credentials.files['apk'],'release', create_release.id)
        }

        if(credentials.platform === 'windows' && credentials.files['windows'] && credentials.files['windows'].size){
            bundle.apk = await UploadFile(credentials.files['windows'],'release', create_release.id)
        }

        if(credentials.platform === 'ios' && credentials.files['ipa'] && credentials.files['ipa'].size){
            bundle.ipa = await UploadFile(credentials.files['ipa'],'release', create_release.id);
            const plistFile = _configs.publicPath+'/release/'+create_release.id+'/manifest-ios.plist';
            await replaceFileContent(_configs.publicPath+'/sample-plist.xml', plistFile, [
                [`{IPA-URL}`,_configs.appUrl+bundle.ipa],
                [`{BUNDLE-IDENTIFIER}`, credentials['bundle-identifier']],
                [`{BUNDLE-VERSION}`, credentials['bundle-version']],
                [`{BUNDLE-TITLE}`, credentials['bundle-title']],
            ]);

            bundle = {
                ...bundle,
                ['bundle-identifier']: credentials['bundle-identifier'],
                ['bundle-version']: credentials['bundle-version'],
                ['bundle-title']: credentials['bundle-title'],
                ['plist']: '/release/'+create_release.id+'/manifest-ios.plist',
            }
        }

        create_release.bundle = bundle;
        create_release.save();

        await t.commit();


        return create_release;
    }catch (e) {
        await t.rollback();
        throw Error(`Register Failed`);
    }

}

const getListReleases = async (filter) => {
    filter.offset = (filter.page > 1) ? (filter.page-1) * filter.per_page : 0
    let whereCondition = []

    if(filter.project_id) whereCondition.push({[Op.and]: {project_id: filter.project_id}});
    if(filter.platform) whereCondition.push({[Op.and]: {platform: filter.platform}});
    if(filter.env_id) whereCondition.push({[Op.and]: {env_id: filter.env_id}});

    if(filter.version) whereCondition.push({[Op.and]: {version: {[Op.like]: `%${filter.version}%`}}});
    if(filter.title) whereCondition.push({[Op.and]: {title: {[Op.like]: `%${filter.title}%`}}});

    let order_by = []
    if(filter.order_by_created_at && filter.order_by_created_at === 'desc' || filter.order_by_created_at === 'asc'){
        order_by = [
            ['created_at',filter.order_by_created_at],
            ['id',filter.order_by_created_at],
        ]
    }

    if(!filter.per_page || filter.per_page <= 0) {
        const data =  await Release.findAll({
            where: {
                [Op.and]: whereCondition
            },
            order: order_by,
            include : ['project','environment']
        });
        return {data}
    }
    const data = await Release.findAndCountAll({
        where: {
            [Op.and]: whereCondition
        },
        offset: parseInt(filter.offset),
        limit: parseInt(filter.per_page),
        order: order_by,
        include : ['project','environment']
    })
    console.log(data,'data')
    return Helpers.parsePaginationData(data, filter);
}

const getReleaseDetail = async id => {
    let release = await Release.findOne({
        where: {
            id: id
        },
        include : ['project','environment'],
    });
    return release;
}

const deleteRelease = async id => {
    let release = await Release.destroy({
        where: {
            id: id
        }
    });
    return release;
}

const releaseByEnvironment = async (filter) => {
    filter.offset = (filter.page > 1) ? (filter.page-1) * filter.per_page : 0;
    let selectBindings = [
      'releases.*',
      'projects.name as project_name',
      'environments.name as env_name',
      'environments.baseurl as baseurl'
    ];

    let whereBindings = [];

    if(filter.project_id) whereBindings.push(`releases.project_id = '${filter.project_id}'`);
    if(filter.platform) whereBindings.push(`releases.platform = '${filter.platform}'`);
    if(filter.env_id) whereBindings.push(`releases.env_id = '${filter.env_id}'`);

    let where = whereBindings.length > 0 ? "Where " +whereBindings.join(' AND ') + " " : '';

    let fromTableBinding = " FROM releases " +
      "join (SELECT env_id,max(created_at) as created_at, max(id) as id FROM releases group by env_id,platform) A on A.id = releases.id " +
      "join projects on projects.id = releases.project_id " +
      "join environments on environments.id = releases.env_id "+where;


    let order_by = ' order by releases.created_at desc';

    if(!filter.per_page || filter.per_page <= 0) {
        let sqlAll = "select " + selectBindings.toString()  + " " +fromTableBinding + order_by;
        let dataAll = await DB.instance.query(
          sqlAll,
          {
              replacements: { status: 'active' },
              type: QueryTypes.SELECT
          }
        );
        return {data:dataAll}
    }
    let limitOffset = ` LIMIT ${parseInt(filter.per_page)} OFFSET ${parseInt(filter.offset)}`;
    let sql = "select " + selectBindings.toString()  + " " +fromTableBinding + order_by + limitOffset;
    let data = await DB.instance.query(
      sql,
      {
          replacements: { status: 'active' },
          type: QueryTypes.SELECT
      }
    );

    let sqlCount =  "select count(*) as count" +fromTableBinding;
    let countData = await DB.instance.query(sqlCount,
      {
          replacements: { status: 'active' },
          type: QueryTypes.SELECT
      }
    );
    let count = 0;

    if(countData.length > 0) {
        count = countData[0]?.count || 0;
    }

    let parseData = {
        count : count,
        rows : data
    }

    return Helpers.parsePaginationData(parseData, filter);
}

const releaseLasted = async id => {

    try {
        let release = await Release.findOne({
            where: {
                id: id
            },
            include : ['project','environment'],
        });

        let order_by = [
            ['created_at','desc'],
            ['id','desc'],
        ]

        const data =  await Release.findAll({
            where: {
                env_id: release.env_id,
                platform : release.platform
            },
            order: order_by,
            include : ['project','environment']
        });
        return {data}


    } catch (error) {
        throw Error(`Update Failed`);
    }


}

const ReleaseService = {
    createRelease,
    getListReleases,
    getReleaseDetail,
    deleteRelease,
    releaseByEnvironment,
    releaseLasted
}

module.exports = ReleaseService
