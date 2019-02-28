'use strict';
import { Router } from 'express';
var router = Router();
import { index } from 'cssController';

router.get('/', index);

export default router;