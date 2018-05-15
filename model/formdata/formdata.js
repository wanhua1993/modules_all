var formdiable = require('formidable');

var form = new formdiable.IncomingForm(); // 可以通过该方法创建一个form表单

form.encoding = 'utf-8'; // 通过encoding属性设置字段编码

form.uploadDir = '/tmp/'; // 通过uploadDir设置上传文件时临时文件存放的位置，默认上传的临时文件存放的位置为os.tmpDir();

 // 通过keepExtensions属性可以设置文件上传时临时文件的文件名是否包括扩展名。如果该值为真，即为包括扩展名，否则，就不包括扩展名。
form.keepExtensions = false;

form.maxFieldsSize = 2 * 1024 * 1024; // form中存在form.type属性，表示form表单的类型。该属性有两个值：mulitpart/urlencoded。
//该属性的值取决于request的类型。maxFieldsSize属性限制了所有字段所占的字节数。如果超过了该字节数，将会报错。默认的字节数为2MB

form.maxFields = 1000; // maxFields属性限制了解析请求字段的的数量。默认为1000个

form.hash = 'md5'; // hash属性可以设置md5和sha1校验方法，默认为false（不进行校验）

// parse方法解析node.js中request请求中包含的form表单提交的数据。cb为处理请求的回调函数。
form.parse(req, function (err, fields, files) {
    console.log(fields); // 这里存储的是除文件外的其他传递的属性
    console.log(files); //  这里是上传的文件信息
    // 可以在这里设置存储的路径 开始读取临时存储文件的地址然后在写入到新的地址中
});

form.onPart(part);

// 如果你想根据喜好处理字节流，你可以重写该方法。如果重写方法，field/file等属性和方法将会失效，由你完全控制该进程。
form.onPart = function (part) {
    part.addEventListener('data', function () {
        //...
    });
}

// 如果你想用该模块自己控制特定的部分。可以按照如下方法实现。
form.onPart = function (part) {
    if (!part.filename) {
        form.handlePart(part);
    }
}

// Formidable.File
// file.size定义上传文件的字节数。如果文件在上传中，该属性表示已经写到磁盘上的字节数。
file.size = 0

// file.path方法定义了文件写入的路径（临时路径）。如果对该文件路径不满意，可以在fileBegin时间中修改该属性。
file.path = null

// file.name保存了文件在客户端中的名字
file.name = null

// file.type保存了文件在客户端中的mime type
file.tupe = null;

// file.lastModifiedDate保存了该文件最后修改的日期
// file.hash保存了该文件是否通过hash算法进行加密，如果该值被设置，可以通过hex 获取该变量的值
// Formidable.File#toJSON()方法返回一个json格式的文件，该文件可以使用shiyongJSON.stringify()方法方便多请求作出响应。
// 事件
// progress事件在接收到每一个解析的数据块后触发。可以根据该事件更新进度条
form.on('progress', function (bytesReceived, bytesExpected) {

});

// field时间在接收到一个字段键值对的时候触发
form.on('field', function (name, value) {

});

// fileBegin事件在一个新文件开始上传时触发，如果想改变文件上传的路径，可以在该事件内定义。
form.on('fileBegin', function (name, file) {

});

// file事件在接收到一个文件字段值是触发。file是File的实例
form.on('file', function (name, file) {

});

// error在接收form表单提交的数据发生错误时触发。如果请求过程中有错误，该请求将会自动终止。但是如果你想继续发送请求，可以使用request.resume()方法。
form.on('error', function (err) {

});

// ‘aborted’事件是当用户中止请求时触发，上传时间超时或者通过socket关闭事件也可以触发该事件。该事件触发后，将会随着触发error时间
form.on('aborted', function () {

});

// ‘end’时间在请求完全接收后触发，即文件已被成功存入磁盘。通过该事件可以发送响应
form.on('end', function () {

});
