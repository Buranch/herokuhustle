const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const apiRouter = require('./api-router');
var mongoose = require('mongoose');



function createExpressApp(){
    const app = express();

    // app.use(express.static(path.join(__dirname, 'build')));

        // Set native promises as mongoose promise
        mongoose.Promise = global.Promise;

        // MongoDB Connection
    // mongodb://<dbuser>:<dbpassword>@ds153869.mlab.com:53869/walmert

    // mongoose.connect('mongodb://localhost/aggrid', {
    // mongodb://<dbuser>:<dbpassword>@ds119700-a0.mlab.com:19700,ds119700-a1.mlab.com:19700/rodmisc?replicaSet=rs-ds119700
    // mongoose.connect('mongodb://buranch:mLab130879@ds153869.mlab.com:53869/walmert', {

    mongoose.connect('mongodb://mbelachew:root@ds119700-a0.mlab.com:19700,ds119700-a1.mlab.com:19700/rodmisc?replicaSet=rs-ds119700', {
        
})
        .then(() => console.log('****** db connection successful *******'))
        .catch((err) => console.error('Please make sure Mongodb is installed and running!   ', err));
    app.use((req, res, next) => {
        // console.log(req.headers['authorization']);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type , Authorization, Accept");
        next();
    });
    app.use('/api', apiRouter);
    app.use("/something", (req, res) => {
        // To-Do 
        res.send('it worked');
    });
    return app;
}

module.exports  = createExpressApp;