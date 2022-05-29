const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    id:Number,
    avatar:String,
    createdAt:String,
    delivery_infos:[],
    email:String,
    name:String,
    phone:String,
    password:String,
    payment_infos:[],
    username:String,
    is_banned:Boolean
})
const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel