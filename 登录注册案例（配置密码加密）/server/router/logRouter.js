const express = require('express')
//解构赋值 ，crud导出的registerUser是一个对象，而我们要获取的是对象里面的东西
const {registerUser} = require('../db/crud/register')
//引入查找用户信息的方法
const {findUser} = require('../db/crud/login')

//创建路由器对象
const router = express.Router()
//处理注册逻辑
router.post('/register',async (req,res)=>{
    //1.获取用户上传的用户名和密码
    const {username,password} = req.body
    console.log(username,password)
    //2.根据用户名和密码，创建一个用户，然后存储到数据库中
    //把数据库内数据创建封装到crud里的js文件中
    await registerUser(username,password)
    //数据库添加成功
    res.send('<a href="http://127.0.0.1:5000/login/index.html" style="text-decoration: none;">注册成功，点击回到登录界面</a>')
})
//处理登录逻辑
router.post('/login',async (req,res)=>{
    //1.获取用户上传的用户名和密码
    const {username,password} = req.body
    //2.去数据库中查找对应的数据，有则登录成功，没有就失败
    const user = await findUser(username,password)
    if(user){
        //成功
        //登录成功之后，给浏览器发送小卡片
        //这行代码其实就是修改了响应头
        // res.cookie('userId',user._id,{maxAge:1000*60})

         // 登录成功之后,要将用户id,存储到session中
        // 这行代码做的事情:
        // 1. 在session中开辟空间,存储用户id
        // 2. 生成了一个sessionid
        // 3. 在响应头中添加一个set-cookie.让浏览器将sessionid存到cookie中
        req.session.userId = user._id
        //重定向的地址添加查询字符串，这样进入主页之后id会显示在地址栏
        res.redirect('http://127.0.0.1:5000/home?_id='+user._id)
    }else{
        //失败
        res.send('登陆失败！')
    }
})
//把router导出
module.exports = router