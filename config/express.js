"use strict";

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const compression = require("compression");
const cors = require("cors");

const log4js = require("log4js");
const log_api = log4js.getLogger("api");

const logger = require('../app/utils/app_utils').getLogger(__filename);

const responseStatus = require('../app/libs/responseStatus');

exports.config = (app) => {
  //Preventing CORS errors
  //to Run Client and Server on different Systems
  app.use(cors())
  app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested_With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "POST, GET");
      return res.status(responseStatus.OK).json({});
    }
    next();
  });

  //creating session so that flash can save messages
  app.use(
    session({
      secret: "e-commerce",
      saveUninitialized: true,
      resave: true,
    })
  );
  app.use(flash());

  //Data compression before the data is sent by api
  app.use(compression({ filter: shouldCompress }));
  function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
  }

  //if express >= 4.16.0, then bodyParser has been re-added under the methods express.json() and express.urlencoded()
  /*
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json()); 
    */
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //to enter a log in log file about the incoming request
  app.use((req, res, next) => {
    var fullUrl = req.method + ": " + req.protocol + '://' + req.get('host') + req.originalUrl + ", BODY: " + JSON.stringify(req.body);
    log_api.trace(fullUrl)
    next()
  });
};

exports.ErrorHandler = (app) => {
  //Handling Errors
  app.use((req, res, next) => {
    const error = new Error("Url Not Found! Invalid URL!");
    error.status = responseStatus.NOT_FOUND;
    next(error);
  });

  app.use((error, req, res, next) => {
    let fullUrl = req.method + ": " + req.protocol + '://' + req.get('host') + req.originalUrl + ", BODY: " + JSON.stringify(req.body);
    logger.info(fullUrl)
    logger.error(error)

    res.status(error.status || responseStatus.INTERNAL_SERVER_ERROR);
    res.json({
      status: error.status || responseStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  });
};
