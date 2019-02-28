'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    html_answer: {
        type: String
    },
    css_answer: {
        type: String
    },
    js_answer: {
        type: String
    }
});

UserSchema.pre('save', function(next){
    var user
});