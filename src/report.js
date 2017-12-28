const report=(paramsObj,level)=>{
  let paramsArr=[];
  for(let [key,value] of Object.entries(paramsObj)){
    paramsArr.push(`${key}=${encodeURIComponent(value)}`)
  }
  let info=paramsArr.join('&') || '';
  let reportUrl=`http://localhost:3000/api/errlog?${info}`;

  let reportId=`${+new Date}_${Math.random()*10}`;//上报的Id
  let img=new Image();
  window[reportId]=img;
  img.onload=img.onerror=()=>{
    window[reportId]=null
  }
  img.src=reportUrl;
}

window.onerror=(msg,url,line,row,err)=>{
  let type=msg.split(':')[0];
  console.log('【代码出错】',{msg,url,line,row,err,type})
  report({msg,url,line,row,err,type})
  return true
}

window.addEventListener('error',e=>{
  if(e.target.src || e.target.href){
    let type=e.target.src?'img':'link';
    console.log('【网络出错】',e);
    report({
      msg:`${type}_error`,
      url: e.target.src?e.target.src:e.target.href,
      type,
    })
  }
},true)


window.addEventListener('unhandledrejection',e=>{
  e.preventDefault()
  console.log('【unhandledrejection】',e)
  report({
    msg:e.reason,
    type:e.type,
  })
  return true
},false)
