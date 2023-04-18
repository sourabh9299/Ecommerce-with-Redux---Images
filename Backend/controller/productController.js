const productsModel = require("../models/productsModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyicError = require("../middleware/catchAsyicError");
const APiFeatures = require("../utils/apiFeatures.js");
// Create Item


exports.createItem = catchAsyicError(async (req, res, next) => {

    req.body.user = req.user.id
    
    const Product = await productsModel.findOne({ name: req.body.name, description: req.body.description });
    if (Product) {
        res.json({ message: "product already exist" });
    }
    else {
        const pro = await productsModel.create(req.body);
        res.json({ message: "Product Added", pro });
    }
        
});

// Get all Product
exports.getAllProduct = catchAsyicError(async (req, res) => {

    const resultPerPage = 8;
    const productsCount = await productsModel.countDocuments();

    const apiFeatures = new APiFeatures(productsModel.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resultPerPage);

    res.status(200).json({
        success: true,
        productsCount,
        resultPerPage,
        filteredProductsCount,
        products,
    });
});

// update Product --Admin

exports.updateProduct = catchAsyicError(async (req, res) => {
    
    let product = await productsModel.findById(req.params.id);
    if (product) {
        product = await productsModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.json({ message: "Product Updated", product })       
    }
    else {
        res.send("Not found");
    }
    
});

// Delete Product 
exports.deleteProduct = catchAsyicError(async (req, res, next) => {

    const product = await productsModel.findOne({ _id: req.params.id });
    if (!product) {
        return next(new ErrorHandler("product Not Found", 404))
    }
    else {
        await productsModel.deleteOne({ _id: req.params.id });
        res.json({
            message: "Product Deleted Successfully"
        })
    }

});

// Product Details
exports.getProductDetails = catchAsyicError(async (req, res, next) => {
    
    const product = await productsModel.findOne({ _id: req.params.id });
    if (!product) {
        return next(new ErrorHandler("product Not Found", 404))
    }
    else {
        res.json({
            success: true,
            product
        })
    }
    
});

exports.createProductReview = catchAsyicError(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await productsModel.findById(productId);
    const isReviewd = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

    if (isReviewd) {
        product.reviews.forEach(rev => {
            if ((rev) => rev.user.toString() === req.user._id.toString())
                rev.rating = rating
            rev.comment = comment
        });
    }

    else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length
    }

    let avg = 0
    product.ratings = product.reviews.forEach(rev => {
        avg += rev.rating
    }) / product.reviews.length

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    })
});

exports.getAAllReviews = catchAsyicError(async (req, res, next) => {
    const product = await productsModel.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not Found", 404));
    }
});

exports.deleteReview = catchAsyicError(async (req, res, next) => {
    const product = await productsModel.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Review not exist", 200));
    }
    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg = 0;

    review.forEach((rev) => {
        avg += rev.rating
    });

    product.ratings = avg / reviews.length;

    const numsOfReviews = reviews.length;

    await productsModel.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numsOfReviews,

    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })


    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    })



});



