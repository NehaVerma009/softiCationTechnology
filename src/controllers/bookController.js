const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")

const getBook = async function(req,res){

   try{ const bookId = req.params.bookId
    //not done in authentication
    if (!bookId || !bookId.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send({ status: false, message: "No bookId given or invalid" });
   
    const book = await bookModel.findById(bookId)
    const reviewData = await reviewModel.find({bookId:bookId}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})

    if(!book)
    return res.status(404).send({status:false,message:"No book found"})
    const data = {...book._doc,reviewsData:reviewData}
    return res.status(200).send({status:true,message:"Books list",data:data})
}catch(err)
{
    return res.status(500).send({status:false,message:err.message})
}

}

module.exports.getBook = getBook