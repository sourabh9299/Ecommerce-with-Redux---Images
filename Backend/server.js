const app = require('./app');
const dotenv = require('dotenv');
const DB_connect = require('./config/database');


// Handling Uncaught Exeption
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Server is Shutting Down due to Uncaught Error`)
    process.exit(1)
});

// config
dotenv.config({ path: "./config/config.env" })

// Connecting DB
DB_connect()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


// Unhandled Error 

 process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.messsage}`);
     console.log(`Shutting Down the server !`);
     
     server.close(() => {
         process.exit(1)
     })
})

