'use strict';
var express = require('express');
var router = express.Router();
var htmlController = require('./htmlController');

router.get('/', htmlController.index);

module.exports = router;