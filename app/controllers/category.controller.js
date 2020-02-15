const Category = require("../models/category.model");
const Response = require("../responses/Response");

exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      status: "Failed",
      reason: "body can not be empty"
    });
  }
  const category = new Category(req.body);

  category
    .save()
    .then(data => {
      res.send({
        status: "Success",
        category: data
      });
    })
    .catch(error => {
      res.status(500).send({
        status: "Failed",
        reason: error.message
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Category.find()
    .then(categories => {
      res.send({
        status: "Success",
        categories
      });
    })
    .catch(err => {
      res.status(500).send({
        status: "Failed",
        reason: err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          status: "Failed",
          reason: "Category not found with id " + req.params.categoryId
        });
      }
      res.send({
        status: "Success",
        category
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          status: "Failed",
          reason: "category not found with id " + req.params.categoryId
        });
      }
      return res.status(500).send({
        status: "Failed",
        reason: "Error retrieving category with id " + req.params.categoryId
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  Category.findByIdAndUpdate(req.params.categoryId, req.body)
    .then(data => {
      if (!data) {
        res.status(404).send({
          status: "Failed",
          reason: "Category not found with id" + req.params.categoryId
        });
      }
      res.send({
        status: "Sucess",
        message: "Category updated successfully!"
      });
    })
    .catch(error => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          status: "Failed",
          reason: "Category not found with id " + req.params.categoryId
        });
      }
      res.status(500).send({
        status: "Failed",
        reason: "Internal Server Error"
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then(data => {
      if (!data) {
        res.status(404).send({
          status: "Failed",
          reason: "Category not found with id" + req.params.categoryId
        });
      }
      res.send({
        status: "Sucess",
        message: "Category deleted successfully!"
      });
    })
    .catch(error => {
      if (error.kind === "ObjectId" || error.name === "NotFound") {
        return res.status(404).send({
          status: "Failed",
          reason: "Category not found with id " + req.params.categoryId
        });
      }
      res.status(500).send({
        status: "Failed",
        reason: "Internal Server Error"
      });
    });
};
