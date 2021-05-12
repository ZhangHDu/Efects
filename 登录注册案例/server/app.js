;(async function(){
const express = require('express')
//引入router
const logicRouter = require('./router/logRouter')
const uiRouter = require('./router/uiRouter')
//数据库连接成功才能向下执行
await require('./db/condb')
console.log('数据库连接成功')
const app = express()
app.use(express.static('../public'))
//处理post请求上传上来的数据
app.use(express.urlencoded({extended:true}))
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