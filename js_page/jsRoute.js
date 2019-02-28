'use strict';
import { Router } from 'express';
var router = Router();
import { index } from 'jsController';

router.get('/', index);

export default router;