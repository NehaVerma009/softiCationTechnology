const mongoose = require ("mongoose")
const ObjectId =mongoose.Types.ObjectId

function isISBN(ISBN){
    let regex = /^[\d*\-]{10}|[\d*\-]{13}$/;
    return regex.test(ISBN)
}

const isValidate= function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };

  function ContainNumber(Number) {
    return /\d/.test(Number);
}


const isValidTitle = function(title){
    try{
        if(!title){
            return "Title is not Present"
        }
        if (!isValidate(title)) {
            return  "Title is invalid" 
            } 
    }
    catch(error){
        return error.message
    }
}

const isValidExcerpt = function(excerpt){
    try{
        if(!excerpt){
            return "excerpt is not Present"
        }
        if (!isValidate(excerpt)) {
            return  "excerpt is invalid" 
            } 
    }
    catch(error){
        return error.message
    }
}

const isValidObjectId = function (objectId) {
   try{
    if(!objectId){
        return "ID is not Present"
    }
    return ObjectId.isValid(objectId)  
    //validation of id 
   }
   catch(error){
    return error.message
   }
}

const isValidISBN = function(ISBN){
    try{
        if(!ISBN){
            return "ISBN is not Present"
        }
        if (!isValidate(ISBN)) {
            return  "ISBN is invalid" 
            } 

            let ISBN = isISBN(ISBN)

        if (ISBN == false) {
            return "Please provide valid ISBN Number !" 
        }

    }
    catch(error){
        return error.message
    }
}


const isValidCategory = function(category){
    try{
        if(!category){
            return "category is not Present"
        }
        if (!isValidate(category)) {
            return  "category is invalid" 
            } 
    }
    catch(error){
        return error.message
    }
}


const isValidSubCategory = function(subcategory){
    try{
        if(!subcategory){
            return "subcategory is not Present"
        }
        if (!isValidate(subcategory)) {
            return  "subcategory is invalid" 
            } 
    }
    catch(error){
        return error.message
    }
}

const isValidReview = function(reviews){
    try{
        if(!reviews){
            return "reviews is not Present"
        }
       if(!ContainNumber(reviews)){
        return "TypeOf Review is Number"
       }
    }
    catch(error){
        error.message
    }
}




            
module.exports=
{isValidTitle,isValidExcerpt,isValidObjectId,isValidCategory,isValidISBN,isValidReview,isValidSubCategory,}

