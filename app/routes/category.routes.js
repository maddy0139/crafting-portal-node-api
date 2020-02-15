const ValidationMiddleware = require("../authorization/auth.validatation.middleware");
module.exports = app => {
  const categories = require("../controllers/category.controller");

  app.post("/api/category", [categories.create]);

  app.post("/api/category/:categoryId", [categories.update]);

  app.get("/api/categories", [categories.findAll]);

  app.get("/api/category/:categoryId", [categories.findOne]);

  app.delete("/api/category/:categoryId", [categories.delete]);
};
