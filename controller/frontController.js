const { user }      = require('../models/index'); 
const Op            = require('sequelize');
const queryString   = require('querystring');

responData          = {
    data: {
        jsFiles: [], //array only 
        other: {}
    }
};

module.exports = {
    baseView: (req, res) => {
        res.render("index", responData);
    },

    loginView: (req, res) => {
        if (req.session.data) {
            res.redirect("/");
        } else {
            responData.data.jsFiles = ["login.js"];
            res.render("login", { data: {}, extractScripts: true});
        }
    },

    doLogin: (req, res) => {
        if (req.body.email && req.body.password) {
            const { email, password } = req.body;

            user.findAll({
                where: {
                    email,
                    password
                },
                limit: 1
            }).then((result) => {
                if(result.length) {
                    req.session.data = result[0].dataValues;
                    res.send({
                        title: "Success",
                        status: true,
                        message: "Success Login",
                        type: "success"
                    });
                
                }else res.send({
                    title: "Failed",
                    status: false,
                    message: "Invalid email / password",
                    type: "error"
                });

            }).catch((err) => {
                // console.log(err);
                res.status(400).send({
                    status: 400,
                    message: "Query error occured!"
                });
            });
        }
    },

    registerPage: (req, res) => {
        res.render('register');
    }
};
