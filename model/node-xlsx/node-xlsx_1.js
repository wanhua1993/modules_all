// 这是读写 xlsx 文件的第二种方式
var xlsx = require('node-xlsx'); var fs = require('fs');
var obj = { "worksheets": [{ "data": [["姓名", "性别", "年龄"], ["李晓龙", "男", "24"]] }] };
var file = xlsx.build(obj);
fs.writeFileSync('user.xlsx', file, 'binary');

//node.io版
var nodeio = require('node.io');
var xlsx = require('node-xlsx');
var fs = require('fs');
var jsonData = [{ name: 'lixiaodong', age: 24, gender: 'm' }, { name: 'zhaoge', age: 24, gender: 'm' }];

exports.job = new nodeio.Job({
    input: false,//从服务器获取数据
    run: function (row) {
        var keyNames = [];
        keyNames[0] = [];
        var value = [];
        if (jsonData.length) {
            for (var key in jsonData[0]) {
                keyNames[0].push(key);
            }
            for (var i = 0; i < jsonData.length; i++) {
                value[i] = [];
                for (var key in jsonData[i]) {
                    value[i].push(jsonData[i][key]);
                }
            }
        }
        for (var i = 0; i < value.length; i++) {
            keyNames[keyNames.length] = value[i];
        }
        console.log('value:', value);
        console.log('keyNames:', keyNames);
        this.emit(keyNames);
    },
    output: function (data) {
        console.log('data:', data);
        var obj = { "worksheets": [{ "data": data }] };
        var file = xlsx.build(obj);
        fs.writeFileSync('user.xlsx', file, 'binary');
    }
});