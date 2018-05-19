// 这是一个发送邮件的模块
const nodemailer = require('nodemailer');
// 简单配置
const params = {
    host: 'smtp.163.com',
    port: 465,
    secture: false,
    auth: {
        user: '13400133993@163.com',
        pass: 'wanhua1993'
    }
}
// 邮件信息
const mailOptions = {
    from: '13400133993@163.com',
    to: '1028830460@qq.com', // 这里可以发送多个用户  分别用 ， 隔开
    subject: 'hello，测试邮件功能！',
    html: '刘伟 那个小妖精是谁啊？？？？？？', // 这里可以是 html 标签 字符串
    // attachments: [{ // 这里可以添加附件  并且可以添加多个
    //     filename: 'test.txt',
    //     content: 'hello world!'
    //   },{
    //     filename: 'test.txt',
    //     content: 'hello world!',
    //     contentType: 'text/plain'
    //   }]
    // }
}
// 发送邮件
var send = function () {
    const transpoter = nodemailer.createTransport(params);
    transpoter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return
        }
        console.log(info);
    });
}
module.exports = send;

