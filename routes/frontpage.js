const express   = require('express');
const routes    = express.Router();
// const {baseView, loginView, doLogin}  = require('../controller/frontController');
const {
    baseView, 
    loginView, 
    doLogin,
    registerPage

}  = require('../controller/frontController');

routes.route('/')
    .get(baseView);


routes.route('/login')
    .get(loginView)
    .post(doLogin);

routes.route('/register')
    .get(registerPage);
module.exports = routes;