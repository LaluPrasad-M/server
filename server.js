"use strict";

const express = require("express");
const expressManager = require("./config/express");
const files = require("./app/utils/app_utils");
const db = require("./config/mongo");
const initConfig = require('./config/env/development');

const app = express();
const PORT = initConfig.PORT;

expressManager.config(app);

//log4js configurations
require("./config/log4js");

//require the global utils
require("./app/utils/globals");


files.walkRoutes(__dirname + "/app/routes", app);

//expressManager.ErrorHandler should be after all the others routes are gone through
expressManager.ErrorHandler(app);

//initialize a connection with db
db.initDb((err, db) => {
    if (err) {
        console.log(err)
    } else {
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT: ${PORT}`)
        });
    }
})
