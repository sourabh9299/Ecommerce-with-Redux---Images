const express = require('express');
const { getAllProduct, createItem, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getAAllReviews, } = require('../controller/productController');
const { isAuthenticatedUser, authorisedRoles } = require('../middleware/auth');
const routes = express.Router();

routes
    .route('/products')
    .get(getAllProduct);

routes
    .route('/products/new')    
    .post(isAuthenticatedUser, authorisedRoles("admin"),createItem);

routes
    .route('/products/:id')
    .put(isAuthenticatedUser,updateProduct)
    .delete(isAuthenticatedUser,deleteProduct)
    .get(isAuthenticatedUser,getProductDetails)    

routes
    .route('/products/review/')
    .put(isAuthenticatedUser, createProductReview)

routes
    .route('/products/reviews/')
    .get(getAAllReviews)
    .delete(isAuthenticatedUser, deleteReview);
    



module.exports = routes

