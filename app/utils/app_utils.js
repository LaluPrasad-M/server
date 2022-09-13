var fs = require("fs");
var consoleLogger = require('./logger/consoleLogger').consoleLogger;

exports.getLogger = function (filename) {
  return new consoleLogger(filename);
}

exports.walkRoutes = (path, app, fileNameRegex, skipFile) => {
  var routerRegex = new RegExp(fileNameRegex || /(.*)\.(js$)/);
  fs.readdirSync(path).forEach((file) => {
    var newPath = path + "/" + file;
    var stat = fs.statSync(newPath);
    if (stat.isFile()) {
      if (routerRegex.test(file)) {
        var router = require(newPath);
        if (typeof router === "function") {
          router(app);
        }
      }
    } else if (stat.isDirectory() && file !== "middlewares" && file !== skipFile) {
      exports.walkRoutes(newPath, app, fileNameRegex, skipFile);
    }
  });
};
