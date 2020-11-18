const express = require('express');
const router = express.Router();

const { registerController, loginController, googleLoginController, facebookLoginController, activeUserController, forgotPasswordController, resetPasswordController } = require('../controllers/authUser.controller');
const { validatorSignUp, validatorSignIn, validatorForgotPassword, validatorResetPassword } = require('../helpers/validator');

router.post('/register', validatorSignUp, registerController);
router.post('/login', validatorSignIn, loginController);
router.post('/googlelogin', googleLoginController);
router.post('/facebooklogin', facebookLoginController);
router.post('/active', activeUserController);
router.put('/forgot', validatorForgotPassword, forgotPasswordController);
router.put('/reset', validatorResetPassword, resetPasswordController);

module.exports = router;