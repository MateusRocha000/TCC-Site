'use strict';
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var index = require('./indexRoute');
var html = require('./html_page/htmlRoute');
var css = require('./css_page/cssRoute');
var js = require('./js_page/jsRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/'));
app.use('/', index);
app.use('/html', html);
app.use('/css', css);
app.use('/javascript', js);

//Error handler
app.use(function(req, res, next){
    let err = new Error('Arquivo não encontrado');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(process.env.PORT || 8000, function(){
    console.log('Express app escutando na porta 8000...');
});