import {codeErr} from './codeErr';
import {findErrList,findErrDetail} from './createDB/index.js';

//上报err
export const reportErr=async(ctx,next)=>{
  if(ctx.params.id=='codeerr'){
    let result=codeErr(ctx);
    ctx.body='success'
  }else{
    ctx.body={name:'wd2010'}
  }
}
//err detail
export const getErrDetail=async(ctx,next)=>{
  const {id}=ctx.params;
  let err_detail=await findErrDetail(id);
  ctx.body=err_detail;
}

//err list
export const getErrList=async(ctx,next)=>{
  let err_list=await findErrList();
  ctx.body=err_list;
}