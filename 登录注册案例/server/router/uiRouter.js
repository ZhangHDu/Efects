const express = require('express')
//创建路由对象
const uiRouter = express.Router()

uiRouter.get('/home',(req,res)=>{
    res.render('index',{username:'爸爸'})
})
module.exports = uiRouter