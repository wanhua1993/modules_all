// 这是一个 用于读写 xlsx 的 node 的第三方模块
var xlsx = require('node-xlsx');
var fs = require('fs');
var list = xlsx.parse('./model/node-xlsx/node-xlsx测试.xls');
// console.log(list[0].data);
// 首先读取出的list 是一个 按照 sheet 分类的数据 其中name，data
// data中包含数组 数组顺序按照 xlsx 文件的行来排列的 

// 写入的方法
function writeXls(datas) {
    console.log(datas);
    var buffer = xlsx.build([
        {
            name: 'sheet1',
            data: datas
        }
    ]);
    fs.writeFileSync('./model/node-xlsx/test1.xlsx', buffer, { 'flag': 'w' });  //生成excel  
}

var node_xlsx = function () {
    var datas = [];
    var data_1 = [1, 2, 3];
    var data_2 = [4, 5, 6];
    datas.push(data_1);
    datas.push(data_2);
    writeXls(datas);
}

module.exports = node_xlsx;