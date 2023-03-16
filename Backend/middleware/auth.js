const ErrorHandler = require("../utils/errorHandler");
const catchAsyicError = require("./catchAsyicError");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js")



exports.isAuthenticatedUser = catchAsyicError(async (req, res, next) => {
    const {token} = req.cookies
    if (!token) {
        return next(new ErrorHandler("User is Not authorised",400))
    } 

    const decoded_user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded_user.id);

    next()
});

exports.authorisedRoles = (...roles) => {
    
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed for this resource`, 403));
        }
        
    next()
    }
}

