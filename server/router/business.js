import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import {businessLog} from '../controllers/business';

const router=new Router()

router.get('/log/:id',businessLog)

export default router