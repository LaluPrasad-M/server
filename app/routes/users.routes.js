const userController = require('../controllers.js/users.controllers');

module.exports = (app) => {
  app.get("/home", userController.getData);
};
