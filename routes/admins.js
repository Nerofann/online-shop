const routes    = require('express').Router();
const {view, checkLogin}    = require('../controller/adminsController');

routes.use((req, res, next) => {
    if(!req.session.data) res.redirect('/login');
    next();
});

routes.route('/')
    .get(view);

module.exports = routes;