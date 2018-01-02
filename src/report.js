const report=(paramsObj,level)=>{
  let paramsArr=[];
  let reportId=+new Date;//上报的Id
  let {type} =paramsObj;
  Object.assign(paramsObj,{report_id:reportId});
  for(let [key,value] of Object.entries(paramsObj)){
    paramsArr.push(`${key}=${encodeURIComponent(value)}`)
  }

  let info=paramsArr.join('&') || '';
  let reportUrl=`http://localhost:3000/log/${type}?${info}`;

  let img=new Image();
  window[reportId]=img;
  img.onload=img.onerror=()=>{
    window[reportId]=null
  }
  img.src=reportUrl;
}

window.onerror=(msg,url,line,row,err)=>{
  console.log('【代码出错】',{msg,url,line,row,err})
  report({msg,url,line,row,err,type:'codeerr'})
  return true
}

window.addEventListener('error',e=>{
  if(e.target.src || e.target.href){
    let type=e.target.src?'img':'link';
    console.log('【网络出错】',e);
    report({
      msg:`${type}_error`,
      url: e.target.src?e.target.src:e.target.href,
      type:'neterr',
    })
  }
},true)


window.addEventListener('unhandledrejection',e=>{
  e.preventDefault()
  console.log('【unhandledrejection】',e)
  report({
    msg:e.reason,
    type:'rejecterr',
  })
  return true
},false)
