'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let answerHTML = new Schema({
    answer: String
});

let Answer = mongoose.model("answer", answerHTML);
module.exports = Answer;