const VerifyUserMiddleware = require('../authorization/verify.user.middleware');
const AuthorizationController = require('../controllers/auth.controller');
const AuthValidationMiddleware = require('../authorization/auth.validatation.middleware');

module.exports = (app) => {
    app.post('/api/auth/signin',[
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);
}
