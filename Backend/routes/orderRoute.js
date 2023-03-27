const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorisedRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, deleteOrders } = require("../controller/orderController")


router
    .route('/order/new')
    .post(isAuthenticatedUser, newOrder);



// Admin Routes
router
    .route('/order/:id')
    .get(isAuthenticatedUser, authorisedRoles("admin"), getSingleOrder);


router
    .route('/orders/me')
    .get(isAuthenticatedUser, myOrders)

router
    .route('/admin/order')
    .get(isAuthenticatedUser, authorisedRoles("admin"), getAllOrders)

router
    .route('/admin/order/:id')
    .put(isAuthenticatedUser, authorisedRoles('admin'), updateOrders)


router
    .route('/admin/order/:id')
    .put(isAuthenticatedUser, authorisedRoles('admin'), updateOrders)
    .delete(isAuthenticatedUser, authorisedRoles('admin'), deleteOrders)

module.exports = router

