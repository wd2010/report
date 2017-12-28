import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import {errLog} from '../controllers/business';

const router=new Router()

router.get('/errlog',errLog)

export default router