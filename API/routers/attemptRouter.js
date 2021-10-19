const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const Controller = require("../controllers/AttemptController");


const Router = express.Router();

Router.post("/", requireAuth, Controller.post_NewAttempt); // new Attempt
Router.get("/", requireAuth, Controller.get_AttemptsUser); // all user attempts

module.exports = Router;