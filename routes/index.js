var express = require('express');
var router = express.Router();
var moment = require('moment');
var U = require('../model/uuid/uuid'); // 獲取uuid
var request = require('request'); // 請求鷹眼數據
var cheerio_f = require('../model/cheerio/cheerio'); //爬取網頁內容

/* GET home page. */
router.get('/', function (req, res, next) {
  // cheerio_f();
  res.render('index', { title: 'Express' });
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
router.post('/upload_1', function (req, res){
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
module.exports = router;
