const userModel = require("../models/userModel");
const isValid = require("../validation/userValidation")
const jwt = require("jsonwebtoken")

const createUser = async function (req, res) {
  try {
    //invalid params check
    let data = req.body;
    if (Object.keys(data).length == 0) {
    return   res.status(400).send({ status: false, message: "Body should not be empty" });
    }

    const keys = [ "name", "phone", "email", "password"]

    if (!Object.keys(req.body).every(elem => keys.includes(elem))){
      return res.status(400).send({ status: false, message: "wrong Parameters"})
    }

        let name = isValid.isValidName(data.name);
    if (name) {
      return res.status(400).send({ status: false, message: name });
    }

    let phone = isValid.isValidMobile(data.phone);
    if (phone) {
      return res.status(400).send({ status: false, message: phone });
    }

    //make one db call
    let email = isValid.isValidEmail(data.email);
    if (email) {
      return res.status(400).send({ status: false, message: email });
    }
    
    let checkphone = await userModel.findOne
    ({$or:[{phone: data.phone, isDeleted: false},{email: data.email,isDeleted: false
    }]});

  if (checkphone) {
    return res.status(400).send({ status: false, message: "mobile number or email already exists." });
  }


    let validPassword = isValid.isPassword(data.password);
    if (validPassword) {
      return res.status(400).send({ status: false, message: validPassword })
    }


    let user = await userModel.create(data);
    return res.status(201).send({ status: true, message: "Success", data: user });
  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

const loginUser=async function(req,res){
    try {
        let body=req.body
        let{email,password}=body
        if (Object.keys(body).length == 0) {
           return res.status(400) .send({ status: false, message: "Body should not be empty" });
          }
          
    let validEmail=  isValid.isValidEmail(email);
    if(validEmail){
        return res.status(400).send({status:false,message:validEmail})
    }

    let validPassword = isValid.isPassword(password);
    if (validPassword) {
      return res.status(400).send({ status: false, message: validPassword })
    }

    let checkUser = await userModel.findOne({ email: email })

    if (!checkUser) {
      return res.status(401).send({ status: false, message: "User not found" })
    }
    if (password != checkUser.password) {
      return res.status(401).send({ status: false, message: "Password is incorrect" })
    }
    
    let createToken = jwt.sign({
      userId: checkUser._id.toString(),
    }, 'user-secret-key',{expiresIn:'1hr'})


    return res.status(200).send({ status: true, message: "success", data:{token: createToken} })


  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

const forgetPassword = async function(req, res){
  try{
    let data= req.body
    let{email, password}= data
    if (Object.keys(data).length == 0) {
      return res.status(400) .send({ status: false, message: "Body should not be empty" });
     }

     
let validEmail=  isValid.isValidEmail(email);
if(validEmail){
   return res.status(400).send({status:false,message:validEmail})
}

if(!password){
  return res.status(400).send({status:false,message:" Please Enter Password"})
}

let checkEmail = await userModel.findOne({ email: email })
if(!checkEmail){
  return res.status(400).send({status:false,message:" Invalid Email"})
}
console.log(checkEmail)

let updateUser = await userModel.findOneAndUpdate({email:email},{$set:{password:password }},{new:true})
console.log(updateUser)
return res.status(200).send({status:true,message:updateUser })

 }

  catch(err){
    return res.status(500).send({ status: false, message: err.message }) 
  }
}







module.exports.createUser = createUser;
module.exports.loginUser = loginUser 
module.exports.forgetPassword= forgetPassword