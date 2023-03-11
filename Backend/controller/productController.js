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
    const resPerPage = 4;
    const productsCount = await productsModel.countDocuments();

    const apiFeatures = new APiFeatures(productsModel.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resPerPage);

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
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
            Message: product
        })
    }
    
});

