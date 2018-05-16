var express = require('express');
var router = express.Router();
var moment = require('moment');
/* GET home page. */
router.get('/', function (req, res, next) {
  var time = moment().format('llll'); 
  console.log(time);
  res.render('index', { title: 'Express' });
});
// 上传文件的模块 multer
router.post('/upload', function (req, res) {

});
module.exports = router;
