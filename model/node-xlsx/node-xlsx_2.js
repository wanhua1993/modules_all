// 这是 读写 xlsx 文件的第三种方式
const js_xlsx = require('xlsx');
// 了解一些概念
/*
    在使用这个库之前，先介绍库中的一些概念。
    workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
    worksheet 对象，指的是 Excel 文档中的表。我们知道一份 Excel 文档中可以包含很多张表，而每张表对应的就是 worksheet 对象。
    cell 对象，指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。
*/
/*
    基本用法
    用 XLSX.readFile 打开 Excel 文件，返回 workbook
    用 workbook.SheetNames 获取表名
    用 workbook.Sheets[xxx] 通过表名获取表格
    按自己的需求去处理表格
    生成新的 Excel 文件
*/
const workbook = js_xlsx.readFile('./model/node-xlsx/node-xlsx测试.xls');
var XLSX = function () {
    const worksheet = workbook.Sheets;
    const headers = {};
    const data = [];
    const keys = Object.keys(worksheet);
    console.log(keys);
    keys
        // 过滤以 ! 开头的 key
        .filter(k => k[0] !== '!')
        // 遍历所有单元格
        .forEach(k => {
            // 如 A11 中的 A
            let col = k.substring(0, 1);
            // 如 A11 中的 11
            let row = parseInt(k.substring(1));
            // 当前单元格的值
            let value = worksheet[k].v;
            // 保存字段名
            if (row === 1) {
                headers[col] = value;
                return;
            }
            // 解析成 JSON
            if (!data[row]) {
                data[row] = {};
            }
            data[row][headers[col]] = value;
            console.log(data);
        });
}

module.exports = XLSX;