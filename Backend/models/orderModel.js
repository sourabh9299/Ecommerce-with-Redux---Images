const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    shippingInfo: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        pinCode: {
            type: Number,
        },
        phoneNumber: {
            type: Number,

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
                required: [true, "Please fill Details"]
            }
        }
    ],
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
    },
    "user": {
        type: mongoose.Schema.ObjectId,
        ref: "userModel",
        required: true
    }

});
 
module.exports =  mongoose.model("orderModel", orderSchema);
