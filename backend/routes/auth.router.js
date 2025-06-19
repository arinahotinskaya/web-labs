const Router = require('express');
const router = new Router();
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');

router.post(
	'/signup',
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 24 }),
	AuthController.signup
);

router.post(
	'/signin',
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 24 }),
	AuthController.signin
);

module.exports = router;
