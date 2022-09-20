const userModel = require("../models/userModel");
const isValid = require("../validaters/userValidater");
const jwt = require("jsonwebtoken")

const createUser = async function (req, res) {
  try {
    //invalid params check
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body should not be empty" });
    }

    let Title = isValid.isValidTitle(data.title)
    if (Title) {
      return res.status(400).send({ status: false, message: Title });
    }

    let name = isValid.isValidName(data.name);
    if (name) {
      return res.status(400).send({ status: false, message: name });
    }

    let phone = isValid.isValidMobile(data.phone);
    if (phone) {
      return res.status(400).send({ status: false, message: phone });
    }

    let checkphone = await userModel.findOne
      ({
        phone: data.phone,
        isDeleted: false
      });

    if (checkphone) {
      return res.status(400).send({ status: false, message: "mobile number already exists." });
    }


    let email = isValid.isValidEmail(data.email);
    if (email) {
      return res.status(400).send({ status: false, message: email });
    }

    let checkemail = await userModel.findOne({
      email: data.email,
      isDeleted: false
    });
    if (checkemail) {
      return res.status(400).send({ status: false, message: "email already exists." });
    }

    let validPassword = isValid.isPassword(data.password);
    if (validPassword) {
      return res.status(400).send({ status: false, message: validPassword })
    }

    if (data.address && data.address.pincode) {
      let pincode = isValid.isValidPincode(data.address.pincode);
      if (pincode) {
        return res.status(400).send({ status: false, message: pincode });

      }

    }

    let user = await userModel.create(data);
    return res.status(201).send({ status: true, message: "Success", data: user });
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send({ status: false, message: error.message });
  }
}

const loginUser = async function (req, res) {
  try {
    let body = req.body
    let { email, password } = body
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body should not be empty" });
    }

    let validEmail = isValid.isValidEmail(email);
    if (validEmail) {
      return res.status(400).send({ status: false, message: validEmail })
    }
    let validPassword = isValid.isPassword(password);
    if (validPassword) {
      return res.status(400).send({ status: false, message: validPassword })
    }

    let checkUser = await userModel.findOne({ email: email })

    if (!checkUser) {
      return res.status(404).send({ status: false, message: "User not found" })
    }
    if (password != checkUser.password) {
      return res.status(400).send({ status: false, message: "Password is incorrect" })
    }
    
    let createToken = jwt.sign({
      userId: checkUser._id.toString()
    }, "Stack",
      { expiresIn: '30s' }, 'user-secret-key')

    return res.status(201).send({ status: true, message: "success", token: createToken })


  } catch (error) {
    return res.status(500).send({ status: false, error: error.message })
  }
}

module.exports.createUser = createUser;
module.exports.loginUser = loginUser 
