const { exec,escape } = require('../db/mysql');
const xss = require('xss');

// 博客列表
const getList = async (author, keyword) => {
    // 1=1 的作用就是占位，万一 author 和 keyword 都没有值，
    // 那where 后面直接直接加 order就会报错
    // 注意 每个sql 后面（或者前面都加）都加空格，因为是拼接字符串，不能少了空格
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        author = escape(author);
        sql += `and author=${author} `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc; `;

    // 注意这里返回的 是一个 Promise 对象
    return await exec(sql);
};

// 博客详情
const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}' `;
    const rows = await exec(sql);
    return rows[0]
    // return await exec(sql).then(rows =>{
    //     // 因为查询到的是一个数组，我们需要将数组中的第一个对象取出，并返回
    //     return rows[0];
    // })
};

// 新建博客
const newBlog = async ( blogData = {} ) => {
    // blogData 是一个博客对象 里面包含 title content author createtime 等数据
    // 通过 xss 函数将代码块一包起来，js 的特殊字符就被转义了，将不再是可执行的代码
    const title = escape(xss(blogData.title));
    const content = escape(xss(blogData.content));
    const author = escape(xss(blogData.author));
    const createtime = Date.now();

    const sql = `
       insert into blogs(title,content,author,createtime)value(${title},${content},${author},'${createtime}')
    `;
    const insertData = await exec(sql);
    return  {
        id:insertData.insertId
    }
};

// 更新博客
const updateBlog = async (id, blogData={}) => {
    // id 就是博客的 id
    // blogData 是一个博客对象 里面包含 title content 等数据
    // 使用 escape()防止 sql 注入
    const title = escape(xss(blogData.title));
    const content = escape(xss(blogData.content));
    const sql = `update blogs set title=${title},content=${content} where id=${id} `;
    const updateData = await exec(sql);
    if (updateData.affectedRows > 0) {
        return true
    }
    return false
};

// 删除博客
const deleteBlog = async (id,author) => {
    // 使用 escape 防止sql 注入
    id = escape(id);
    author = escape(author);
    const sql = `delete from blogs where id=${id} and author=${author} `;
    const deleteData = await exec(sql);
    if (deleteData.affectedRows > 0) {
        return true
    }
    return false
};

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
};
