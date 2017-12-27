
// window.addEventListener('error',e=>{
//   console.log('【网络请求】',e)
//   return true
// },true)

window.onerror=(msg,url,line,row,err)=>{
  console.log('【onerror】',msg,url,line,row,err)
  return true
}
window.addEventListener('unhandledrejection',e=>{
  e.preventDefault()
  console.log('【unhandledrejection】',e)
  return true
},false)
