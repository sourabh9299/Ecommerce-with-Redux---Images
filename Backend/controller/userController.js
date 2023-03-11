const userModel = require("../models/userModel.js");
const catchAsynicError = require("../middleware/catchAsyicError");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/JWT_token.js");

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

exports.logoutUser = catchAsynicError(async (req, res, next) => {
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success: true,
        Message:"Logout Successfull"
    })
})