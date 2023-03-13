const userModel = require("../models/userModel.js");
const catchAsynicError = require("../middleware/catchAsyicError");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/JWT_token.js");
const sendEmail = require("../utils/sendEmail")


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

exports.forgotPassword = catchAsynicError(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("user not found", 401));
    }
    const restToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const restPasswordURL = `${req.protocol}://${req.get("host")}/api/V2/password/rest/${restToken}`;

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

