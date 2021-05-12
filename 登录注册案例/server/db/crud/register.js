const userModel = require('../model')
function registerUser(name,password){
    return userModel.create({
        name,
        password,
    })
}
module.exports.registerUser = registerUser

