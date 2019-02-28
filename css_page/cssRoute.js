'use strict';
var express = require('express');
var router = express.Router();
var cssController = require('./cssController');

router.get('/', cssController.index);

module.exports = router;