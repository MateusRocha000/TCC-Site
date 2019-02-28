'use strict';
var express = require('express');
var router = express.Router();
var jsController = require('./jsController');

router.get('/', jsController.index);

module.exports = router;