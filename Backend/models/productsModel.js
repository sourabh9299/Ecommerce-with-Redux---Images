const mongoose = require('mongoose');



const productSchema =new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Enter Name"]
    },
    description: {
        type: String,
        required:[true,"Enter Description"]
    },
    price: {
        type: Number,
        required: true,
        default:0
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }


    }],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
        default:0
    },
    stock: {
        type: Number,
        required: true,
        maxLength: [4, "Stock can not exceed"],
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{

        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    "user": {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    }
});


const productsModel = mongoose.model("productsModel", productSchema);

module.exports = productsModel;
