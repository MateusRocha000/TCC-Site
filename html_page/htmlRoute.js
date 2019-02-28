'use strict';
import { Router } from 'express';
var router = Router();
import { index } from 'htmlController';

router.get('/', index);

export default router;