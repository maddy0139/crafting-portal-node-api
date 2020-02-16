const mongoose = require('mongoose');
const SubCategorySchema = mongoose.Schema(
  {
    title: String,
    imageUrl: String,
    details: String,
    categoryId: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('SubCategory', SubCategorySchema);
