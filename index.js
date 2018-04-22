
// require('dotenv').config();

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const createApp = require('./create-express-app');
//==============================================================DB connection++++++++++++++++++++++++++++++++++++++++++++++++++=
// DB_CONN = "mongodb://localhost:27017/Submit";
// mongoose.connect(DB_CONN, (err, result) => {
    // if (err) {
    //     console.log("Error while connecting to the DB");
    // }
    // else {
        // console.log("Connected with the DB");
        // mongoose.Promise = global.Promise;
        // var db = mongoose.connection;
        // createApp()
        //     .listen(2222, () => {
        //     console.log("Server Running(2222)...");
        // })
    // }
// });


createApp()
    .listen(2222, () => {
        console.log("Server Running(2222)...");
    })







