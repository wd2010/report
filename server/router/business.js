import Router from 'koa-router';
import {getErrList,getErrDetail,reportErr} from '../controllers/business';

const router=new Router();

router.get('/log/errlog/list',getErrList)
router.get('/log/errlog/:id',getErrDetail)
router.get('/log/:id',reportErr)

export default router;