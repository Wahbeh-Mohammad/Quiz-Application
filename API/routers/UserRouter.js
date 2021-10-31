const express = require("express");
const Controller = require("../controllers/UserController");
const { requireAuth } = require("../middleware/authMiddleware");
const Router = express.Router();

Router.post("/signup", Controller.post_RegisterUser);   // Register
Router.post("/login", Controller.post_LoginUser);       // Login
Router.put("/update", requireAuth, Controller.put_UpdateAccount); // Update Account
Router.delete("/delete", requireAuth, Controller.delete_DeleteAccount); // Delete Account


module.exports = Router;