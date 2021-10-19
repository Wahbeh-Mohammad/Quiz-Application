// Modules
require("dotenv").config();
const { sequelize } = require("./models/index");
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");
// Routers
const { AuthRouter, UserRouter, QuizRouter, QuestionRouter, AttemptRouter } = require("./routers/index");
// Custom Middleware

// Init App
const app = express()

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true, origin:"http://localhost:3001"}));

const build = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB Connected");
        app.listen(process.env.SERVER_PORT, () => {
            console.log("Server Up & listening on http://localhost:" + process.env.SERVER_PORT);
        });
    } catch (e) {
        console.log(e);
    }
}

build();

app.use(UserRouter); // User Router
app.use("/auth", AuthRouter); // JWT auth Router
app.use("/quiz" ,QuizRouter); // Quiz Router
app.use("/question", QuestionRouter); // Question Router
app.use("/attempt", AttemptRouter); // Attempts router