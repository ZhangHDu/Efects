const userModel = require('../model')
const md5 = require('md5')
function findUser(name,password){
    let MD5password = md5(password)
    return userModel.findOne({
        name,
        password:MD5password,
    })
}
function findUserById(_id){
    return userModel.findOne({_id})
}
module.exports.findUser = findUser
module.exports.findUserById = findUserById
