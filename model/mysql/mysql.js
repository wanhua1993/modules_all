// 连接 mysql 数据库 并对其进行封装
var mysql = require('mysql'); // 引入 mysql 数据库模块
var dataConfig = require('../../config/database'); // 引入 mysql 数据库配置
//使用连接池
var pool = mysql.createPool(dataConfig); // 创建连接池
// 这是连接数据库的第一种方法
var query_0 = function (sql, params, callback) {
    //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
    var connection = mysql.createConnection(databaseConfig);
    connection.connect(function (err) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        //开始数据操作
        //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
        connection.query(sql, params, function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            //将查询出来的数据返回给回调函数
            callback && callback(results, fields);
            //results作为数据操作后的结果，fields作为数据库连接的一些字段
            //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库连接失败！');
                    throw err;
                }
            });
        });
    });
}
// 这个是连接数据库的第二种方法
var query_1 = function (req, res, callback) {
    // 连接连接池
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('数据库链接失败');
            throw err;
        }
        // sql 语句
        let sql = `create table if not exists todos(
            id int primary key auto_increment,
            title varchar(255)not null,
            completed tinyint(1) not null default 0
        )`;

        connection.query(sql, function (err, result) {
            if (err) {
                console.log('数据操作失败');
                throw err;
            }
            //将查询出来的数据返回给回调函数
            callback(err, result);
            // 释放连接
            connection.release();
            // 这个关闭连接的方法  得试试以后才会知道
            // connection.release(function (err){
            //     if(err) {
            //         console.log('关闭数据库失败');
            //         throw err;
            //     }
            // });
        });
    });
}
// 第三种 连接数据库的方式
var query_2 = function (sql, params) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, params, function (error, res) {
                connection.release();
                if (error) {
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
}

// 使用方式
// (async ()=>{
//     let s = await query_2(sql,params);
//     console.log(s);
// })();

//向外暴露方法
module.exports = {
    query_0: query_0,
    query_1: query_1,
    query_2: query_2
}
// 多表查询的方式
/* 1、 这种方式后面也是可以跟 order by 等 这中间可以加 left right full 这三种查询方式的
    sql: 'select admin.id, admin.username, admin.password, user.id, user.username 
        from admin inner join user on admin.username = user.username', nestTables: true
*/ 
/* 2、
    sql: 'select genres.id, genres.name, books.id, books.genreid, books.name 
        from genres inner join books on genres.id = books.genreid', nestTables: '_'
*/ 
/* 3、
    SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo  
    FROM Persons, Orders  
    WHERE Persons.Id_P = Orders.Id_P
*/ 
/* 4、 
    这种情况是两张表查询 
    select user.value from user where user.uid in (select mete.uid from mete where mete.cid = 1) 
*/ 
/* 5、
    子查询
    1. 带in关键字的子查询（一个查询语句的条件可能落在另一个select语句的查询结果中）
    select * from t_book where bookType in (select id from t_bookType);
    select * from t_book where bookType not in (select id from t_bookType);

    2. 带比较运算符的子查询（子查询可以使用比较运算符）
    select * from t_book where price >= (select price from t_priceLevel where priceLevel=1);

    3. 带exists关键字的子查询（加入子查询查询到记录，则进行外层查询，否则，不执行外层查询）
    select * from t_book where exists(select * from t_booktype);
    select * from t_book where not exists(select * from t_booktype);

    4. 带any关键字的子查询（any关键字表示满足其中任一条件）
    select * from t_book where price >= any(select price from t_priceLevel);

    5. 带all关键字的子查询（all关键字表示满足所有条件）
    select * from t_book where price >= all(select price from t_priceLevel);

    合并查询
    1. union
    使用union关键字是，数据库系统会将所有的查询结果合并到一起，然后去掉相同的记录；
    select id from t_book union select id from t_bookType;

    2. union all
    使用union all，不会去除掉重复的记录；
    select id from t_book union all select id from t_bookType;
*/ 