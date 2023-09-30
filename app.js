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
app.use(express.static('public'));
app.use('/frontpage', express.static(path.join(__dirname, 'public/frontend/')));
app.use('/backend', express.static(path.join(__dirname, 'public/assets/backend/')));
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
app.use(expressLayout);
app.use('/', (req, res, next) => {
    app.set('layout', './frontend/template/template');
    next();
});

app.use('/admins', (req, res, next) => {
    app.set('layout', './backend/template/template');
    console.log('admin mode');
    next();
});
const frontpage = require('./routes/frontpage');
const admins    = require('./routes/admins');
app.use('/', frontpage);
app.use('/admins', admins);



app.listen(port, () => {
    console.log('App listening on port: '+port);
});