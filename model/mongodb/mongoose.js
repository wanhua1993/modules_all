// 定义 mongoose
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/yundog'; // 连接数据库地址  yundog 指的是 数据库名字 没有则创建新的数据库

// 执行mongod  --storageEngine mmapv1 --dbpath 数据目录    ---------------这种情况是在 mongovue 数据不显示的情况下 运行的
/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose;