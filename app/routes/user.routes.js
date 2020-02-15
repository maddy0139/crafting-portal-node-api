const ValidationMiddleware = require("../authorization/auth.validatation.middleware");
module.exports = app => {
  const user = require("../controllers/user.controller");
  app.post("/api/user/new", user.create);
  app.get("/api/user/:username", [
    ValidationMiddleware.validJWTNeeded,
    user.findOne
  ]);
  app.get("/api/checkUsernameAvailability", [user.existsByUsername]);
  app.get("/api/checkEmailAvailability", [user.existsByEmail]);
};
