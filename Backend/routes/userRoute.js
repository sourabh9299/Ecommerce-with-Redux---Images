const express = require("express");
const { GetUser, registerUser, loginUser, logoutUser, forgotPassword } = require("../controller/userController");
const route = express.Router();

route
    .route("/register")
    .post(registerUser);

route   
    .route("/login")
    .post(loginUser)

route
    .route("/logout")
    .get(logoutUser);


route
    .route("/forgotPassword")
    .post(forgotPassword)    

module.exports = route