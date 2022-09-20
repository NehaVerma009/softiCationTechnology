const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({


bookId:{
    type:ObjectId,
    required:true,
    ref:"Book",
    trim:true
},
reviewedBy:{
    type:String,
    required:true,
    default:"Guest",
    trim:true
},
reviewedAt:{
    type:Date,
    required:true,
    trim:true
},
rating:{
    type:Number,
    required:true,
    trim:true
},
isDeleted:{
    type:Boolean,
    default:false
}
},{timestamps:true})

module.exports = mongoose.model("Review",reviewSchema)
