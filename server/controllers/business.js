import {codeErr} from './codeErr';


export const businessLog=async(ctx,next)=>{
  if(ctx.params.id=='codeerr'){
    var result=codeErr(ctx);
    console.log(result)
    ctx.body=result
    next()
  }else{
    ctx.body={
      name:'wd2010'
    }
    next()
  }


}