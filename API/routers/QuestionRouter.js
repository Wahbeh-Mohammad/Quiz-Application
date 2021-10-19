const express = require("express");
const Controller = require("../controllers/QuestionController");

const Router = express.Router();

Router.post("/:quiz_id", Controller.postNewQuestion);


module.exports = Router;