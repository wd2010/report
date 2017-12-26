require('babel-polyfill');//转化es6 API
//babel-register通过修改require function，对所有的通过require引入的代码先经过babel编译一遍，再给到runtime执行。
require("babel-register")({presets: ['env', 'react', 'stage-0']});

const app=require('./app.js').default;
const router=require('./router/index.js').default;

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)