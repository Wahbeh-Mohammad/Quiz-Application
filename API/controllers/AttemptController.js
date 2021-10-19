const { Attempt, Quiz } = require("../models");

const get_AttemptsUser = async (req,res) => {
    try {
        const { user_id } = req.decodedToken;
        const attempts = await Attempt.findAll({ where: {user_id}, order:[["createdAt", "DESC"]] });
        console.log("Attempts : ",attempts);
        if(attempts){
            return res.status(200).json({status:true, attempts});
        }
    } catch(e) {
        return res.status(400).json({status:false, e});
    }
} 

const post_NewAttempt = async (req,res) => {
    try {
        const { user_id } = req.decodedToken;
        const { quiz_id, Score } = req.body;
        console.log(user_id, quiz_id, Score);
        const newAttempt = await Attempt.create({quiz_id, user_id, Score});
        if(newAttempt){
            return res.status(200).json({status:true, newAttempt});
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({status:false, e});
    }
}

module.exports = {
    get_AttemptsUser,
    post_NewAttempt
}