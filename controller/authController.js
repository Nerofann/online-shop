const { user }      = require('../models/index'); 
const Op            = require('sequelize');
const queryString   = require('querystring');

module.exports = {
    view: (req, res) => {
        if (req.session.data) {
            res.render('frontend/404');
        } else {
            res.render('frontend/login');
        }
    },

    login: (req, res) => {
        try {
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
        } catch (error) {
            res.json(error);
        }
    },


    viewRegister: (req, res) => {
        res.render('frontend/register');
    },

    register: (req, res) => {
        try {
            const {fullname, email, password} = req.body;
            user.findAll({
                where: {
                    email
                },
                limit: 1
            }).then(async (result) => {
                if(result.length) {
                    res.status(200).send({
                        message: "Email already used"
                    });
                
                }else {
                    let res = await user.create({fullname: fullname, email: email, password: password});
                    console.log(res)
                } 

                
            }).catch((err) => {
                res.status(500).send("Error occured");
            })

        } catch (error) {
            console.log(error);
        }
    }
}