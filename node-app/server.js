//Require common libs
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const formData = require("express-form-data");
const os = require("os");
const path = require('path');
const cors = require('cors');
const http = require('http');
const fs = require('fs');

//Init app
const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 9000

//Config app
app.use(express.static('./public'))
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//Config formData
const formDataOptions = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
app.use(formData.parse(formDataOptions));

//Config Cross origin domain
app.use(cors({
    origin: '*'
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Config body request
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//Require functions
const configs = require('./commons/configs');
const router = require('./modules/router');
const {log} = require("./commons/helpers");
const DB = require('./commons/db')

DB.testConnect()

//Init Global variable
global._log = log
global._configs = configs
global._fs = fs;

//Init router
app.use('/', router);

//Handle error
app.use((req, res, next) => {
    res.status(404).json({
        msg: 'NotFound'
    })
})

server.listen(port, () => {
    // console.clear()
    log.success(`🌿🌿 Application is listening on port ${port}: [${configs.appUrl}]`)
});
