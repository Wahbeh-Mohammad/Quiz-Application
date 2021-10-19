const express = require("express");
const Controller = require("../controllers/UserController");

const Router = express.Router();

Router.post("/signup", Controller.postRegisterUser);   // Register
Router.post("/login", Controller.postLoginUser);       // Login
Router.get("/logout", Controller.getLogoutUser);       // Logout

module.exports = Router;