const ValidationMiddleware = require('../authorization/auth.validatation.middleware');
module.exports = (app) => {
    const subCategories = require('../controllers/subcategory.controller');

    app.post('/api/subcategory', [ValidationMiddleware.validJWTNeeded, subCategories.create]);

    app.get('/api/subcategories', [ValidationMiddleware.validJWTNeeded, subCategories.findAll]);

    app.get('/api/subcategory/:subCategoryId', [ValidationMiddleware.validJWTNeeded, subCategories.findOne]);

    app.delete('/api/subcategory/:subCategoryId', [ValidationMiddleware.validJWTNeeded, subCategories.delete]);

}   
