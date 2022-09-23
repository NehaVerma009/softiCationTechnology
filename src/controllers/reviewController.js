const reviewModel = require("../models/reviewModel")
const isValidUser = require("../validators/userValidator")
const bookModel = require("../models/bookModel");
const isValid = require("../validators/reviewValidator")


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