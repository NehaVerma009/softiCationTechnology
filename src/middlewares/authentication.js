
const userModel=require('../models/userModel')
const bookModel=require('../models/bookModel')
const jwt = require("jsonwebtoken")
const { response } = require('express')



//===================== Authenticate  ===========================================//

const isAuthenticate=async function(req,res,next){
    try {
        let token=req.headers["x-api-key"]
        if (!token){
        return res.status(400).send({status:false,message:"Please Provide a Token "})
    } 
    decodedToken = jwt.verify(
        token,
        'user-secret-key',(error, response) => {
            if (error) {
              return res
                .status(400)
                .send({ status: false, message: "Not a Valid Token" });
            }
          req.headers["userId"]=response.userId
          next()
      })
        
    
} catch (error) {
    return res.status(500).send({status:false,error:error.message})

}
    
}

module.exports.isAuthenticate=isAuthenticate
