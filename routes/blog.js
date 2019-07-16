const router = require('koa-router')();
const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog');
const { SuccessModel,ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || '' ;
    const keyword = ctx.query.keyword || '' ;

    // 管理员登陆页面，如果没有登录，那么将无法获取列表页面
    // if(ctx.query.isadmin == null) {
    //     if (ctx.session.username) {
    //         ctx.body = new SuccessModel('未登录')
    //         return
    //     }
    //     author = ctx.session.username
    // }
    // 因为 getList 返回的是一个 Promise 对象 所以需要改一下
    const listData = await getList(author,keyword);
    ctx.body = new SuccessModel(listData)
});

// 获取博客详情
router.get('/detail', async function (ctx,next) {
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data)
});

// 新建博客
router.post('/new', loginCheck, async (ctx, next) => {
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const data = await newBlog(body);
    ctx.body = new SuccessModel(data)
});

// 更新一篇博客
router.post('/update', loginCheck, async (ctx, next) => {
    const value = await updateBlog(ctx.query.id,ctx.request.body);
    if (value) {
        ctx.body = new SuccessModel()
    }else {
        ctx.body = new ErrorModel('更新博客失败')
    }
});

//删除一篇博客
router.post('/del', loginCheck, async (ctx, next) => {
    const author = ctx.session.username;
    const value = await deleteBlog(ctx.query.id,author);
    if (value) {
       ctx.body =  new SuccessModel()
    }else {
        ctx.body =  new ErrorModel('删除博客失败')
    }
});

module.exports = router;
