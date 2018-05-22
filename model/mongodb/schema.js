// 建立模型
var mongoose = require('./mongoose');
var Schema = mongoose.Schema;
// 建立  用户  类
var UserSchema = new Schema({
    username: { type: String }, //用户账号
    password: { type: String },  //密码
});
var User = mongoose.model('User', UserSchema);
module.exports = {
    User: User
}