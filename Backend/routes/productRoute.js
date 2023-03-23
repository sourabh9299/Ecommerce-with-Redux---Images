const express = require('express');
const { getAllProduct, createItem, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getAAllReviews, } = require('../controller/productController');
const { isAuthenticatedUser, authorisedRoles } = require('../middleware/auth');
const router = express.Router();

router
    .route('/products')
    .get(getAllProduct);

router
    .route('/products/new')    
    .post(isAuthenticatedUser, authorisedRoles("admin"),createItem);

router
    .route('/products/:id')
    .put(isAuthenticatedUser,updateProduct)
    .delete(isAuthenticatedUser,deleteProduct)
    .get(isAuthenticatedUser,getProductDetails)    

router
    .route('/products/review/')
    .put(isAuthenticatedUser, createProductReview)

router
    .route('/products/reviews/')
    .get(getAAllReviews)
    .delete(isAuthenticatedUser, deleteReview);
    



module.exports = router

