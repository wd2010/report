import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const router=new Router();

fs.readdirSync(__dirname)
  .filter(filename=>filename!==path.basename(__filename))
  .forEach(filename=>{
    let subRouter=require(`./${filename}`).default
    router.use(subRouter.routes(),subRouter.allowedMethods())
  })

export default router
