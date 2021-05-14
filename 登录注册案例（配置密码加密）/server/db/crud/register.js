const userModel = require('../model')
const md5 = require('md5')
function registerUser(name,password){
    let MD5password = md5(password)
    return userModel.create({
        name,
        password:MD5password,
    })
}
module.exports.registerUser = registerUser

