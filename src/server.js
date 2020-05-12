'use strict';
const express = require('express');
const app = express();
const cityRouter = require("./routes/city");
const indexRouter = require('./routes/index');
const commentRouter = require('./routes/comment')
const path = require("path");
const passport = require('passport');
const session = require("express-session");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const open = require('open');

open("http://localhost:8000/city");



app.use(session({
    secret: "cats",
    cookie: {
        maxAge: 4000000
    },
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
require("./auth/index");
app.use(methodOverride("_method"));
dotenv.config();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
});
app.use('/',indexRouter);
app.use("/city", cityRouter);
app.use("/city/:id/comments", commentRouter);

app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.NODEJS_IP || '127.0.0.1');

app.listen(app.get('port'), function() {
    console.log('%s: Node server started on %s ...', Date(Date.now()), app.get('port'));
});

