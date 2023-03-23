const orderModel = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyicError = require("../middleware/catchAsyicError");
const APiFeatures = require("../utils/apiFeatures.js");

exports.newOrder = catchAsyicError(async (req, res) => {

    console.log(req.user._id)


    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        userId: req.user._id,
    });

    res.status(201).json({
        success: true,
        order: "created"
    })
});



// Get Order 
exports.getSingleOrder = catchAsyicError(async (req, res, next) => {

    const order = await orderModel.findById(req.params.id)
        .populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order not found with this id ", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
});


// Get Logged In order
exports.getSingleOrder = catchAsyicError(async (req, res, next) => {

    const allOrder = await orderModel.find({ user: user._id })

    if (!allOrder) {
        return next(new ErrorHandler("Order not found with this id ", 404))
    }

    res.status(200).json({
        success: true,
        allOrder
    })
});

