const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');// 用来处理 body 的
const logger = require('koa-logger');
const session = require('koa-generic-session'); //用来处理session
const redisStore = require('koa-redis'); // 用来将 session 存入到 redis 中
const fs = require('fs');
const path = require('path');
const morgan = require('koa-morgan');// 日志记录使用

const { REDIS_CONF } = require('./config/db');

const user = require('./routes/user');
const blog = require('./routes/blog');

// error handler
onerror(app);

// middlewares
// 下面这两条主要的作用就是处理请求的body 数据，然后将数据的格式进行转换
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());

// 处理日志的
app.use(logger());
// logger
// 处理请求 耗时的
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// 定义写日志
const ENV = process.env.NODE_ENV;
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(morgan('dev'));
}else {
  // 线上环境
  const logFileName = path.join(__dirname,'logs','access.log'); // 拼接写入文件路径
  const writeStream = fs.createWriteStream(logFileName,{ // 使用 stream 流写入文件
    flags:'a' // 定义向后面添加
  });
  // morgan 也是使用stream这种方式进行写入日志的，不要忘了
  app.use(morgan('combined'),{
    stream: writeStream // 将生成的log写入到 writeStream 再写入到 logFileName（access.log）中
  });
}

// session 的配置
app.keys = ['WJiol_88776#~'];
app.use(session({
  // 配置cookie
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // 配置redis
  store: redisStore({
    // all:'127.0.0.1:6379' //先写死本地的redis
    all:`$(REDIS_CONF.host):$(REDIS_CONF.port)`
  })
}));

// routes
app.use(blog.routes(),blog.allowedMethods());
app.use(user.routes(),user.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
