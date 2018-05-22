//第一步引入mongoose
var mongoose = require('mongoose');
var config = require('../../config/db');
mongoose.Promise = Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;

//第二部连接数据库
mongoose.connect(config.dbUrl);

//第三步定义用户的Schema 模型骨架
var UserSchema = new mongoose.Schema({
    avatar: String,
    username: String, //定义此集合中的文件拥有username属性
    password: String  //定义此集合中的文件拥有password属性
}, { collection: 'user' }); //指定存储在数据库中集合的名称
//第四部定义模型
var User = mongoose.model('User', UserSchema);
exports.User = User;
