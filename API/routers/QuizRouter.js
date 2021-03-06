const express = require("express");
const Controller = require("../controllers/QuizController");
const { requireAuth } = require("../middleware/authMiddleware");
const Router = express.Router();

Router.post("/", requireAuth, Controller.postNewQuiz);
Router.get("/", Controller.getQuizzes);
Router.get("/user", requireAuth, Controller.getQuizzesUser);
Router.get("/attempt/:quiz_id",  Controller.getQuiz);
Router.delete("/:quiz_id", requireAuth, Controller.deleteQuiz);
Router.get("/:quiz_id", requireAuth, Controller.get_QuizName); // Quiz name { Try fix eager loading }

module.exports = Router;