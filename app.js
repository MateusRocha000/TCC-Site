'use strict';
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var index = require('./indexRoute');
var html = require('./html_page/htmlRoute');
var css = require('./css_page/cssRoute');
var js = require('./js_page/jsRoute');

//Connect MongoDB
mongoose.connect('mongodb://localhost/WebWorld');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o db: '));
db.once('open', function(){
    console.log("db funcionando");
});

app.use(session({
    secret: 'best site',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

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

var schema = new mongoose.Schema({
    code: String
});
var UserSchema = mongoose.model("Answer", schema);

app.post("/answer", function(req, res){
    var myData = new UserSchema(req.body);
    myData.save().then(item => {
        res.send("Código salvo no banco de dados");
        console.log(myData);
    }).catch(err => {
        res.status(400).send("Não foi possível salvo o código");
    });
});

app.listen(8000, function(){
    console.log('Express app escutando na porta 8000...');
});