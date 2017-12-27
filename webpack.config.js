const path=require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyMapToServer=require('./util.js');

  module.exports={
  context: path.join(__dirname,'./src'),
  entry: './index.js',
  output:{
    path:path.resolve(__dirname,'./dist/'),
    filename:'[name].[hash:8].js',
    publicPath:'/',
  },
  resolve:{
    extensions: ['.js','.jsx','.css','.html'],
    modules:[path.resolve(__dirname,'./src'),'node_modules'],
  },
  devtool:'source-map',
  module:{
    rules:[
      {
        test: /.js(x)?$/,
        include: path.resolve(__dirname,'src'),
        exclude: /node_modules/,
        use:{
          loader : 'babel-loader',
          options: {
            presets:['env','react','stage-0'],
            // plugins: ['transform-runtime'],
            cacheDirectory: true,
          }
        }
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(['./dist'],{root:__dirname}),
    new CopyWebpackPlugin([{
      from:'report.js',to:path.join(__dirname,'./dist')
    }]),
    new HtmlWebpackPlugin({
      title: 'noerror',
      filename:'index.html',
      template: './index.html',
    }),
    new CopyMapToServer(),//自定义方法，将生成的map文件写入server中
  ]
}

