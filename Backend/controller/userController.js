const userModel = require("../models/userModel.js");
const catchAsynicError = require("../middleware/catchAsyicError");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/JWT_token.js");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");


exports.GetUser = catchAsynicError(async (req, res,next) => {
    const users = await userModel.find();
    res.send(users)
})

exports.registerUser = catchAsynicError(async (req, res,next) => {
    const CheckUser = await userModel.findOne({email:req.body.email})
    if (CheckUser) {
        res.json({
            "message": "user Already Exist"
        });
    }else{
        const user = await userModel.create(req.body); 
        sendToken(user,201,res)
    }
    

})

exports.loginUser = catchAsynicError(async (req, res,next) => {
    const { email, password } = req.body;

    if (!email|| !password) {
       return next(new ErrorHandler("Please Enter Both Email & password", 401));
    }
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("invalid user id Password", 401));
    }

    const isPasswordMatched =await user.comparePassword(password);

    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Worng Email and Password", 401));
    }

    sendToken(user, 201, res);

})

// Logout
exports.logoutUser = catchAsynicError(async (req, res, next) => {
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        Message: "Logout Successfull"
    })
});

// Forgot Password
exports.forgotPassword = catchAsynicError(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("user not found", 401));
    }
    const restToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const restPasswordURL = `${req.protocol}://${req.get("host")}/api2/password/rest/${restToken}`;

    const message = `Your rest password token is :- \n\n ${restPasswordURL} \n\n if you have not requested this email then please ignore it `




    try {

        await sendEmail({
            email: user.email,
            subject: `KhilonaGhar rest Password`,
            message
        });

        res.status(200).json({ Success: true, message: `Email Sent on : ${user.email}` })

    }
    catch (err) {
        console.log(err.message)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler());
    }





})


exports.restPassword = catchAsynicError(async (req, res, next) => {

    console.log("APICALLED")

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")


    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Forgot password token is invalid or expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password not matched", 400));
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    sendToken(user, 200, res)
});

exports.updateUser = catchAsynicError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // cloudinary later

    const User = userModel.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

});


// Get all Users
exports.getAllUser = catchAsynicError(async (req, res, next) => {
    const users = await userModel.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get Single user 
exports.getSingleUser = catchAsynicError(async (req, res, next) => {

    const user = await userModel.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`Does'nt exist user with id ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user
    })

})


// Update user Password 
exports.updatePassword = catchAsynicError(async (req, res, next) => {


    const user = await userModel.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

    console.log(isPasswordMatched)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password dosnt matched1", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Old password dosnt matched2", 400))
    }

    user.password = req.body.newPassword;
    await user.save()

    sendToken(user, 200, res);


});

// Update User
exports.updateUserRole = catchAsynicError(async (req, res, next) => {
    const newuserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    // Cloudinary Later

    const user = await userModel.findByIdAndUpdate(req.user.id, newuserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,

    });


})

// Update role 
exports.deleteUser = catchAsynicError(async (req, res, next) => {

    const user = await userModel.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler("User not Found", 200));
    }

    await userModel.deleteOne(user);

    res.status(200).json({
        success: true,
        message: "User Deleted Successful"

    });


});







