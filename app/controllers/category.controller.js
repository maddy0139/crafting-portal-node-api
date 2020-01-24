const Category = require('../models/category.model');

exports.create = ((req, res) => {
    if(!req.body.title){
        return res.status(400).send({
            message: 'body can not be empty'
        });
    }
    const category = new Category({
        title: req.body.title
    });

    category.save()
    .then((data) => {
        res.send(data);
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message
        });
    })
});

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Category.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });            
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving category with id " + req.params.categoryId
        });
        
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
    .then((data) => {
        if(!data){
            res.status(404).send({
                message: 'Category not found with id'+ req.params.categoryId
            });
        }
        res.send({
            message: 'Category deleted successfully!'
        });
    })
    .catch((error) => {
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        res.status(500).send({
            message: 'Internal Server Error'
        });
    });
};
