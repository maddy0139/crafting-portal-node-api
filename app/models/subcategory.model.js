const mongoose = require('mongoose');
const SubCategorySchema = mongoose.Schema({
    title: String,
    categoryId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
