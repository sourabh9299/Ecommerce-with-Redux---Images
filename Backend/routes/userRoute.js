const express = require("express");
const { GetUser, registerUser, loginUser, logoutUser } = require("../controller/userController");
const route = express.Router();

route
    .route("/register")
    .post(registerUser);

route   
    .route("/login")
    .post(loginUser)

route
    .route("/logout")
    .get(logoutUser)    

module.exports = route