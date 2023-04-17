const path = require('path');
const configs = {
    environment: process.env.APP_ENV,
    appUrl: process.env.APP_URL,
    awsBucket: process.env.AWS_BUCKET,
    awsRegion: process.env.AWS_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsUrl: process.env.AWS_URL,
    publicPath: path.resolve(__dirname + './../public'),
    rootPath: path.resolve(__dirname + './../'),
    redisConfig: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        db: process.env.REDIS_DB,
        options: {},
    },
    db_name: process.env.DB_DATABASE,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_dialect: process.env.DB_CONNECTION,
    db_logging: true,
}

module.exports = configs
