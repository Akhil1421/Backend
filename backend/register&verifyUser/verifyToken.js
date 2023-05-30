const jwt = require("jsonwebtoken")

const verifyToken = async(req,res,next)=>{
    try {
        let token = req.header("Authorization")
        if(!token){
            return res.status(403).send("Access Denied")
        }
        if(token.startsWith("Bearer ")){
            token = token.substr(7)
            console.log(token)
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            console.log(req.user)
            next()
        }
        
    } catch (err) {
        return res.status(403).send("Access denied")
    }
}

module.exports = {verifyToken}