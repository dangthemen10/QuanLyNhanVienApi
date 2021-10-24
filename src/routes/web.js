'use-strict';

const express = require('express');
const home = require("../controllers/index");
const auth = require("../middleware/auth");
const router = express.Router();

const route = app => {
    
    router.get('/', home.getHomepage);
    router.post('/register', home.register);
    router.post('/login', home.login);
    router.get('/list', auth.validateJWT, home.getInfoEmployees);

    //department
    router.use(require('./department'))

    //employee
    router.use(require('./employee'))

    //group
    router.use(require('./group'))

    //project
    router.use(require('./project'))

    return app.use('/', router);
} 

module.exports = route;