const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const isValid = require ("../validators/reviewValidator")
const isValidUser = require("../validators/userValidator")


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


const createReview = async function(req,res){

    const bookId = req.params.bookId
    const data = req.body
    //not done in authentication
    if (!bookId || !isValidUser.isValidId(bookId))
    return res.status(400).send({ status: false, message: "No bookId given or invalid" });
    
    if (Object.keys(req.query).length != 0) {
       return res.status(400).send({ status: false, message: "Query params not allowed" });
     }
    const book = await bookModel.findOne({_id:bookId,isDeleted:false})

    if(!book) 
    return res.status(404).send({status:false,message:"No book found"})

    let rating= isValid.isValidRating(data.rating)
    if(rating){
        return res.status(400).send({status: false, message: rating})
    }
    //if we send empty string in update?
    if(data.reviewedBy!=undefined)
    {
        let reviewedBy= isValid.isValidate(data.reviewedBy)
        if(!reviewedBy)
            return res.status(400).send({status: false, message: "Reviewer's name should be non-empty string!"})
    }
    
    if(data.review!=undefined)
    {
        let review= isValid.isValidate(data.review)
        if(!review)
            return res.status(400).send({status: false, message: "Review should be non-empty string!"})
    }

    const bookData = await bookModel.findOneAndUpdate({bookId:bookId,isDeleted:false},{$inc:{reviews:1}},{new:true})
    data.bookId = bookId
    data.reviewedAt = Date.now()
    const reviewData = await reviewModel.create(data)

    const finalData = {...bookData._doc,review:reviewData}
    res.status(201).send({status:true,message:"Document updated",data:finalData})

}


module.exports.createReview = createReview
module.exports.deleteReviewById= deleteReviewById
