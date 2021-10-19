const jwt = require("jsonwebtoken");

const verifyJWT = async (req,res) => {
    const { token } = req.body;
    //check jwt token and verify it
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decodedToken) => {
            if(err){
                return res.status(200).send({status:false, err });
            } else {
                return res.status(200).send({status:true, Token:decodedToken });
            }
        })
    }
    else {
        res.status(200).json({status:false});
    }
}

module.exports = { 
    verifyJWT
}