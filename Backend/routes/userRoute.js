const express = require("express");
const { GetUser, registerUser, loginUser, logoutUser, forgotPassword, restPassword, updateUser, getAllUser, getSingleUser, updatePassword, updateUserRole, deleteUser } = require("../controller/userController");
const { isAuthenticatedUser, authorisedRoles } = require('../middleware/auth');

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

route
    .route("/password/rest/:token")
    .put(restPassword)

route
    .route("/admin/updateuser/")
    .put(isAuthenticatedUser, updateUser)

route
    .route("/admin/users")
    .get(isAuthenticatedUser, authorisedRoles("admin"), getAllUser);

route
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorisedRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorisedRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteUser);
    
route
    .route("/password/update")
    .put(isAuthenticatedUser, updatePassword);




module.exports = route