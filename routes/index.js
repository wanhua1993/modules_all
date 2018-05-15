var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// 上传文件的模块 multer
router.post('/upload', function (req, res) {

});
module.exports = router;
