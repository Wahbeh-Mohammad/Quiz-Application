const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

maxAge = 24 * 60 * 60;
const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    })
}

const comparePasswords = (recieved, submitted) => {
    return bcrypt.compareSync(recieved, submitted);
}

module.exports = {
    createToken,
    comparePasswords
}