import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import {sendLog} from '../controllers/business';

const router=new Router()

router.get('/business',sendLog)

export default router