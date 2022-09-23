const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")

let deleteReviewById= async function(req, res){
    try{
        const reviewId=req.params.reviewId
        const bookId = req.params.bookId
  
    let deleteReview= await reviewModel.findByIdAndUpdate(reviewId,{$set:{isDeleted:true,deletedAt:new Date()}})
    if(!deleteReview){
        return res.status(404).send({status:false,message:"No review found by this ID"})
    }
    
    let checkBook= await bookModel.findByIdAndUpdate(bookId,{$set:{isDeleted:true,deletedAt:new Date()}})
    if(!checkBook){
        return res.status(404).send({status:false,message:"No book found by this ID"})
    }
    
     return res.status(200).send({status:true,message:"Review deleted Succesfully"})

    }
    catch(error){
        res.status(500).send(error.message)
    }
}
module.exports.deleteReviewById= deleteReviewById