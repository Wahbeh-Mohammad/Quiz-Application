const { Question } = require("../models/index");
 
const postNewQuestion = async (req,res) => {
    try {
        const quiz_id = req.params.quiz_id;
        const { prompt, answer1,answer2,answer3,answer4, correct_answer } = req.body;
        const newQuestion = await Question.create({quiz_id, prompt, answer1,answer2,answer3,answer4, correct_answer});
        if(newQuestion){
            return res.status(200).json({status:true,newQuestion});
        }
    } catch(e) {
        return res.status(400).json(e);
    }
}

module.exports = {
    postNewQuestion
}