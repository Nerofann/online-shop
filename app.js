require('dotenv').config();
const express   = require('express');
const expressLayout  = require('express-ejs-layouts');
const session   = require('express-session');
const httpServ  = require('http');
const path      = require('path');
const app       = express();
const port      = process.env.PORT || 3000;


//Set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Templatea
app.use(expressLayout);
app.set('layout', './template/template');
app.use(express.static('public'));
app.use('/frontpage', express.static(path.join(__dirname, 'public/frontpage/')));
app.use('/backend', express.static(path.join(__dirname, 'public/assets/backend/')));

//use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "faniannur",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        maxAge: 300000
    }
}));

//Routing
const frontpage = require('./routes/frontpage');
app.use('/', frontpage);



app.listen(port, () => {
    console.log('App listening on port: '+port);
});