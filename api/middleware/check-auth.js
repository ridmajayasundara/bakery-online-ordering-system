const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_Secrete);
        req.UserData = decoded;
        next();
    }
    catch(error){
        return res.status(409).json({
            message : "authorization failed"
        })
    }

}