const express = require("express");
const { GetUser, registerUser, loginUser, logoutUser, forgotPassword, restPassword, updateUser, getAllUser, getSingleUser, updatePassword, updateUserRole, deleteUser } = require("../controller/userController");
const { isAuthenticatedUser, authorisedRoles } = require('../middleware/auth');

const router = express.Router();

router
    .route("/register")
    .post(registerUser);

router   
    .route("/login")
    .post(loginUser)

router
    .route("/logout")
    .get(logoutUser);

router
    .route("/forgotPassword")
    .post(forgotPassword) 

router
    .route("/password/rest/:token")
    .put(restPassword)

router
    .route("/admin/updateuser/")
    .put(isAuthenticatedUser, updateUser)

router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorisedRoles("admin"), getAllUser);

router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorisedRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorisedRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteUser);
    
router
    .route("/password/update")
    .put(isAuthenticatedUser, updatePassword);




module.exports = router