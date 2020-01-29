const ValidationMiddleware = require('../authorization/auth.validatation.middleware');
module.exports = (app) => {
    const subCategories = require('../controllers/subcategory.controller');

    app.post('/api/subcategory', [subCategories.create]);

    app.get('/api/subcategories', [subCategories.findAll]);

    app.get('/api/subcategory/:subCategoryId', [subCategories.findOne]);

    app.delete('/api/subcategory/:subCategoryId', [subCategories.delete]);

}   
