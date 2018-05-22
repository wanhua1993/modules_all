var express = require('express');
var router = express.Router();
var moment = require('moment');
var U = require('../model/uuid/uuid'); // 獲取uuid
var request = require('request'); // 請求鷹眼數據
var cheerio_f = require('../model/cheerio/cheerio'); //爬取網頁內容
var send = require('../model/nodemailar/nodemailar'); // 发送邮件
var node_xlsx = require('../model/node-xlsx/node-xlsx'); // 读写 excel 文件
// var node_xlsx_1 = require('../model/node-xlsx/node-xlsx_1'); // 读写 excel 文件的第二种方式
// var node_xlsx_2 = require('../model/node-xlsx/node-xlsx_2'); // 读写 excel 文件的第三种方式
var save = require('../model/mongodb/index').save_use;
/* GET home page. */
router.get('/', function (req, res) {
  save();
  res.render('index', { title: 'Express' });
});
router.get('/1', function (req, res) {
  res.render('index_1', { title: 'Express' });
});
// 上传文件的模块 multer
router.post('/upload', function (req, res) {
  console.log(req.body);
  request({
    url: 'http://yingyan.baidu.com/api/v3/entity/add',
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    form: req.body
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send({
        status: 200,
        result: 'sussess',
        value: body
      });
    }
  });
});
router.post('/upload_1', function (req, res) {
  console.log(req.body);
  request({
    url: 'http://yingyan.baidu.com/api/v3/track/addpoint',
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    form: req.body
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send({
        status: 200,
        result: 'sussess',
        value: body
      });
    }
  });
});
// 使用操作 mongoose 数据库
router.post('/login', function (req, res) {
  var val = req.body;
  var user = new User({
    username: val.username, //用户账号
    password: val.password, //密码
  });
  // 插入一条数据
  user.save(function (err, res) {
    if (err) {
      console.log("Error:" + err);

    } else {
      console.log("Res:" + res);

    }
  });
  // 
});
module.exports = router;
