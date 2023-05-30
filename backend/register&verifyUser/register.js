const {user} = require("./modelUser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    let {name, email, password} = req.body
    try{
        if(name && (email && password)){
            const salt = await bcrypt.genSalt()
            password = await bcrypt.hash(password,salt)
            const newUser = await user.create({name ,email , password})
            let currUser = await user.findOne({email : email})
            console.log(currUser)
            let token = jwt.sign({id : currUser._id}, process.env.JWT_SECRET, {expiresIn : '7d'})
            res.status(201).json({"token" : token})  
        }
        else{
            return res.status(400).json({"msg" : "badReq"})
        }
    }
    catch(err){
        return res.status(500).json(err)
    }
}

module.exports = {register}