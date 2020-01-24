const ValidationMiddleware = require('../authorization/auth.validatation.middleware');
module.exports = (app) => {
    const user = require('../controllers/user.controller');
    app.post('/api/user/new', user.create);
    app.get('/api/user/:userId', [ValidationMiddleware.validJWTNeeded, user.findOne]);
}
