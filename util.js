const fs=require('fs');
const path=require('path');

function CopyMapToServer() {}

CopyMapToServer.prototype.apply = function(compiler) {

  // 设置回调来访问编译对象：
  compiler.plugin('emit',(compilation,callback)=>{
    const assets = compilation.assets;
    console.log(Object.keys(assets))
    let file, data;
    Object.keys(assets).forEach(key => {
      console.log(key)
      if (key.match(/\.map$/)) {
        data = assets[key].source()
        fs.writeFileSync(path.join(__dirname,'server/sourceMap',key), data)
      }
    })
    callback()
  })
};

module.exports = CopyMapToServer;