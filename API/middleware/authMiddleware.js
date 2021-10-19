const jwt = require("jsonwebtoken");

const requireAuth = async (req,res, next) => {
    const token = req.cookies.jwt;
    console.log("Token : ",token);
    console.log(req.cookies);
    //check jwt token aand verify it
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decodedToken) => {
            if(err){
                console.log(err);
                return res.status(400).json({JWT_Error:err});
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        })
    }
    else {
        res.status(400).json({Errors:"JWT Not Found"});
    }
}

module.exports = {
    requireAuth
}