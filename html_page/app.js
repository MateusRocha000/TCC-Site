'use strict'
import express from 'express';
var app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);

//MongoDB
mongoose.connect('mongodb://localhost/WebWorld');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexao com o db: '));
db.once('open', function(){
    console.log("db funfando...");
});

//Requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Rotas
app.use(express.static(__dirname + '/TCC-SITE'));
app.use('/', index);
app.use('/html', html);
app.use('/css');
app.use('/javascript', javascript);

//Error handler
app.use(function (req, res, next){
    let err = new Error('Arquivo não encontrado');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(8000, function(){
    console.log('Escutando porta 8000...');
});