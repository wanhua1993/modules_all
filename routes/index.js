var express = require('express');
var router = express.Router();
var moment = require('moment');
var U = require('../model/uuid/uuid');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(U);
  res.render('index', { title: 'Express' });
});
// 上传文件的模块 multer
router.post('/upload', function (req, res) {

});
module.exports = router;
