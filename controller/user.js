const { exec ,escape } = require('../db/mysql');
const { genPassword } = require('../utils/cryp');

// 登陆
const login = async (username,password) => {
    // 用 escape 方法进行
    username = escape(username);
    password = genPassword(password); // 加密
    password = escape(password); // 先加密再转换
    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `;
    const rows = await exec(sql);
    return rows[0] || {};
};
module.exports = {
    login
};
