const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const isValidReviewId = function(reviewId){
    try{
if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return "Invalid Review ID" ;
  }
}
catch (error){
    return error.message
}
}


const isValidBookId = function(bookId){
    try{
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return "Invalid Book ID" ;
      }
    }

catch (error){
    return error.message
}

}

module.exports.isValidReviewId= isValidReviewId
module.exports.isValidBookId = isValidBookId