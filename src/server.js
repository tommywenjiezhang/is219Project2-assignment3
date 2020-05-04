'use strict';
const express = require('express');
const app = express();
const open = require("open");
const path = require('path');
var  bodyParser =  require('body-parser');
var methodOverride = require('method-override')
const cityRouter = require("./routes/city");
const dotenv = require('dotenv');

dotenv.config();
app.use(methodOverride("_method"))
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false }));

// open("http://localhost:9080");
app.set('views', path.join(__dirname, 'views'));

app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", cityRouter)


app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.NODEJS_IP || '127.0.0.1');

app.listen(app.get('port'), function() {
    console.log('%s: Node server started on %s ...', Date(Date.now()), app.get('port'));
});

