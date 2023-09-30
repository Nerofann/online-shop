const express       = require('express');
const routes        = express.Router();
const {home}        = require('../controller/frontController');
const {view, login, viewRegister, register} = require('../controller/authController');

routes.route('/')
    .get(home);

routes.route('/login')
    .get(view)
    .post(login);

routes.route('/register')
    .get(viewRegister)
    .post(register);

module.exports = routes;