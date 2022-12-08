
function whitespace(str) {
    return str.trim().indexOf(" ") >= 0
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




const isValidate= function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
  };






const isValidName = function(name){
    try{
        if(!isValidate(name)){
            return "Name should be given and type string"
        }
        if(stringContainsNumber(name)){
            return "name should only contain letters"
        }

    }
    catch(error){
        return error.message

    }
}

const isValidMobile = function (mobile) {
    try {
        if (!isValidate(mobile)) {
            return "mobile number should be given and type string! "
        }
        if (whitespace(mobile)) {
            return "Make sure mobile  number should not have space ! " 
        }

        let phone = isPhoneNumber(mobile)

        if (phone == false) {
            return "Please provide valid phone Number !" 
        }
        }
        catch (error) {
            return error.message
        }
}

    
const isValidEmail = function (email) {
    try {
        if (!isValidate(email)) {
            return "email should be given and type string! "
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
const isPassword = function (password) {
    try {
        if (!isValidate(password)) {
            return "Passwords should be given and type string! "
        }
        if (whitespace(password)) {
            return "Make sure email should not have any  space ! " 
        }
        if(password.length>15 || password.length<8)
            return "Password length should be between 8 and 15 characters"
       
    }
    catch (error) {
        return error.message
    }
}






module.exports = {isValidName,isValidMobile,isValidEmail,isPassword}