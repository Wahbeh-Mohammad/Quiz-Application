const express = require("express");
const Controller = require("../controllers/AuthController");

const Router = express.Router();

Router.post("/verifyJWT", Controller.verifyJWT);

module.exports = Router;