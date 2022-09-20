const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({


bookId:{
    type:ObjectId,
    required:true,
    ref:"Book"
},
reviewedBy:{
    type:String,
    required:true,
    default:"Guest"
},
reviewedAt:{
    type:Date,
    required:true
},
rating:{
    type:Number,
    required:true
},
isDeleted:{
    type:Boolean,
    default:false
}
},{timestamps:true})

module.exports = mongoose.model("Review",reviewSchema)
