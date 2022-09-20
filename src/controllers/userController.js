const userModel = require("../models/userModel");
const isValid = require("../validaters/userValidater");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      res
        .status(400)
        .send({ status: false, message: "Body should not be empty" });
    }

    let Title= isValid.isValidTitle(data.title)
    if(Title){
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
    ({phone: data.phone });

      if (checkphone) {
        return res.status(400).send({ status: false, message: "mobile number already exists." });
      }


    let email = isValid.isValidEmail(data.email);
    if (email) {
      return res.status(400).send({ status: false, message: email });
    }

    let checkemail = await userModel.findOne({
      email: data.email,
      isDeleted: false,
    });
    if (checkemail) {
      return res.status(400).send({ status: false, message: "email already exists." });
    }
    if(data.address)
    {let pincode = isValid.isValidPincode(data.address.pincode);
    if (pincode) {
      return res.status(400).send({ status: false, message: pincode });
    }}

    

    

    let user = await userModel.create(data);
    return res.status(201).send({ status: true, message: "Success", data: user });
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.createUser = createUser;
