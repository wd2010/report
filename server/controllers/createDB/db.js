import mongoose from 'mongoose';
let url='mongodb://127.0.0.1:27017/report'

/**
 * 连接
 */
mongoose.connect(url);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to ' + url);
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});

export default mongoose.createConnection(url);