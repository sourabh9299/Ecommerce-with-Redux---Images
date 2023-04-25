const mongoose = require('mongoose');
const validator = require('validator');
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        maxLength: [30, "cannot exceed 30 charachter"],
        minLength: [4, "name should more then 4 Characters"],
        required:[true,"Enter Name"]
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
        required:[true,"Enter Email"]
    },

    password: {
        type: String,
        minLength: [4, "name should more then 4 Characters"],
        required:[true,"enter Password"]
    },
    avatar: {
        public_id: {
            type: String,
            required: true

        },
        url: {
            type: String,
            required: true
        },
        
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password = await brcypt.hash(this.password, 10);

});

// jwt

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Password 

userSchema.methods.comparePassword = async function (enterdPassword) {
    return await brcypt.compare(enterdPassword, this.password); 
}

// Create reset Password 
userSchema.methods.getResetPasswordToken = function () {

    // Generating Token 
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding token to RestPassword
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

    return resetToken;

}

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel