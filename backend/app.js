var express = require('express');
var app = express();
var router = require('./rutas');

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', router)

module.exports = app
