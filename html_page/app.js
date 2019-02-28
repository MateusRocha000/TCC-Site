'use strict'
import express from 'express';
var app = express();
import mongoose from 'mongoose';
var bcrypt = require('bcrypt');

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