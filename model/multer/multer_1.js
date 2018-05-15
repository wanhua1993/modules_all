var muilter = require('./multer');

var upload = muilter.single('file'); // multer 有 single() 中的名称 必须是表单上传字段的 name 名称。

// 这个是用于 中间件处理的
exports.dataInput = function (req, res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        console.log(req.file);
        console.log(req.files);
    });
}
// 1.文件上传有以下方法

// muilter.single(‘file’)  //适用于单文件上传
// muilter.array(‘file’,num) //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
// muilter.fields(fields) //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。

// 2.file为上传字段名称，当使用form表单submit方式上传时，必须与表单上传的name属性保持一致。
// 表单记得加上  enctype=‘multipart/form-data’
// 3.对上传文件大小限制，名称限制等均可在limits中加上，具体可加属性，请参考官方api。