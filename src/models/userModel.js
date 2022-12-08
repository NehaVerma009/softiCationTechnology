const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
        //min len 8 max len 15
    },
},
    {timestamps:true
    })

module.exports = mongoose.model("User",userSchema)