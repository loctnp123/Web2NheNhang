const mongoose = require('mongoose')
const auto = require('mongoose-auto-increment')
const categorySchema = mongoose.Schema({
    id:{type:Number,unique:true,required:[true,'This field is required']},
    category_name:{type:String,required:[true,'This field is required']},
    parent_id:Number
})
auto.initialize(mongoose.connection)
categorySchema.plugin(auto.plugin,{
    model:"Category",
    field:"id",
    startAt:1,
    incrementBy:1
})
const categoryModel = mongoose.model('Category',categorySchema)
module.exports = categoryModel
