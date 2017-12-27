
// window.addEventListener('error',e=>{
//   console.log('【网络请求】',e)
//   return true
// },true)

const report=(paramsObj,level)=>{
  let paramsArr=[],info='';
  for(let [key,value] of Object.entries(paramsObj)){
    paramsArr.push(`${key}=${encodeURIComponent(value)}`)
  }
  info=paramsArr.join('&');
  let reportUrl=`http://localhost:3000/api/errlog?${info}`;
  new Image().src=reportUrl;
}

window.onerror=(msg,url,line,row,err)=>{
  console.log('【onerror】',msg,url,line,row,err)
  report({msg,url,line,row,err})
  return true
}
window.addEventListener('unhandledrejection',e=>{
  e.preventDefault()
  console.log('【unhandledrejection】',e)
  return true
},false)
