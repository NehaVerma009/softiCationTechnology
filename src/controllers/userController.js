const userModel = require("../models/userModel")

const createUser = async function(req, res){
    try{
        let data= req.body
        let user = await userModel.create(data)
        return res.status(201).send({status:true,message:user })

    }
    catch(err){
        console.log(err.message)
        res.status(500).send({status :false, message: err.message})

    }
    

}

module.exports.createUser = createUser
