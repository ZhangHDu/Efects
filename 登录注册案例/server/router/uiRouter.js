const express = require('express')
//创建路由对象
const uiRouter = express.Router()
const {findUserById} = require('../db/crud/login')
//响应首页
uiRouter.get('/home',async(req,res)=>{
    if(req.session.userId){
        const user = await findUserById(req.query._id)
        res.render('index',{username:user.name})
    }else{
        res.redirect('http://127.0.0.1:5000/login/index.html')
    }
})
//响应详情页面
uiRouter.get('/detail',(req,res)=>{
    if(req.session.userId){
        res.render('detail',{})
    }else{
        res.redirect('http://127.0.0.1:5000/login/index.html')
    }
})
module.exports = uiRouter