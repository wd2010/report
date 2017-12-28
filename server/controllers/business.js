import fs from 'fs';
import path from 'path';
import sourcemap  from 'source-map';

const getOriginCode=({line,column})=>{
  let smc = new sourcemap.SourceMapConsumer(fs.readFileSync(path.join(__dirname,'../sourceMap/main.js.map'),'utf8'));
  let ret = smc.originalPositionFor({line:1,column:58});
 return ret
}


export const errLog=async(ctx,next)=>{
  let {line,row}=(ctx.query);
  let ret=getOriginCode({line,column:row});
  console.log(ret)
  ctx.body={
    name:'wd2010',
    age:'23',
    ret
  }
}