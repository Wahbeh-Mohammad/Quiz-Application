const { Quiz, Question } = require("../models/index");

const postNewQuiz = async (req,res) => {
    try {
        const Token = req.decodedToken;
        const { quiz_name, category, marks, difficulty, num_questions } = req.body;
        const newQuiz = await Quiz.create({ user_id:Token.user_id, quiz_name, category, marks, difficulty, num_questions });
        return res.status(200).json({status:true, quiz_id:newQuiz.quiz_id});
    } catch ( err ) {
        console.log(err);
        return res.status(400).send({status:false, Error:err});
    }
}

const getQuiz = async (req,res) => {
    try {
        const { quiz_id } = req.params;
        const quiz = await Quiz.findOne({ where: {quiz_id}, 
            include: [Question]
        });
        if(quiz) {
            return res.status(200).json({status:true, quiz})
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
}

const getQuizzes = async (req,res) => {
    try {
        const quizzes = await Quiz.findAll({ 
            include: [Question]
        });
        if(quizzes) {
            return res.status(200).json({ status:true, quizzes });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({status:false, Errors:e});
    }
}

const getQuizzesUser = async (req,res) => {
    try {
        const { user_id } = req.decodedToken;
        const quizzes = await Quiz.findAll({ where: {user_id}});
        if(quizzes) {
            return res.status(200).json({status:true, quizzes});
        } else {
            return res.status(200).json({status:true, quizzes:null});
        }
    } catch (e) {
        return res.status(400).json({status:false, Errors:e});
    }
}

const deleteQuiz = async (req,res) => {
    try {
        const quiz_id = req.params.quiz_id;
        const deletedQuiz = await Quiz.destroy({
            where: {quiz_id}
        }) 
        if(deletedQuiz) {
            return res.status(200).json({status:true});
        } else {
            return res.status(200).json({status:false, msg:"Quiz not found!"});
        }
    } catch (e) {
        console.log(e);
        return res.status(400).json({status:false, Errors:e})
    }
}

module.exports = {
    postNewQuiz,
    getQuiz,
    getQuizzes,
    getQuizzesUser,
    deleteQuiz
}