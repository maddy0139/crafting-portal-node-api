const ValidationMiddleware = require('../authorization/auth.validatation.middleware');
module.exports = (app) => {
    const categories = require('../controllers/category.controller');

    app.post('/api/category', [ValidationMiddleware.validJWTNeeded, categories.create]);

    app.get('/api/categories', [ValidationMiddleware.validJWTNeeded, categories.findAll]);

    app.get('/api/category/:categoryId', [ValidationMiddleware.validJWTNeeded, categories.findOne]);

    app.delete('/api/category/:categoryId', [ValidationMiddleware.validJWTNeeded, categories.delete]);
}   
