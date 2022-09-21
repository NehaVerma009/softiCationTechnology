const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const isValid = require("../validators/bookValidator")
const isValidUser = require("../validators/userValidator")
const mongoose = require('mongoose')

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
      return res.status(400).send({ status: false, message: "wrong Parameters" });
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

    let isbn=isValid.isValidISBN(data.ISBN)
    if(isbn){
    return  res.status(400).send({status: false, message: isbn })
    }  

    let ISBN = await bookModel.findOne({ISBN:data.ISBN, isDeleted: false})
    if(ISBN){
       return  res.status(400).send({status:false, message: "ISBN already Exists"})
    }

    let Category= isValid.isValidCategory(data.category)
    if(Category){
        return res.status(400).send({status: false, message: Category })
    }

    let SubCategory= isValid.isValidSubCategory(data.subcategory)
    if(SubCategory){
        return res.status(400).send({status: false, message: SubCategory })
    }

    let releasedAt= isValid.isValidReleased(data.releasedAt)
    if(releasedAt){
        return res.status(400).send({status: false, message: releasedAt})
    }

    let book = await bookModel.create(data)
    return res
    .status(201).send({status: true, message:"Success",data:book})
  } 
  catch (error) {
    return res.status(500).send(error.message);
  }
};



let getBooks = async function (req, res) {
  try {
      let data = req.query
      let obj = { isdeleted: false }

      //============ Invalid param validation==================//
      let objArr = ["userId", "category", "subcategory"]
      
      if (!Object.keys(data).every(elem => objArr.includes(elem)))
      return res.status(400).send({ status: false, message: "wrong query parameters present" });
      
      //============ Invalid userId validation==================//
       if (data.userId) {
          if (!mongoose.Types.ObjectId.isValid(data.userId)) {
              return res.status(400).send({ status: false, message: "Invalid userId" })
          }
          obj.userId = data.userId
      }
      if (data.category||data.category==0) {
          if(data.category.length==0){
              return res.status(400).send({ status: false, message: " Please give any value in Category Param" }) 
          }
          obj.category = data.category
      }
      if (data.subcategory||data.subcategory==0) {
          if(data.subcategory.length==0){
              return res.status(400).send({ status: false, message: " Please give any value in Subcategory Param" })     
          }
          obj.subcategory = data.subcategory
      }
        //capital letters coming first
      let listOfBooks = await bookModel.find(obj).select(
          { _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort(
              { title: 1 })
      if (listOfBooks.length == 0) {
          return res.status(404).send({ status: false, message: "No book Found with given filter " })
      }
      return res.status(200).send({ status: true,message:"Books list", data: listOfBooks })
  } catch (error) {
      return res.status(500).send({ status: false, error: error.message })

  }

}
const getBook = async function(req,res){

    try{ const bookId = req.params.bookId
     //not done in authentication
     if (!bookId || !isValidUser.isValidId(bookId))
     return res.status(400).send({ status: false, message: "No bookId given or invalid" });
     
     if (Object.keys(req.query).length != 0) {
        return res.status(400).send({ status: false, message: "Query params not allowed" });
      }
     const book = await bookModel.findOne({_id:bookId,isDeleted:false})
     const reviewData = await reviewModel.find({bookId:bookId,isDeleted:false}).select({isDeleted:0,createdAt:0,updatedAt:0,__v:0})
 
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
module.exports.createBook = createBook;
module.exports.getBooks = getBooks
