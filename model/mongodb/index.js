var User = require('./schema').User;

var use = new User({
    username: 'wanhua',
    password: '123456go'
});
// 插入一条数据
function save() {
    use.save(function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
}
exports.save_use = save;
// 更新一条数据、
// 根据 id 来更新一条数据
// var id = '56f2558b2dd74855a345edb2';
// var updatestr = { 'password': 'abcd' };

// User.findByIdAndUpdate(id, updatestr, function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }
// });

// // 根据 用户名 来 更新密码
// var wherestr = { 'username': 'Tracy McGrady' };
// var updatestr = { 'password': 'zzzz' };

// User.update(wherestr, updatestr, function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }
// });

// // 根据 用户名 来删除这一条数据
// var wherestr = { 'username': 'Tracy McGrady' };

// User.remove(wherestr, function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }
// });

// // 根据 用户名 来查询一条数据
// var wherestr = { 'username': 'Tracy McGrady' };
// var opt = { "username": 1, "_id": 0 }; // 表示 输出只会有username字段，设置方法如上，1表示查询输出该字段，0表示不输出
// User.find(wherestr, opt, function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }
// });

// // 数量查询
// var wherestr = {};

// User.count(wherestr, function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         // res会输出数量，也可以传入条件做条件查询！
//         console.log("Res:" + res);
//     }
// })

// // 根据 id 来查询数据
// var id = '56f261fb448779caa359cb73';

// User.findById(id, function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }
// })

// // 模糊查询
// var whereStr = { 'username': { $regex: /m/i } };
// // 查询 用户名中带有 m 的数据
// User.find(whereStr, function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }
// });

// // 分页查询
// var pageSize = 5;                   //一页多少条
// var currentPage = 1;                //当前第几页
// var sort = { 'logindate': -1 };     //排序（按登录时间倒序）
// var condition = {};                 //条件
// var skipnum = (currentPage - 1) * pageSize;   //跳过数

// User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
//     if (err) {
//         console.log("Error:" + err);
//     }
//     else {
//         console.log("Res:" + res);
//     }
// })

//     Model.distinct(field, [conditions], [callback])　　　　　　　　　　　　　　　　　　//去重
// 　　Model.findOne(conditions, [fields], [options], [callback])　　　　　　　　　　　　 //查找一条记录
// 　　Model.findOneAndRemove(conditions, [options], [callback])　　　　　　　　　　 //查找一条记录并删除
// 　　Model.findOneAndUpdate([conditions], [update], [options], [callback])　　　　　 //查找一条记录并更新






