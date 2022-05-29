const model = require('../models/user.model')
class UserController{
    getAllUsers(req,res,next){
        model.find({})
            .then(data=>res.status(200).send(data))
            .catch(next)
    }
    getUserById(req,res,next){}
    addUser(req,res,next){}
    deleteUserById(req,res,next){}
    updateUserById(req,res,next){}
}
module.exports = new UserController()