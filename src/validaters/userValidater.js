function whitespace(str) {
    return str.indexOf(" ") >= 0
}
function stringContainsNumber(_string) {
    return /\d/.test(_string);
}

function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // w use for char * use for breakpoint $ for end
    return regex.test(emailAdress)
        
}

function isPhoneNumber(number){
    let regex = /^\d{10}$/;
    return regex.test(number)
}

function isPincode(pin){
    let regex = /^\d{6}$/;
    return regex.test(pin)
}

const isValidate= function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };




  const isValidTitle = function(title){
    try{
        if(!title){
            return "Title is Required"
        }

        if (!isValidate(title)) {
            return  "Title is required" 
          }
      
          if (!["Mr", "Mrs", "Miss"].includes(title)) {
            return  "Title should contain Mr.,Mrs.,Miss" 
          }

    }
    catch(error){
        return res.status(500).send(error.message)
    }
  }

const isValidName = function(name){
    try{
        if(!name){
            return "Name is Required"
        }
        if(typeof name !== "string"){
            return "Name should be in string"
        }
        if(stringContainsNumber(name)){
            return "name should only contain letters"
        }

    }
    catch(error){
        return res.status(500).send(error.message)
    }
}

    const isValidMobile = function (mobile) {
        try {
            if (!mobile) {
                return "mobile number is required !"
            }
            if (typeof mobile !== 'string') {
                return "mobile number should be in string ! "
            }
            if (whitespace(mobile)) {
                return "Make sure mobile  number should not have space ! " 
            }
            // if (mobile.length< 10 || mobile.length>10) {
            //     return "mobile number should be of 10 digits ! "
            // }

            let phone = isPhoneNumber(mobile)

        if (phone == false) {
            return "Please provide valid phone Number !" 
        }
        }
        catch (error) {
            return res.status(500).send(error.message)
        }
    }

    
const isValidEmail = function (email) {
    try {
        if (!email) {
            return "email is required ! "
        }
        if (typeof email !== 'string') {
            return "email should be in string ! "
        }
        if (whitespace(email)) {
            return "Make sure email should not have any  space ! " 
        }
        let EmailId = isEmail(email)
        if (EmailId == false) {
            return "Please provide valid email address !" 
        }
    }
    catch (error) {
        return error.message
    }
}


const isValidPincode = function (pincode) {
    try {
        if (!pincode) {
            return "pincode  is required !"
        }
        if (typeof pincode !== 'string') {
            return "pincode  should be in string ! "
        }
        if (whitespace(pincode)) {
            return "Make sure pincode  should not have space ! " 
        }
        // if (pincode.length< 6 || pincode.length>6) {
        //     return "pincode should be of 6 digits ! "
        // }

        let Pincode = isPincode(pincode)
        if (Pincode == false) {
            return "Please provide valid Pincode !" 
        }

    }
    catch (error) {
        return error.message
    }
}



module.exports = {isValidName,isValidMobile,isValidEmail,isValidTitle,isValidPincode}
