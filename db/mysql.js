const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// 创建数据库连接
const connection = mysql.createConnection(MYSQL_CONF);

//开始连接
connection.connect();

// 建立一个函数统一执行 SQL 语句
function exec(sql) {
    const promise = new Promise((resolve,reject) => {
        connection.query(sql,(err,result)=>{
            if (err) {
                reject(err);
                return
            }
            resolve(result);
        });
    });

    return promise;
}

//输出
// escape 方法是 mysql 提供的方法，可以直接调用
module.exports = {
    exec,
    escape:mysql.escape
};
