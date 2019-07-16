const env = process.env.NODE_ENV; // 配置环境

let MYSQL_CONF;
let REDIS_CONF;

// 这是开发环境下的配置
if (env === 'dev') {
    // mysql 的连接
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'wwj1994320',
        port:'3306',
        database:'myblog'
    };

    // redis 的开发环境连接
    REDIS_CONF = {
        port:'6379',
        host:'127.0.0.1'
    }
}

// 这是线上的配置，线上的配置跟开发环境的配置肯定不一样，但是我现在在这里没有线上，模拟而已
// 但是在真是的线上配置的时候，是需要换成线上的配置
if (env === 'production') {
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'wwj1994320',
        port:'3306',
        database:'myblog'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};
