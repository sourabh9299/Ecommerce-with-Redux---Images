const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    shippingInfo: {
        address: {
            type: String,
            default: "House-no",
            required: true
        },
        city: {
            type: String,
            default: "City",
            required: true
        },
        state: {
            type: String,
            default: "state",
            required: true
        },
        country: {
            type: String,
            default: "india",
            required: true
        },
        pinCode: {
            type: Number,
            default: 20,
            required: true
        },
        phoneNumber: {
            type: Number,
            default: 9999999999,
            required: true
        }

    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "productModel",
                required: true
            }
        }
    ],
    "userId": {

    },
    paymentInfo: {
        id: {
            type: String, required: true
        },
        status: {
            type: String, required: true
        },
    },
    paidAt: {
        type: Date, required: true
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        default: "processing",
        required: true
    },
    deliveryDate: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
 
module.exports =  mongoose.model("orderModel", orderSchema);
