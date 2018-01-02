const fs=require('fs');
const path=require('path');

function CopyMapToServer() {}

CopyMapToServer.prototype.apply = function(compiler) {



  compiler.plugin('emit',(compilation,callback)=>{
    const assets = compilation.assets;
    console.log(Object.keys(assets))
    let data;
    Object.keys(assets).forEach(key => {
      console.log(key)
      if (key.match(/\.map$/)) {
        data = assets[key].source()
        let file=fs.readdirSync(path.join(__dirname,'../server/sourceMap'))[0];

        fs.unlinkSync(path.join(__dirname,'../server/sourceMap',file))

        fs.writeFileSync(path.join(__dirname,'../server/sourceMap','main.js.map'), data)
        delete assets.key;
      }
    })
    callback()
  })
};

module.exports = CopyMapToServer;