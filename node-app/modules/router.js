const express = require('express');
const router = express.Router();
const path = require('path');

const { log, scanDir } = require('../commons/helpers');

const modules = scanDir(__dirname);

/* Default entry point */
router.get('/', (req, res) => {
    res.json({'message': 'Web Service'});
})

/* autoload router */
modules.forEach(mod=>{
    try {
        router.use('/', require(path.join(__dirname, `${mod}/routers/webRouter.js`)));
        router.use('/api/', require(path.join(__dirname, `${mod}/routers/apiRouter.js`)));
    } catch (error) {
        log.error(error)
    }
})

module.exports = router
