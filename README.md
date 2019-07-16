## 以下的讲解全部是在 Mac 上 
## 运行
1. npm run dev 开发环境下运行
2. npm run prd 线上环境运行，使用了 pm2 插件
## 数据库
1. 使用 MySQL 数据库
### Mac 安装 MySQL 方法及配置
1. 安装方法 百度一堆，最注意的问题是要记住分配给的 root 的密码，或者自己设置的密码
2. 配置
  +  终端任何位置输入以下，进入到文件 .bash_profile 中
      ```shell
      $ vim ~/.bash_profile
      ```
  + 按 `i` 进行编辑，添加以下代码后，按esc 再在英文模式下 按shift + :，然后输入 wq 回车退出
      ```shell
      export PATH=$PATH:/usr/local/mysql/bin
      ```
  + 执行以下代码
      ```shell
      source ~/.bash_profile 
      ```
  + 再执行 mysql -u root -p 就可以进入到 mysql 了

3. 使用 MySQL 图形化界面 MySQLWorkbench
## redis 的安装
1. 首先安装brew，去 brew.sh 官网复制粘贴那段代码，到终端粘贴，不要打开 sudo su ,在不进入管理模式安装,
然后会在停止叫你输入enter 继续或者任意键停止，回车继续.
  ```shell
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```
2. 安装 redis,不要进入管理员模式
  ```
  brew install redis
  ```
3. 启动 redis
  ```
  redis-server
  ```
## nginx 的安装和配置
1. 安装
  ```shell
  brew install nginx
  ```
2. 配置
  + 首先打开配置文件：vim /usr/local/etc/nginx/nginx.conf
3. 修改代理分配

## 接口
1. /api/blog/list : 博客列表
2. /api/blog/detail : 博客详情
3. /api/blog/new : 博客新建
4. /api/blog/update : 博客更新
5. /api/blog/del : 博客删除
6. /api/user/login : 用户登录
