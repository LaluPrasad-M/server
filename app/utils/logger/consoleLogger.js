var path = require('path');
var logger = require("log4js").getLogger("util.logger");
var _ = require('lodash');

/*
* Logger Impl start
*/
function consoleLogger(filename) {
  this.filename = filename;

  this.info = function () {
    var justFileName = path.basename(this.filename);
    var argsArr = [justFileName];
    for (var k in arguments) {
      argsArr.push(arguments[k]);
    }
    return logInfo.apply(null, argsArr);
  }
  this.log = this.info; //adding an alias because logger.log seems intuitive after console.log
  this.debug = function () {
    var justFileName = path.basename(this.filename);
    var argsArr = [justFileName];
    for (var k in arguments) {
      argsArr.push(arguments[k]);
    }
    return logDebug.apply(null, argsArr);
  }
  this.error = function () {
    var justFileName = path.basename(this.filename);
    var argsArr = [justFileName];
    for (var k in arguments) {
      argsArr.push(arguments[k]);
    }
    return logError.apply(null, argsArr);
  }
  this.warn = function () {
    var justFileName = path.basename(this.filename);
    var argsArr = [justFileName];
    for (var k in arguments) {
      argsArr.push(arguments[k]);
    }
    return logWarn.apply(null, argsArr);
  }

}

function logError(filename, message) {
  var argsArr = [];
  var argError = null;
  for (var i = 1; i < arguments.length; i++) {
    if (arguments[i] instanceof Error) {
      argError = arguments[i];
    } else {
      argsArr.push(JSON.stringify(arguments[i]));
    }
  }
  if (argError) {
    // console.error(getLogString('ERROR', filename, argsArr), _.get(argError, 'stack'));
    logger.error(getLogStringForLogger('ERROR', filename, argsArr), _.get(argError, 'stack'));
  } else {
    // console.error(getLogString('ERROR', filename, argsArr));
    logger.error(getLogStringForLogger('ERROR', filename, argsArr));
  }
}

function logInfo(filename, message) {
  var argsArr = [];
  for (var i = 1; i < arguments.length; i++) {
    argsArr.push(JSON.stringify(arguments[i]));
  }
  // console.log(getLogString('INFO', filename, argsArr));
  logger.info(getLogStringForLogger('INFO', filename, argsArr));
}

function logDebug(filename, message) {
  var argsArr = [];
  for (var i = 1; i < arguments.length; i++) {
    argsArr.push(JSON.stringify(arguments[i]));
  }
  // console.log(getLogString('DEBUG', filename, argsArr));
  logger.debug(getLogStringForLogger('DEBUG', filename, argsArr));

}

function logWarn(filename, message) {
  var argsArr = [];
  for (var i = 1; i < arguments.length; i++) {
    argsArr.push(JSON.stringify(arguments[i]));
  }
  // console.log(getLogString('WARN', filename, argsArr));
  logger.warn(getLogStringForLogger('WARN', filename, argsArr));
}



function getLogStringForLogger(level, filename, argsArr) {
  return "[" + filename + "] " + argsArr.join(" , ");
}

module.exports = {
  consoleLogger: consoleLogger
};
