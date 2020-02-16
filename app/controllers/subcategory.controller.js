const SubCategory = require('../models/subcategory.model');

exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      message: 'body can not be empty'
    });
  }
  const subCategory = new SubCategory({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    details: req.body.details,
    categoryId: req.body.categoryId
  });

  subCategory
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  if (req.query && req.query.categoryId) {
    SubCategory.find({ categoryId: req.query.categoryId })
      .then(subCategory => {
        res.send(subCategory);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving notes.'
        });
      });
  } else {
    SubCategory.find()
      .then(subCategory => {
        res.send(subCategory);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving notes.'
        });
      });
  }
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  SubCategory.findById(req.params.subCategoryId)
    .then(subCategory => {
      if (!subCategory) {
        return res.status(404).send({
          message: 'Sub Category not found with id ' + req.params.subCategoryId
        });
      }
      res.send(subCategory);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Sub Category not found with id ' + req.params.subCategoryId
        });
      }
      return res.status(500).send({
        message:
          'Error retrieving Sub Category with id ' + req.params.subCategoryId
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  SubCategory.findByIdAndRemove({ _id: req.params.subCategoryId })
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: 'Sub Category not found with id ' + req.params.subCategoryId
        });
      }
      res.send({
        message: 'Sub Category deleted successfully!'
      });
    })
    .catch(error => {
      if (error.kind === 'ObjectId' || error.name === 'NotFound') {
        return res.status(404).send({
          message: 'Sub Category not found with id ' + req.params.subCategoryId
        });
      } else {
        return res.status(500).send({
          message: 'Internal Server Error'
        });
      }
    });
};
