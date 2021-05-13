;(async function(){
const express = require('express')
//引入router
const logicRouter = require('./router/logRouter')
const uiRouter = require('./router/uiRouter')
//引入cookie
const cookieParser = require('cookie-parser')
//引入session
const session = require('express-session');
//引入connect-mongo模块
const MongoStore = require('connect-mongo')(session);
//数据库连接成功才能向下执行
await require('./db/condb')
console.log('数据库连接成功')
const app = express()
app.use(express.static('../public'))
//处理post请求上传上来的数据
app.use(express.urlencoded({extended:true}))
//解析cookie数据的中间件
app.use(cookieParser())
//全局配置对象
app.use(session({
    name: 'userid',   //设置cookie的name，默认值是：connect.sid
    secret: 'atguigu', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否在存储内容之前创建会话
    resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
    store: new MongoStore({
      url: 'mongodb://localhost:27017/sessions_container',
      touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
    }),
    cookie: {
      httpOnly: true, // 开启后前端无法通过 JS 操作cookie
      maxAge: 1000*60 // 设置cookie的过期时间
    },
  }));
//处理登录注册逻辑
//使用路由器中间件
app.use(logicRouter)
app.use(uiRouter)

//配置ejs模板
//告诉express，当前我们服务器中使用的是ejs这个模板引擎
app.set('view engine', 'ejs')
//告诉express，我们定义的模板在哪个文件夹下
//所有的.ejs文件就是所谓的模板
app.set('views', '../views/home')

app.listen(5000,(err)=>{
    if(err) console.log("错误",err);
    else console.log('服务器开启成功');
})

})()