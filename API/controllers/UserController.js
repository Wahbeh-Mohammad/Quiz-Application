const { User } = require("../models/index");
const bcrypt = require("bcrypt");

// Utils
const { checkPw } = require("../utils/regexUtils");
const { createToken, comparePasswords } = require('../utils/authUtils');

// Error Handling
const handleErrors = (e) => {
    const errs = {
        notRegistered: "",
        registered: "",
        username: "",
        password: ""
    }
    if(e.message.includes("Username")) errs.username = e.message;
    if(e.message.includes("Password")) errs.password = e.message;
    if(e.message.includes("not")) errs.notRegistered = e.message;
    if(e.message.includes("Already")) errs.registered = e.message;
    return errs;
}

const postRegisterUser = async (req,res) => {
    try {
        const { username, password } = req.body;
        const check = await User.findOne({ where: {username} });
        if(check) {
            throw Error("Username Already Registered");
        }
        if(!checkPw(password)) {
            throw Error("Invalid Password");
        }
        const salt = await bcrypt.genSalt();
        const HashedPw = await bcrypt.hash(password, salt);
        const newUser = await User.create({ username, password:HashedPw, type:"Regular" });
        const Token = createToken({ user_id:newUser.user_id, username:newUser.username , type: newUser.type });
        return res.status(200).json({status:true, Token});
    } catch (e) {
        const Errors = handleErrors(e);
        return res.status(400).json({status:false, Errors});
    }
}

const postLoginUser = async (req,res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: {username} });
        if(user) {
            if( comparePasswords(password, user.password) ) {
                const Token = createToken({ user_id:user.user_id, username:user.username, type: user.type });
                return res.status(200).json({Token, status:true});
            } else {
                throw Error("Wrong Password");
            }
        } else {
            throw Error("Username not Registered");
        }
    } catch (e) {
        const Errors = handleErrors(e);
        console.log(e);
        return res.status(400).json({Errors});
    }
}

const getLogoutUser = (req,res) => {
    try {
        res.status(200).send();
    } catch ( e ) {
        console.log(e);
        return res.status(400).send({ Errors:e });
    }
}

module.exports = {
    postRegisterUser,
    postLoginUser,
    getLogoutUser
}