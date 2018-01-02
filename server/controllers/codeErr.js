import fs from 'fs';
import path from 'path';
import sourcemap  from 'source-map';
import {getDateDescription} from '../../util/public';
import {insertErrLog} from "./createDB/index";

let mapPath=path.join(__dirname,'../sourceMap/main.js.map');
let sourceObj={};

const getOriginCode=(ctx)=>{
  let {line,row}=(ctx.query);
  console.log(line,row)
  let smc = new sourcemap.SourceMapConsumer(fs.readFileSync(mapPath,'utf8'));
  let ret = smc.originalPositionFor({line:+line,column:+row});
  return ret
}
const fixName=(name)=>{
  return name.replace(/\.[\.\/]+/g,'')
}

export const codeErr=(ctx,next)=>{
  let result=getOriginCode(ctx);

  let mapFile=JSON.parse(fs.readFileSync(mapPath,'utf-8'));
  let sources=mapFile.sources;
  sources.forEach(item=>{
    sourceObj[fixName(item)]=item;
  })
  let originSource=sourceObj[result.source]
  let originContent=mapFile.sourcesContent[sources.indexOf(originSource)];
  result['sourceContent']=originContent;
  let {source,line,column,sourceContent,name}=result;
  let {report_id}=ctx.query;
  let timestamp=+new Date;
  let time=getDateDescription(timestamp);
  insertErrLog({source,line,column,sourceContent,name,timestamp,time,report_id})
}