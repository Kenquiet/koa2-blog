const crypto = require('crypto');

// 这里使用的是 Hash 算法进行加密
// 设置一个密匙
const SECRET_KEY = 'WJiol_88776#~';

function md5(content) {
    let md5 = crypto.createHash('md5')
    // digest() 方法的作用就是
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
    // 进行字符串密码拼接，这并不是固定的，只要有 password 和 SECRET_KEY 这两个值就行了
    const str = `password=${password}&key=${SECRET_KEY}`;
    return md5(str);
}

/*const result = genPassword('abc');
console.log(result);*/

module.exports = {
    genPassword
};

/***********************/
// 使用md5的方式也不太安全，也有可能别人要使用类似 md5彩虹表进行攻击，反向破解等
// 更加牛逼的加密方式 Hmac 算法
