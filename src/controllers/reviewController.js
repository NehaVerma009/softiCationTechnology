const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const isValid = require ("../validators/reviewValidator")

let deleteReviewById= async function(req, res){
    try{
        const reviewId=req.params.reviewId
        const bookId = req.params.bookId
        
        let validReviewID = isValid.isValidReviewId(reviewId)
       
        if(validReviewID){
            return res.status(400).send({status:false, message:validReviewID})
        }

        let validBookID = isValid.isValidBookId(bookId)

        if(validBookID){
            return res.status(400).send({status:false, message:validBookID})
        }

    let deleteReview= await reviewModel.findOneAndUpdate({_id:reviewId,isDeleted:false,bookId:bookId},{$set:{isDeleted:true}},{new :true})
    
    if(!deleteReview){
        return res.status(404).send({status:false,message:"No review found by this ID"})
    }
    
  let countReview = await bookModel.findOneAndUpdate({_id:bookId, isDeleted:false},{$inc:{reviews:-1}},{new:true})
  if(!countReview){
    return res.status(404).send({status:false,message:"No Book found by this ID"})
  }
     return res.status(200).send({status:true,message:"Review deleted Succesfully"})

    }
    catch(error){
        res.status(500).send(error.message)
    }

}
module.exports.deleteReviewById= deleteReviewById