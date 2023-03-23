const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieparser = require("cookie-parser")

app.use(express.json());
app.use(cookieparser());



const productRouter = require('./routes/productRoute')
const userRouter = require("./routes/userRoute")
const orderRuter = require("./routes/orderRoute")

app.use('/api1', productRouter);
app.use('/api2', userRouter);
app.use('/api3', orderRuter);

// Middeware for error
app.use(errorMiddleware);

module.exports = app
