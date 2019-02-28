'use strict';
var express = require('express');
var router = express.Router();
var indexController = require('./indexController');

router.get('/', indexController.index);

module.exports = router;