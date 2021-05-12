const userModel = require('../model')
function findUser(name,password){
    return userModel.findOne({
        name,
        password,
    })
}
module.exports.findUser = findUser

