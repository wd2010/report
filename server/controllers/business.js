
export const sendLog=async(ctx,next)=>{
  console.log(ctx.req.url)
  ctx.body={
    name:'wd2010',
    age:'23',
  }
}