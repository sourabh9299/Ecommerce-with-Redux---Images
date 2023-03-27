const orderModel = require("../models/orderModel");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyicError = require("../middleware/catchAsyicError");
const APiFeatures = require("../utils/apiFeatures.js");
const productsModel = require("../models/productsModel.js");

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
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order: "created",
        order
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
exports.myOrders = catchAsyicError(async (req, res, next) => {

    const allOrder = await orderModel.find({ user: req.user._id });
    if (!allOrder) {
        return next(new ErrorHandler("Order not found with this id ", 404));
    }

    res.status(200).json({
        success: true,
        allOrder
    })
});


// Get All  order (ADMIN)
exports.getAllOrders = catchAsyicError(async (req, res, next) => {

    const orders = await orderModel.find();
    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice
    });

    res.status(200).json({
        success: true,
        allOrder
    })
});

// Get Update order (ADMIN)
exports.updateOrders = catchAsyicError(async (req, res, next) => {

    const order = await orderModel.find(req.params.id);
    if (order.orderStatus === "Deliverd") {
        return next(new ErrorHandler("Already Deliverd", 404))
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);

    });

    await order.save();
    res.status(200).json({
        success: true
    })
});

async function updateStock(id, quantity) {

    const product = await productsModel.findById(id)
    product.stock -= quantity;

    await product.save({ validationBeforeSave: false });

}

exports.deleteOrders = catchAsyicError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not exist", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: "order Deleted Successfully ", order
    })

})

