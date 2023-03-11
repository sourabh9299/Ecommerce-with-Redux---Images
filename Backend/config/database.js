const mongoose = require('mongoose');

const DB_connect =()=>{
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Mongodb connected on ${data.connection.host}`)
    });
}

module.exports = DB_connect