const bookModel = require("../models/bookModel");
const isValid = require("../validaters/bookValidater")
const ObjectId = require('mongoose').Types.ObjectId

const createBook = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body should not be empty" });
    }

    const keys = ["title", "excerpt", "userId", "ISBN", "category","subcategory", "reviews","isDeleted","releasedAt"];

    if (!Object.keys(req.body).every((elem) => keys.includes(elem))) {
      return res.status(400).send({ status: false, msg: "wrong Parameters" });
    }

    let title= isValid.isValidTitle(data.title)
    if(title){
        return res.status(400).send({status: false, message: title})
    }
    let Title = await bookModel.findOne({title:data.title, isDeleted: false})
    if(Title){
      return  res.status(400).send({status:false, message: "Title already Exists"})
    }

    let excerpt= isValid.isValidExcerpt(data.excerpt)
    if(excerpt){
        return res.status(400).send({status: false, message: excerpt})
    }

    let userId = isValid.isValidObjectId(data.userId)
    if(!userId){
        return res.status(400).send({status: false, message:userId})
    }
    
if((isValid.isValidISBN && isValid.isISBN)){
return  res.status(400).send({status: false, message:"INvalid ISBN" })
}

    let validISBN = isValid.isValidISBN(data.ISBN)
    if(validISBN){
        return res.status(400).send({status: false, message:validISBN })
    }

    let ISBN = await bookModel.findOne({ISBN:data.ISBN, isDeleted: false})
    if(ISBN){
       return  res.status(400).send({status:false, message: "ISBN already Exists"})
    }

    let Category= isValid.isValidISBN(data.category)
    if(Category){
        return res.status(400).send({status: false, message: Category })
    }

    let SubCategory= isValid.isValidISBN(data.subcategory)
    if(SubCategory){
        return res.status(400).send({status: false, message: SubCategory })
    }

    let Review= isValid.isValidISBN(data.reviews)
    if(!Review){
        return res.status(400).send({status: false, message: Review})
    }


    let book = await bookModel.create(data)
    return res
    .status(201).send({status: true, message:"Success",data:book})
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports.createBook = createBook;
