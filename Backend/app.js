const express = require('express');
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieparser = require("cookie-parser")

app.use(express.json());
app.use(cookieparser());



const Productrouter = require('./routes/productRoute')
const userRouter = require("./routes/userRoute")

app.use('/api1', Productrouter);
app.use('/api2', userRouter);
app,

// Middeware for error
app.use(errorMiddleware);

module.exports = app
