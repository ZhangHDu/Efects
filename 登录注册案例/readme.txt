打开方式：server文件夹启动cmd，启动服务器（nodemon app.js）
然后在浏览器地址栏输入：127.0.0.1:5000/login/index.html
------------------------------------------------------------------------------------------------------

当前版本实现登录后主页动态显示用户名

先把router文件夹下的logRouter.js里的重定向路径改为res.redirect('http://127.0.0.1:5000/home?_id='+user._id)

这个时候登录后地址栏会显示当前的用户的id

然后来到db下的crud下的login.js里封装一个函数来通过id查找用户数据，注意要导出
function findUserById(_id){
    return userModel.findOne({_id})
}
module.exports.findUserById = findUserById

导出之后来到router文件夹下的uiRouter.js,先引入
const {findUserById} = require('../db/crud/login')

然后创建一个常量接受用户数据，然后再导出就行了
uiRouter.get('/home',async(req,res)=>{
    const user = await findUserById(req.query._id)
    res.render('index',{username:user.name})
})
module.exports = uiRouter

-------------------------------------------------------------------------------------------------------
给客户端设置cookie
1.安装npm i cookie-parser
2.在app.js中引入
    const cookieParser = require('cookie-parser')
3.在app.js中使用（注意写在其他中间件前面）
    app.use(cookieParser())
4.登陆成功后给客户端返回一个cookie，找到处理登录逻辑的代码(logRouter.js)
修改响应头
    res.cookie('userId',user._id,{maxAge:1000*60})
5.服务器端接收客户端传递过来的cookie
    req.cookies.userId
！！！！！！！！！！！！！！(不安全)
-------------------------------------------------------------------------------------------------------
设置session
1.安装
1.1：用于在express中操作session
npm i express-session
1.2：用于将session写入数据库（session持久化）
npm iconnect-mongo
2.引入
引入session
const session = require('express-session');
引入connect-mongo模块
const MongoStore = require('connect-mongo')(session);
3.编写全局配置对象：
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
            maxAge: 1000*30 // 设置cookie的过期时间
          },
        }));
4.在logRouter.js中把res.cookie('userId',user._id,{maxAge:1000*60})修改为req.session.userId = user._id
5.在uiRouter.js中把req.cookie.userId修改为req.session.userId