3.0版本实现登录后主页动态显示用户名

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

--------------------------------------------------------------------------------------------------------------------------------
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
------------------------------------------------------------------------------------------------------------------------------
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

-----------------------------------------------------------------------------------------------------------
设置密码加密

安装
npm install md5

引入md5(按照逻辑，在注册完成的时候对密码进行加密，所有来到crud下的register.js)
const md5 = require('md5')

使用
let MD5password = md5(password)
    return userModel.create({
        name,
        password:MD5password,
    })

这样注册完之后去数据库就可以看到密码被加密了，但又一个问题

登录会一直显示登陆失败，原因是密码错误，因为此时数据库中的密码是加密过的，和输入框提交的密码不匹配

！所有在登录的时候，把密码加密，那它去数据库匹配就一样了，登录加密同注册加密一样