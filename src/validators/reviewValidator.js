const mongoose = require("mongoose")

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


const isValidate = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };

const isValidRating = function (rating) {
    try {

    if(!(typeof rating === "number" )){
          return "Rating is mandatory and should be a number"
      } 

    if(rating>5 || rating<1 )
        return "Rating should be between 1 & 5"
      
  
    } 
    catch (error) {
      return error.message;
    }
  };

module.exports = {isValidRating,isValidate,isValidReviewId,isValidBookId}

  
