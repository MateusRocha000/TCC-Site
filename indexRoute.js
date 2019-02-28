'use strict';
import { Router } from 'express';
var router = Router();
import indexController, { index } from 'indexController';

console.log(indexController);
router.get('/', index);

export default router;