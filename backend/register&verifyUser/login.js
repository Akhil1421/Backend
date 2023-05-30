const bcrypt = require("bcrypt")
const {user} = require("./modelUser")
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')

const login = async(req,res)=>{
    const {email, password} = req.body
    console.log(req.body)
    try {
        const currUser = await user.find({email})
        if(!currUser){
            return res.status(404).json({"msg" : "No such user"})
        }
        let match = await bcrypt.compare(password, currUser[0].password)
        if(!match){
            return res.status(403).json({"msg" : "Access Denied"})
        }
        const accessToken = jwt.sign({id : currUser[0]._id}, process.env.JWT_SECRET, {expiresIn : '7d'})
        res.status(200).json({token : accessToken});
    } catch (err) {
        return res.status(500).json({"msg" : err.message})
    }
}

module.exports = {login}