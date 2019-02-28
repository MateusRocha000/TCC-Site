'use strict';
var path = require("path");

exports.index = function(req, res, next){
    return res.sendFile(path.join(__dirname + 'index.html'));
}